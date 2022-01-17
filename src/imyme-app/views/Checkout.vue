<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import CartReceipt from '@app/components/Cart/CartReceipt.vue'
import AddressDisplay from '@app/components/AddressDisplay.vue'
import EmptyCart from '@app/components/Cart/EmptyCart.vue'
import {getAddressByZip} from 'japan-address-autofill'
import {State, Action, Mutation, Getter} from 'vuex-class'
import {CheckoutState} from '@/shared/store/modules/checkout/types'
import {User} from '@/shared/store/modules/user/types'
import {Results} from '@/shared/store/modules/survey/types'
import {Serum} from '@/shared/store/modules/subscription/types'
import {
    getDiscountedInfo,
    getLimitedProductInfo,
    codInfo,
    decodeBase64Id,
    getLimitedPromotionInfo,
} from '@/imyme-app/utils'
import * as Sentry from '@sentry/browser'

interface LineItemForCheckoutObject {
    variant_id: string
    quantity: string
    properties: any
    price: number
}

interface LineItemForPaymentObject {
    id: string
    product_id: number
    variant_id: number
    quantity: number
    properties: any[]
    price: number
    tax_lines: any
}

interface PaymentCodObject {
    order: PaymentCodOrder
    oneTimeItemId: number[]
    orderCycle: string
}

interface PaymentCodOrder {
    customer: PaymentCodOrderCustomer
    line_items: any[]
    shipping_address: PaymentCodOrderShippingAddress
    total_tax: string
    financial_status: string
    tags: string
    discount_codes?: PaymentCodOrderDiscountCodes[]
    shipping_lines?: PaymentCodOrdeShippingLine[]
}

interface PaymentCodOrderCustomer {
    id: number
}

interface PaymentCodOrderShippingAddress {
    address1: string
    address2: string
    city: string
    country: string
    first_name: string
    id: string
    last_name: string
    phone: string
    province: string
    zip: string
}

interface PaymentCodOrderDiscountCodes {
    code: string
    amount: number
    type: string
}

interface PaymentCodOrdeShippingLine {
    title: string
    price: number
    code: string
}

@Component({
    components: {
        CartReceipt,
        AddressDisplay,
        EmptyCart,
    },
})
export default class Checkout extends Vue {
    public name: string = 'Checkout'

    address = {
        address1: null,
        address2: null,
        city: null,
        prefecture: null,
        zip: null,
    }
    // the data which is used to change order complete button.
    orderProcessing: boolean = false
    orderdisable: boolean = false
    orderPrepare: boolean = true
    totalCareSetProductsForCheckout: LineItemForCheckoutObject[] = []
    totalCareSetProductsForPayment: LineItemForPaymentObject[] = []
    totalCareSetProductIdList: string[] = []
    trialSetProductsForCheckout: LineItemForCheckoutObject[] = []
    trialSetProductsForPayment: LineItemForPaymentObject[] = []
    trialSetProductIdList: string[] = []
    limitedPromotionInfo: any = null

    @State('checkout') checkoutState!: CheckoutState
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @State(state => state.survey.results) results!: Results | null
    @State(state => state.subscription.beforeCheckoutSkinCode)
    beforeCheckoutSkinCode
    @State(state => state.subscription.beforeCheckoutSerums)
    beforeCheckoutSerums!: Array<Serum> | null
    @Action('application/loadingPromiseAdd') loadingPromiseAdd
    @Action('checkout/processRechargePayment') processRechargePayment
    @Action('checkout/createRechargeCheckout') createRechargeCheckout
    @Action('products/getProductPrice') getProductPrice
    @Action('products/getVariantPrice') getVariantPrice
    @Action('checkout/orderCod') orderCod
    @Action('products/getProductInfo') getProductInfo
    @Action('subscription/setRetentionSubscription') setRetentionSubscription
    @Action('subscription/setUserSubscription') setUserSubscription
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes
    @Getter('checkout/isOneTimePromotion') isOneTimePromotion
    @Getter('checkout/getOrderCycle') getOrderCycle
    @Getter('checkout/getPaymentMethod') getPaymentMethod
    @Getter('checkout/getDiscountCode') getDiscountCode

    get checkout() {
        return this.checkoutState.checkout
    }

    get stripePaymentToken() {
        return this.checkoutState.stripePaymentToken
    }

    get showDebugButton() {
        const {VUE_APP_LOCAL} = process.env
        return VUE_APP_LOCAL === 'true'
    }

    get payment() {
        return this.getPaymentMethod
    }

    get orderCycle() {
        return this.getOrderCycle
    }

    async processOrder() {
        //process order here
        this.orderProcessing = true
        try {
            Sentry.addBreadcrumb({
                type: 'default',
                category: Sentry.Severity.Debug,
                message: JSON.stringify(this.checkout),
            })
        } catch (e) {
            Sentry.captureException(e)
        }
        const prefecture = await this.getKanjiPrefecture(
            this.checkout.shipping_address.zip,
        )
        const includesDiscount = this.checkout.line_items.filter(item => {
            if (item.properties && item.properties.promotion === 'true') {
                return item
            }
        })
        const oneTimeItemId = this.rechargeObject.line_items
            .filter(item => getLimitedProductInfo(item.id))
            .map(oneTimeItem => oneTimeItem.variant_id)
        if (
            this.rechargeObject.line_items.find(({type}) =>
                type === 'total care set',
            )
        ) {
            await this.createTotalCareSetProductsLineItemsForPayment()
            const oneTimeItemIdAdd = this.totalCareSetProductsForPayment
                .filter(item => getLimitedProductInfo(item.id))
                .map(oneTimeItem => String(oneTimeItem.variant_id))

            oneTimeItemId.push(...oneTimeItemIdAdd)
        } else if (
            this.rechargeObject.line_items.find(({type}) =>
                type === 'trial set',
            )
        ) {
            await this.createTrialSetProductsLineItemsForPayment()
            const oneTimeItemIdAdd = this.trialSetProductsForPayment
                .map(oneTimeItem => String(oneTimeItem.variant_id))

            oneTimeItemId.push(...oneTimeItemIdAdd)
        }

        const chargeObject = {
            checkoutToken: this.checkout.token,
            paymentToken: this.stripePaymentToken
                ? this.stripePaymentToken.id
                : null,
            shippingPrefecture: prefecture,
            discount: true,
            stub: this.showDebugButton,
            oneTimeItemId: oneTimeItemId,
            orderCycle: this.orderCycle,
        }

        if (includesDiscount.length > 0) {
            chargeObject.discount = true
        }

        const paymentResult = await this.processRechargePayment(
            chargeObject,
        ).catch(err => {
            // this process will be called when processing payment fails.
            // e.g.) backend returns 500 error.
            this.orderProcessing = false
        })

        if (!paymentResult) return

        this.setSubscription(
            this.user.id,
            paymentResult.checkout_charge.shopify_order_number,
        )

        this.generateGtmData({
            ...paymentResult,
            checkout: {...this.checkout},
        })

        const paymentResultId = String(paymentResult.checkout_charge.charge_id)
        this.$router.push({
            name: 'checkout-complete',
            params: {id: paymentResultId},
        })
    }

    async processOrderCod() {
        this.orderProcessing = true

        let customerId: number = 0
        const userId = this.user ? this.user.id : undefined
        if (userId !== undefined) {
            customerId = parseInt(
                window
                    .atob(userId)
                    .split('/')
                    .reverse()[0],
            )
        }
        const lineItems = await Promise.all(
            this.rechargeObject.line_items
                .filter(({type}) => !getLimitedPromotionInfo(type))
                .map(async item => {
                    const {price, discountPrice} = await this.getPrice(
                        item.variant ? item.product_id : item.shopifyId,
                        this.isOneTimePromotion
                            ? 'one-time-proomtion'
                            : item.type,
                        item.variant,
                    )
                    const priceToPay =
                        item.properties.promotion === 'true'
                            ? Number(discountPrice)
                            : Number(price)
                    const properties = {
                        name: 'promotion',
                        value: item.properties.promotion,
                    }
                    return {
                        product_id: parseInt(decodeBase64Id(item.shopifyId)),
                        variant_id: parseInt(item.variant_id),
                        price: priceToPay,
                        quantity: parseInt(item.quantity),
                        properties: [properties],
                        tax_lines: [],
                    }
                }),
        )
        const oneTimeItemId = this.rechargeObject.line_items
            .filter(item => getLimitedProductInfo(item.id))
            .map(oneTimeItem => parseInt(oneTimeItem.variant_id))

        if (
            this.rechargeObject.line_items.find(({type}) =>
                type === 'total care set',
            )
        ) {
            await this.createTotalCareSetProductsLineItemsForPayment()
            this.totalCareSetProductsForPayment.forEach(totalCareSetProduct => {
                lineItems.push(totalCareSetProduct)
            })

            const oneTimeItemIdAdd = this.totalCareSetProductsForPayment
                .filter(item => getLimitedProductInfo(item.id))
                .map(oneTimeItem => oneTimeItem.variant_id)

            oneTimeItemId.push(...oneTimeItemIdAdd)
        } else if (
            this.rechargeObject.line_items.find(({type}) =>
                type === 'trial set',
            )
        ) {
            await this.createTrialSetProductsLineItemsForPayment()
            this.trialSetProductsForPayment.forEach(trialSetProduct => {
                lineItems.push(trialSetProduct)
            })

            const oneTimeItemIdAdd = this.trialSetProductsForPayment
                .map(oneTimeItem => oneTimeItem.variant_id)

            oneTimeItemId.push(...oneTimeItemIdAdd)
        }

        const paymentCodObject: PaymentCodObject = {
            order: {
                customer: {
                    id: customerId,
                },
                line_items: lineItems,
                shipping_address: this.rechargeObject.shipping_address,
                total_tax: '0',
                financial_status: codInfo.financial_status,
                tags: codInfo.tags,
            },
            oneTimeItemId: oneTimeItemId,
            orderCycle: this.orderCycle,
        }

        if (this.getDiscountCode) {
            paymentCodObject.order.discount_codes = [
                {
                    code: this.getDiscountCode.code,
                    type: this.getDiscountCode.discountType,
                    amount: this.getDiscountCode.value,
                },
            ]
        }

        if (
            this.checkout.shipping_rate &&
            this.checkout.shipping_rate.title &&
            this.checkout.shipping_rate.price &&
            this.checkout.shipping_rate.code
        ) {
            paymentCodObject.order.shipping_lines = [
                {
                    title: this.checkout.shipping_rate.title,
                    price: this.checkout.shipping_rate.price,
                    code: this.checkout.shipping_rate.code,
                },
            ]
        }

        const orderResult = await this.orderCod(paymentCodObject).catch(() => {
            this.orderProcessing = false
        })

        if (!orderResult) return

        this.setSubscription(this.user.id, orderResult.order.name)

        this.generateGtmData({
            ...orderResult,
            checkout: {...this.checkout},
        })

        const orderId = String(orderResult.order.id)
        this.$router.push({
            name: 'checkout-complete',
            params: {id: orderId},
        })
    }

    async getKanjiPrefecture(zip) {
        return await getAddressByZip(zip.replace('-', ''))
            .then(({prefecture}) => {
                return prefecture
            })
            .catch(() => {
                this.setErrorMessage({
                    message: 'incorrect zip',
                })
            })
    }

    generateGtmData({checkout_charge, checkout}) {
        const transactionProducts = this.rechargeObject.line_items
            .filter(({type}) => !getLimitedPromotionInfo(type))
            .reduce((lineItems, item) => {
                const transactionProduct = this.getProductByRemoteId(item.id)
                return lineItems.concat({
                    sku: `${
                        transactionProduct.type === 'serum' ? 'セラム' : '石鹸'
                    }${transactionProduct.name}`,
                    name: `${
                        transactionProduct.type === 'serum' ? 'セラム' : '石鹸'
                    }${transactionProduct.name}`,
                    category: `${
                        transactionProduct.type === 'serum' ? 'セラム' : '石鹸'
                    }`,
                    price: item.price,
                    quantity: 1,
                })
            }, [])

        try {
            Sentry.addBreadcrumb({
                type: 'default',
                category: Sentry.Severity.Debug,
                message: 'debug checkout_charge',
                level: Sentry.Severity.Debug,
                data: checkout_charge,
            })
            Vue.prototype.$gtm.trackEvent({
                event: 'imyme.orderCompleted',
                transactionId: checkout_charge
                    ? checkout_charge.payment_processor_transaction_id
                    : 'checkout_charge is null',
                transactionAffiliation: 'online',
                transactionTotal: +checkout.total_price,
                transactionTax: +checkout.total_tax,
                transactionShipping: +checkout.shipping_rate || 0,
                transactionProducts,
            })
        } catch (e) {
            Sentry.captureException(e)
        }
    }

    getProductByRemoteId(id) {
        if (!id) return null
        const storageItem = sessionStorage.getItem(id)
        return storageItem ? JSON.parse(storageItem) : null
    }

    setSubscription(userId, orderNumber) {
        if (
            this.beforeCheckoutSerums !== null &&
            this.beforeCheckoutSerums.length > 0
        ) {
            const subscriptionObject = {
                customerId: userId,
                serum: this.beforeCheckoutSerums,
                skinCode: this.beforeCheckoutSkinCode,
                orderNumber: orderNumber,
            }
            this.setUserSubscription(subscriptionObject)
        }
    }

    @Watch('rechargeObject.line_items', {immediate: true})
    async onLineItemsChanged(val) {
        if (val && val.length > 0) {
            const lineItems = await Promise.all(
                this.rechargeObject.line_items
                    .filter(({type}) => !getLimitedPromotionInfo(type))
                    .map(async item => {
                        const {price, discountPrice} = await this.getPrice(
                            item.variant ? item.product_id : item.shopifyId,
                            this.isOneTimePromotion
                                ? 'one-time-proomtion'
                                : item.type,
                            item.variant,
                        )
                        item.price = price
                        item.discountPrice = discountPrice

                        if (item.properties.promotion == 'true') {
                            return {
                                variant_id: item.variant_id,
                                quantity: item.quantity,
                                properties: item.properties,
                                price: item.discountPrice,
                            }
                        } else {
                            return {
                                variant_id: item.variant_id,
                                quantity: item.quantity,
                                properties: item.properties || {
                                    promotion: 'false',
                                },
                                price: item.price,
                            }
                        }
                    }),
            )

            if (
                this.rechargeObject.line_items.find(({type}) =>
                    type === 'total care set',
                )
            ) {
                this.createTotalCareSetProductIdList()
                await this.createTotalCareSetProductsLineItemsForCheckout()
                this.totalCareSetProductsForCheckout.forEach(
                    totalCareSetProduct => {
                        lineItems.push(totalCareSetProduct)
                    },
                )
            } else if (
                this.rechargeObject.line_items.find(({type}) =>
                    type === 'trial set',
                )
            ) {
                this.createTrialSetProductIdList()
                await this.createTrialSetProductsLineItemsForCheckout()
                this.trialSetProductsForCheckout.forEach(
                    trialSetProduct => {
                        lineItems.push(trialSetProduct)
                    },
                )
            }

            const checkoutInfo = {
                rechargeObject: {
                    line_items: lineItems,
                    email: this.rechargeObject.email,
                    shipping_address: this.rechargeObject.shipping_address,
                    discount_code: this.getDiscountCode
                        ? this.getDiscountCode.code
                        : null,
                },
            }
            await this.createRechargeCheckout(checkoutInfo).catch(() => {
                this.orderdisable = true
            })

            this.orderPrepare = false
        } else {
            this.$router.push({name: 'cart'})
        }
    }

    async getPrice(id, type, variant) {
        let amount
        if (getLimitedPromotionInfo(type)) {
            const limitedPromotionInfo = getLimitedPromotionInfo(type)
            amount = limitedPromotionInfo.price
        } else {
            if (variant) {
                const response = await this.getVariantPrice(id)
                amount = response.priceV2.amount
            } else {
                const response = await this.getProductPrice(id)
                amount = response.priceRange.minVariantPrice.amount
            }
        }
        return getDiscountedInfo(type, amount, this.getRechargeObjectTypes)
    }

    createTotalCareSetProductIdList() {
        if (this.results && this.results.recommends) {
            if (
                this.results.recommends.serum &&
                this.results.recommends.serum.length > 0
            ) {
                const subscriptionItems: Serum[] = []
                this.results.recommends.serum.forEach(async serum => {
                    const id = serum.id
                    this.totalCareSetProductIdList.push(id)

                    const recommendsSerum: Serum = {
                        name: serum.name,
                        type: serum.type,
                    }
                    subscriptionItems.push(recommendsSerum)
                })
                this.setRetentionSubscription({
                    serums: subscriptionItems,
                    skinCode: this.results.skinMapping.skinCode,
                })
            }
            if (
                this.results.recommends.soap &&
                this.results.recommends.soap[0]
            ) {
                this.totalCareSetProductIdList.push(
                    this.results.recommends.soap[0].id,
                )
            }
        }

        const totalCareSetProductInfo = getLimitedPromotionInfo(
            'total care set',
        )
        totalCareSetProductInfo.items.forEach(limitedPromotionItem => {
            this.totalCareSetProductIdList.push(limitedPromotionItem.id)
        })

        this.limitedPromotionInfo = totalCareSetProductInfo
    }

    async createTotalCareSetProductsLineItemsForCheckout() {
        for (const productId of this.totalCareSetProductIdList) {
            const productInfo = await this.getProductInfo(productId)
            const productVariants = productInfo.variants.edges.find(
                ({node}) => {
                    return node.availableForSale
                },
            )

            this.totalCareSetProductsForCheckout.push({
                variant_id: `${decodeBase64Id(productVariants.node.id)}`,
                quantity: '1',
                properties: {promotion: 'true'},
                price:
                    productInfo.priceRange.minVariantPrice.amount *
                    this.limitedPromotionInfo.discountRate,
            })
        }
    }

    async createTotalCareSetProductsLineItemsForPayment() {
        for (const productId of this.totalCareSetProductIdList) {
            const productInfo = await this.getProductInfo(productId)
            const productVariants = productInfo.variants.edges.find(
                ({node}) => {
                    return node.availableForSale
                },
            )
            const priceToPay =
                productInfo.priceRange.minVariantPrice.amount *
                this.limitedPromotionInfo.discountRate

            this.totalCareSetProductsForPayment.push({
                id: productInfo.id,
                product_id: Number(decodeBase64Id(productInfo.shopify_id)),
                variant_id: Number(decodeBase64Id(productVariants.node.id)),
                quantity: 1,
                properties: [
                    {
                        name: 'promotion',
                        value: 'true',
                    },
                ],
                price: priceToPay,
                tax_lines: [],
            })
        }
    }

    createTrialSetProductIdList() {
        if (this.results && this.results.recommends) {
            if (
                this.results.recommends.serum &&
                this.results.recommends.serum.length > 0
            ) {
                let serums: string[] = []
                if (this.results.recommends.serum.length === 1) {
                    serums = this.results.recommends.serum.map(serum => serum.id)
                } else {
                    serums = this.results.recommends.serum.filter(serum => {
                        const serumType = serum.type
                        return serumType === 'night' || serumType === 'U' || serumType === 'morning_and_night'
                    }).map(serum => serum.id)
                }
                this.trialSetProductIdList.push(serums[0])
            }
            if (
                this.results.recommends.soap &&
                this.results.recommends.soap[0]
            ) {
                this.trialSetProductIdList.push(
                    this.results.recommends.soap[0].id,
                )
            }
        }

        const trialSetProductInfo = getLimitedPromotionInfo(
            'trial set',
        )
        trialSetProductInfo.items.forEach(limitedPromotionItem => {
            this.trialSetProductIdList.push(limitedPromotionItem.id)
        })

        this.limitedPromotionInfo = trialSetProductInfo
    }

    async createTrialSetProductsLineItemsForCheckout() {
        const trialSetPrice = getLimitedPromotionInfo(
            'trial set',
        ).price
        for (const productId of this.trialSetProductIdList) {
            const productInfo = await this.getProductInfo(productId)
            const productVariants = productInfo.variants.edges.find(
                ({node}) => {
                    return node.availableForSale
                },
            )
            if (!productVariants) {
                this.sendCartBySoldout('trial set')
                return
            }

            this.trialSetProductsForCheckout.push({
                variant_id: `${decodeBase64Id(productVariants.node.id)}`,
                quantity: '1',
                properties: {promotion: 'true', trialset: 'true'},
                price: productInfo.type === 'serum' ? trialSetPrice : 0
            })
        }
    }

    async createTrialSetProductsLineItemsForPayment() {
        const trialSetPrice = getLimitedPromotionInfo(
            'trial set',
        ).price
        for (const productId of this.trialSetProductIdList) {
            const productInfo = await this.getProductInfo(productId)
            const productVariants = productInfo.variants.edges.find(
                ({node}) => {
                    return node.availableForSale
                },
            )
            if (!productVariants) {
                this.sendCartBySoldout('trial set')
                return
            }

            const priceToPay = productInfo.type === 'serum' ? trialSetPrice : 0

            this.trialSetProductsForPayment.push({
                id: productInfo.id,
                product_id: Number(decodeBase64Id(productInfo.shopify_id)),
                variant_id: Number(decodeBase64Id(productVariants.node.id)),
                quantity: 1,
                properties: [
                    {
                        name: 'promotion',
                        value: 'true',
                    },
                    {
                        name: 'trialset',
                        value: 'true',
                    },
                ],
                price: priceToPay,
                tax_lines: [],
            })
        }
    }

    sendCartBySoldout(target) {
        let isDeletedTarget = false
        const {line_items} = this.rechargeObject
        const lineItems: any[] = []
        line_items.forEach(line => {
            if (line.type === target) {
                isDeletedTarget = true
            } else if (isDeletedTarget) {
                lineItems.push({
                    ...line,
                    line_item_no: line.line_item_no - 1,
                })
            } else {
                lineItems.push(line)
            }
        })
        this.setRechargeObject({
            ...this.rechargeObject,
            line_items: lineItems,
        })
        this.$router.push({
            name: 'cart',
            params: {
                soldout: 'true'
            },
        })
    }

    retentionSubscriptionItem() {
        let lineItem: any = []
        if (this.rechargeObject) {
            const lineItems = this.rechargeObject.line_items
            const unique_item = lineItems
                .filter((item, index, self) => {
                    return (
                        self.findIndex(
                            v => item.line_item_no === v.line_item_no,
                        ) === index
                    )
                })
                .map(line => line.line_item_no)

            unique_item.forEach(function(no) {
                const items = lineItems
                    .filter(item => {
                        return (
                            item.line_item_no === no &&
                            item.type === 'serum' &&
                            !getLimitedProductInfo(item.id)
                        )
                    })
                    .map(item => {
                        const serum: Serum = {
                            name: item.title.replace(/\(.*?\)|（.*?）/g, ''),
                            type: item.serumType,
                        }
                        return serum
                    })
                if (items.length > 0) {
                    lineItem = items
                }
            })
            this.setRetentionSubscription({
                serums: lineItem,
                skinCode: this.results ? this.results.skinMapping.skinCode : '',
            })
        }
    }

    goToOrderInputForm() {
        this.$router.push({name: 'orderInputForm'})
    }

    created() {
        this.retentionSubscriptionItem()
    }
}
</script>

<template>
    <div v-if="user && rechargeObject" class="cart max-page-w">
        <CartReceipt :cart="checkout" :trial-set-items="trialSetProductsForCheckout" />
        <AddressDisplay
            v-if="rechargeObject && rechargeObject.shipping_address"
            :user="user"
            :address="rechargeObject.shipping_address"
            :address-type="`customer`"
        />
        <AddressDisplay v-else :user="user" :address="user.defaultAddress" />
        <span v-if="orderPrepare">
            <button class="btn mb-2 w-center-70" disabled>
                <span class="m-auto">
                    少々お待ちください...
                </span>
            </button>
        </span>
        <span v-else>
            <span v-if="orderdisable">
                <button
                    class="btn mb-2 w-center-70"
                    :disabled="orderProcessing"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-forward" />
                    </svg>
                    <span class="m-auto">
                        注文を確定できません
                    </span>
                </button>
            </span>
            <span v-else>
                <button
                    v-if="!orderProcessing && payment === 'cod'"
                    class="btn btn-secondary mb-2 w-center-70"
                    @click="processOrderCod"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-forward" />
                    </svg>
                    <span class="m-auto">注文を確定する</span>
                </button>
                <button
                    v-else-if="!orderProcessing"
                    class="btn btn-secondary mb-2 w-center-70"
                    @click="processOrder"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-forward" />
                    </svg>
                    <span class="m-auto">注文を確定する</span>
                </button>
                <button
                    v-else
                    class="btn mb-2 w-center-70"
                    :disabled="orderProcessing"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-forward" />
                    </svg>
                    <span class="m-auto">
                        注文を確定しています...
                    </span>
                </button>
                <button
                    v-if="!orderProcessing"
                    class="btn mb-2 w-center-70"
                    @click="goToOrderInputForm"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-back" />
                    </svg>
                    <span class="m-auto">入力情報を変更する</span>
                </button>
            </span>
        </span>
        <button
            v-if="showDebugButton"
            class="btn btn-secondary mb-2 w-center-70"
            @click="processOrder"
        >
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-forward" />
            </svg>
            <span class="m-auto">Debug Purchase</span>
        </button>
    </div>
    <EmptyCart v-else />
</template>
