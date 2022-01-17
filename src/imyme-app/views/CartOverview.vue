<script lang="ts">
import {Vue, Component, Watch, Ref} from 'vue-property-decorator'
import {State, Action, Mutation, Getter} from 'vuex-class'
import {Results} from '@/shared/store/modules/survey/types'
import {User} from '@/shared/store/modules/user/types'
import {
    CodProduct,
    OrderHistoryInfo,
} from '@/shared/store/modules/checkout/types'
import Cart from '@app/components/Cart/Cart.vue'
import TotalCareSet from '@app/components/Product/TotalCareSet.vue'
import EmptyCart from '@app/components/Cart/EmptyCart.vue'
import Soldout from '@app/components/Cart/Soldout.vue'
import PromotionItemSelection from '@app/components/Cart/PromotionItemSelection.vue'
import CartTotalPrice from '@app/components/Cart/CartTotalPrice.vue'
import DiscountCode from '@app/components/Cart/DiscountCode.vue'
import {
    decodeBase64Id,
    getDiscountedInfo,
    getLimitedProductInfo,
    canDisplayLimitedProductBanner,
    getLimitedPromotionInfo,
    getProductData,
} from '@/imyme-app/utils'
import {isLoggedIn} from '@/shared/auth.js'

@Component({
    components: {
        Cart,
        EmptyCart,
        Soldout,
        PromotionItemSelection,
        TotalCareSet,
        CartTotalPrice,
        DiscountCode,
    },
})
export default class CartOverview extends Vue {
    public name: string = 'CartOverview'
    promotionItem: any = null
    selectableProductDataList: any = []
    @State(state => state.survey.results) results!: Results | null
    @State(state => state.checkout.userSubscriptions) userSubscriptions!: any[]
    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.userCodSubscriptions)
    userCodSubscriptions!: CodProduct[]
    @State(state => state.checkout.ordersHistory)
    ordersHistory!: OrderHistoryInfo[]
    @Action('products/getProductPrice') getProductPrice
    @Action('products/getVariantPrice') getVariantPrice
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes
    @Getter('checkout/getPromotionIsInCart') getPromotionIsInCart
    @Getter('checkout/hasDiscounted') hasDiscounted
    @Getter('checkout/isAppliedDiscount') isAppliedDiscount
    @Getter('checkout/getCountInCart') countInCart
    @Ref('totalCareSet') readonly totalCareSet

    lineItems: any = []

    get containsSoap() {
        return this.rechargeObject.line_items.find(({type}) => type === 'soap')
    }
    get containsSerum() {
        return this.rechargeObject.line_items.find(({type}) => type === 'serum')
    }
    get isOnlyLimitedProduct() {
        const limitedProductCount = this.rechargeObject.line_items.filter(
            item => {
                return getLimitedProductInfo(item.id)
            },
        ).length
        return limitedProductCount === this.rechargeObject.line_items.length
    }
    get showLimitedBanner() {
        return this.rechargeObject.line_items.find(({id}) =>
            canDisplayLimitedProductBanner(id),
        )
    }
    get noDiscount() {
        if (this.userSubscriptions && this.userSubscriptions.length > 0) {
            return true
        } else if (this.hasDiscounted) {
            return true
        } else if (
            this.userCodSubscriptions &&
            this.userCodSubscriptions.length > 0
        ) {
            return true
        } else if (this.isAppliedDiscount) {
            return true
        }
        return false
    }
    get isLimitedPromotion() {
        return true
    }
    get selectedTotalCareSet() {
        return (
            this.promotionItem &&
            !!getLimitedPromotionInfo(this.promotionItem.type)
        )
    }
    get loggedIn() {
        return isLoggedIn()
    }
    get recommendations() {
        return this.results ? this.results.recommends : null
    }
    get showDiscount() {
        return (
            this.userSubscriptions &&
            this.userSubscriptions.length === 0 &&
            this.recommendations &&
            this.loggedIn &&
            !this.getPromotionIsInCart &&
            !this.hasDiscounted &&
            this.userCodSubscriptions &&
            this.userCodSubscriptions.length === 0
        )
    }
    get totalPrice() {
        if (this.isAppliedDiscount) {
            return null
        }
        const totalPrice = {
            price: 0,
            discounted: 0,
        }
        if (
            this.isTrial &&
            this.rechargeObject.line_items.filter(
                item => item.type === 'trial set',
            ).length
        ) {
            const trialSetPrice = getLimitedPromotionInfo('trial set').price
            totalPrice.price += trialSetPrice
            totalPrice.discounted += trialSetPrice
            if ('line_items' in this.rechargeObject) {
                this.rechargeObject.line_items
                    .filter(
                        item =>
                            !('skinCode' in item) && item.type !== 'trial set',
                    )
                    .forEach(item => {
                        totalPrice.price += parseFloat(item.price)
                        totalPrice.discounted += parseFloat(item.price)
                    })
            }
        } else if (this.selectedTotalCareSet) {
            totalPrice.price += parseFloat(this.promotionItem.price)
            totalPrice.discounted += parseFloat(
                this.promotionItem.discountPrice,
            )
            if ('line_items' in this.rechargeObject) {
                this.rechargeObject.line_items
                    .filter(item => !('skinCode' in item))
                    .forEach(item => {
                        totalPrice.price += parseFloat(item.price)
                        totalPrice.discounted += parseFloat(item.price)
                    })
            }
        } else if (
            this.isLimitedPromotion &&
            !this.isOnlyLimitedProduct &&
            this.showDiscount
        ) {
            if (this.rechargeObject.line_items.filter(
                item => item.type === 'serum' && ('skinCode' in item),
            ).length) {
                this.selectableProductDataList.forEach(item => {
                    totalPrice.price += parseFloat(item.price)
                    totalPrice.discounted += parseFloat(item.discountPrice)
                })
            }
            let countItem = []
            countItem = this.rechargeObject.line_items.filter(
                item => item.type !== 'serum' || !('skinCode' in item),
            )
            countItem.forEach((item: any) => {
                totalPrice.price += parseFloat(item.price)
                // Determine when the `discountPrice` of `selectableProductDataList` is 0 yen.
                if (totalPrice.discounted > 0) {
                    totalPrice.discounted += parseFloat(item.price)
                }
            })
        } else {
            if ('line_items' in this.rechargeObject) {
                this.rechargeObject.line_items.forEach(item => {
                    totalPrice.price += parseFloat(item.price)
                    if (
                        'properties' in item &&
                        Boolean(item.properties.promotion) &&
                        item.discountPrice
                    ) {
                        totalPrice.discounted += parseFloat(item.discountPrice)
                    } else {
                        totalPrice.discounted += parseFloat(item.price)
                    }
                })
            }
        }
        return totalPrice
    }
    get isTrial() {
        return (
            'isTrial' in this.$route.params &&
            this.$route.params.isTrial &&
            this.ordersHistory.length === 0
        )
    }
    get isSoldout() {
        return (
            'soldout' in this.$route.params &&
            Boolean(this.$route.params.soldout)
        )
    }

    mounted() {
        if (
            !this.isTrial &&
            this.rechargeObject.line_items.filter(
                item => item.type === 'trial set',
            ).length
        ) {
            let isDeletedTrialSet = false
            const {line_items} = this.rechargeObject
            const lineItems: any[] = []
            line_items.forEach(line => {
                if (line.type === 'trial set') {
                    isDeletedTrialSet = true
                } else if (isDeletedTrialSet) {
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
            this.$route.params.isTrial = 'false'
            this.$router.push({name: 'results', params: this.$route.params})
        }
    }

    setPromotionItem(item) {
        this.promotionItem = item
    }
    resetPromotionItem() {
        this.promotionItem = null
    }
    goToAddressInput() {
        this.$router.push({name: 'orderInputForm'})
    }
    async processCheckout() {
        const rechargeObject = {
            ...this.rechargeObject,
            email: this.user ? this.user.email : undefined,
        }
        this.setRechargeObject(rechargeObject)

        if (this.noDiscount) {
            this.goToAddressInput()
        } else {
            if (this.promotionItem) {
                this.addPromotion(this.promotionItem)
            }
            this.goToAddressInput()
        }
    }
    async createCheckout(lineItems, variant = false) {
        const li = await Promise.all(
            lineItems.map(async item => {
                if (item.properties.promotion == 'true') {
                    const {price, discountPrice} = await this.getPrice(
                        variant ? item.product_id : item.shopifyId,
                        item.type,
                        variant,
                    )
                    item.price = price
                    item.discountPrice = discountPrice
                    item.variant = variant
                }
                return item
            }),
        )
        const rechargeObject = {
            ...this.rechargeObject,
            line_items: li,
        }

        this.setRechargeObject(rechargeObject)
    }
    addPromotion(product) {
        if (getLimitedPromotionInfo(product.type)) {
            this.addToCart()
            return
        }

        //There are 6 cases for which discounts are available
        if (this.containsSerum && this.containsSoap) {
            if (product.type === 'serum') {
                //'case 1', 'get serum first month 30% off'
                this.updateCartItem()
            } else {
                //'case 2', 'pay for serum, get a free soap'
                this.updateCartItem('soap')
            }
        } else if (this.containsSerum && !this.containsSoap) {
            if (product.type === 'serum') {
                //'case 3', 'get serum first month 30% off'
                this.updateCartItem()
            } else {
                //'case 4', 'pay for serum, get a free soap'
                this.addToCart()
            }
        } else {
            if (product.type === 'serum') {
                //'case 5', 'get serum first month 30% off'
                this.addToCart()
            } else {
                //'case 6', 'get a half price soap'
                this.updateCartItem('soap')
            }
        }
    }
    addToCart() {
        const {line_items} = this.rechargeObject
        let line_items_temp: any = []
        if (getLimitedPromotionInfo(this.promotionItem.type)) {
            // If you want to include promotions(e.g. Total Care Set) in the lineItems, you can only include limited products, not other regular products.
            line_items_temp = line_items.filter(line_item => {
                return getLimitedProductInfo(line_item.id)
            })
        } else {
            line_items_temp = [...line_items]
        }

        const lineItems: any = line_items_temp
        lineItems.push({
            variant_id: `${decodeBase64Id(this.promotionItem.product_id)}`,
            quantity: '1',
            properties: {promotion: 'true'},
            shopifyId: this.promotionItem.shopifyId,
            type: this.promotionItem.type,

            id: this.promotionItem.id,
            line_item_no: line_items.length,
            product_id: `${this.promotionItem.product_id}`,
            price: this.promotionItem.price,
            title: this.promotionItem.title,
            image: this.promotionItem.image,
            logo: this.promotionItem.logo,
        })

        this.createCheckout(lineItems, true)
    }
    updateCartItem(type = 'serum') {
        const {line_items} = this.rechargeObject
        const lineItems = line_items.map(item => {
            const itm = {...item}
            if (getLimitedProductInfo(item.id)) {
                return itm
            }
            if (item.type === type) {
                itm.properties = {promotion: 'true'}
            } else {
                itm.properties = item.properties || {promotion: 'false'}
            }
            return itm
        })
        this.createCheckout(lineItems)
    }
    beforeDestroy() {
        if ('soldout' in this.$route.params) {
            delete this.$route.params.soldout
        }
    }
    //TODO add getPrice to checkout to insure price wasn't tampered with in lineItems
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
    @Watch('rechargeObject.line_items')
    async setProductPromotion() {
        this.collateItem(this.rechargeObject.line_items)
        if (
            this.results &&
            this.results.recommends &&
            this.results.recommends.serum &&
            this.results.recommends.serum[0] &&
            this.results.recommends.soap &&
            this.results.recommends.soap[0] &&
            this.showDiscount
        ) {
            let selectableProductId
            let selectableProductData
            let recommends
            this.selectableProductDataList = []
            if (this.containsSerum) {
                recommends = this.results.recommends.serum
            } else {
                recommends = []
            }
            for (let i = 0; i < recommends.length; i++) {
                selectableProductId = recommends[i].id

                selectableProductData = getProductData(selectableProductId)

                const {priceRange} = await this.getProductPrice(
                    selectableProductData.shopifyId,
                )
                selectableProductData.price = priceRange.minVariantPrice.amount
                if (selectableProductData.price) {
                    const {discountPrice} = getDiscountedInfo(
                        selectableProductData.type,
                        selectableProductData.price,
                        this.getRechargeObjectTypes,
                    )
                    selectableProductData.discountPrice = discountPrice
                }
                this.setPromotionItem(selectableProductData)
                this.selectableProductDataList.push(selectableProductData)
            }
        }
    }
    async created() {
        this.collateItem(this.rechargeObject.line_items)
        await this.setProductPromotion()
    }
    async collateItem(line_items) {
        if (line_items) {
            // line_item_sqの重複なし一覧を取得する
            const unique_item = line_items
                .filter((item, index, self) => {
                    return (
                        self.findIndex(
                            v => item.line_item_no === v.line_item_no,
                        ) === index
                    )
                })
                .map(line => line.line_item_no)

            const lineItem: any = []
            unique_item.forEach(function(no) {
                lineItem.push(
                    line_items.filter(item => {
                        return item.line_item_no === no
                    }),
                )
            })
            this.lineItems = lineItem
        }
    }
}
</script>

<template>
    <Soldout v-if="isSoldout" />
    <div v-else-if="countInCart > 0" class="cart max-page-w">
        <h3>カート一覧</h3>
        <section class="p-1">
            <h3 class="p-1 mb-1">小計 ({{ countInCart }} 点の商品)</h3>
            <Cart :cart="rechargeObject" :allow-remove="true" />
            <template v-if="!isTrial">
                <span v-if="isOnlyLimitedProduct">
                    <span v-if="showLimitedBanner">
                        <div class="results-product-img">
                            <img
                                src="@app/assets/images/limited/alpinia_serum_banner.png"
                                alt="今回限定！石鹸セットで送料無料"
                            />
                        </div>
                        <div class="campaign-image-txt">
                            <p>
                                ※1
                                北海道、沖縄、離島は対象になりませんのでご了承下さいませ。
                            </p>
                        </div>
                    </span>
                </span>
                <span v-else>
                    <div class="results-product-img">
                        <img
                            src="@app/assets/images/Subscriptions/campagin-flow.png"
                            alt="定期購入のご案内"
                        />
                    </div>
                    <div class="campaign-image-txt">
                        <p>
                            ※1
                            送料無料に関して：3,000円以上のご購入者様が対象となります。また、北海道、沖縄、離島は対象になりませんのでご了承下さいませ。
                        </p>
                        <p>※2 初回購入の方のみご対象となります。</p>
                    </div>
                </span>
            </template>
        </section>
        <template v-if="!isTrial">
            <PromotionItemSelection
                v-if="!isOnlyLimitedProduct && !isLimitedPromotion"
                key="promotion-item-selection"
                @emitSelectedPromotion="setPromotionItem"
            />
            <!-- <TotalCareSet
                v-if="isLimitedPromotion && !isOnlyLimitedProduct"
                ref="totalCareSet"
                @emitSelectedPromotion="setPromotionItem"
                @emitResetedPromotion="resetPromotionItem"
            /> -->
            <section class="p-1">
                <DiscountCode :selected-total-care-set="selectedTotalCareSet" />
            </section>
        </template>
        <section class="p-1">
            <CartTotalPrice :cart="rechargeObject" :total-price="totalPrice" />
        </section>
        <div key="cart-next-button" class="cart-actions pb-2 pt-5">
            <router-link
                class="btn m-0 py-1"
                :to="{name: 'results', params: $route.params}"
            >
                <span class="m-auto">買い物を続ける</span>
            </router-link>
            <button class="btn btn-secondary m-0 py-1" @click="processCheckout">
                <span class="m-auto">ご購入手続き</span>
            </button>
        </div>
        <div v-if="!isOnlyLimitedProduct && !isTrial" key="subscription-info">
            <h3 class="ls-2">解約はいつでもOK！</h3>
            <div class="text-regular px-2 pb-5 pt-1">
                <div class="pb-2">
                    imymeのセラムと石鹸は1ヶ月毎に配送される定期購入サービスです。
                    購入後は、お肌のご相談はもちろん、お肌の状態、季節のおすすめ成分に合わせて新しいセラムに変更することができますので、よりお肌に合ったスキンケアがご利用できます。また、ご利用頻度によって製品のお届け間隔も変更が可能です。
                </div>
                <div class="text-regular-middle">
                    <p>
                        ※解約は配送予定日の1週間前までにお電話でご連絡ください。
                    </p>
                    <p>※初回購入は注文後、約5〜10日後の配送となります。</p>
                </div>
            </div>
        </div>
    </div>
    <EmptyCart v-else />
</template>
<style scoped>
.results-product-img img {
    width: 100%;
}
.text-regular {
    line-height: 7.6vw;
}
.text-regular-middle p {
    font-size: 3vw;
}
section {
    margin: 1rem;
}
.campaign-image-txt p {
    font-size: 2vw;
}
.campaign-image-txt {
    margin: 0 2.1vw;
}
.campaign-image-txt p {
    line-height: 3.8vw;
}
.campaign-image-txt p:first-child {
    margin-bottom: 1.8vw;
}
@media only screen and (max-width: 360px) {
    .cart-actions span,
    .cart-actions button.btn-secondary {
        font-size: 3.8vw;
    }
}
</style>
