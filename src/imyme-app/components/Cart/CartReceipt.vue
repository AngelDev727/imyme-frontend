<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {
    formatPrice,
    getCodFee,
    getLimitedPromotionInfo,
} from '@/imyme-app/utils'
import {State, Getter} from 'vuex-class'
import DiscountCode from '@app/components/Cart/DiscountCode.vue'

@Component({
    components: {
        DiscountCode,
    },
})
export default class CartReceipt extends Vue {
    public name: string = 'CartReceipt'

    @Prop({type: Object, default: () => ({})}) cart: any
    @Prop({type: Array, default: () => {}, required: false}) trialSetItems
    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @Getter('checkout/getPaymentMethod') getPaymentMethod

    limitedProductNameList = ['7001']

    formatPrice(price) {
        return formatPrice(price)
    }

    getLimitedProduct(title) {
        return this.limitedProductNameList.some(
            limitedProductName => limitedProductName === title,
        )
    }

    get paymentCod() {
        return this.getPaymentMethod === 'cod'
    }
    get getCodFee() {
        return getCodFee(Number(this.cart.total_price), true)
    }
    get isLimitedPromotion() {
        return this.rechargeObject.line_items.find(({type}) =>
            getLimitedPromotionInfo(type),
        )
    }
    get containsLimitedProduct() {
        return this.cart.line_items.find(({title}) =>
            this.getLimitedProduct(title),
        )
    }
    get shippingRatePrice() {
        return this.cart.shipping_rate ? this.cart.shipping_rate.price : 0
    }
    get cartItems(): any[] {
        const items: any[] = []
        if (this.cart && this.cart.line_items) {
            const lineItems = this.cart.line_items
            lineItems.forEach(val => {
                const item = JSON.parse(JSON.stringify(val))
                if (this.isSetSerum(item)) {
                    let setSerum = items.filter(val => 'subtitle' in val)[0]
                    if (setSerum) {
                        this.mergeSetSerum(setSerum, item)
                    } else {
                        setSerum = item
                        setSerum['subtitle'] = item.title
                        setSerum['title'] = 'パーソナライズセラム'
                        items.push(setSerum)
                    }
                } else {
                    items.push(item)
                }
            })
        }
        return items
    }
    get promotionText() {
        if (!this.isLimitedPromotion) {
            return ''
        }
        return this.isLimitedPromotion.type === 'trial set'
            ? 'トライアルセット一覧'
            : 'トータルケアセット一覧'
    }
    get isSelectedTrialSet() {
        return (
            this.rechargeObject.line_items.filter(
                item => item.type === 'trial set',
            ).length > 0
        )
    }
    isSetSerum(item: any): boolean {
        let isSetSerum = false
        if (this.rechargeObject && this.rechargeObject.line_items) {
            isSetSerum =
                this.rechargeObject.line_items.filter(lineItem => {
                    return (
                        Number(lineItem.variant_id) === item.variant_id &&
                        lineItem.type === 'serum' &&
                        lineItem.skinCode
                    )
                }).length > 0
        }
        return isSetSerum
    }
    /**
     * This method handles the following amounts.
     *  1. line_price
     *  2. original_price
     *  3. price
     *  4. tax_lines[0].price
     * Although `line_price` and `tax_lines[0].price` are not used elsewhere,
     * they are handled just in case because they are parameters related to the amounts.
     */
    mergeSetSerum(setSerum: any, item: any) {
        if (setSerum.subtitle !== item.title) {
            setSerum.subtitle = `${setSerum.subtitle}/${item.title}`
        }
        setSerum.line_price = `${Number(setSerum.line_price) +
            Number(item.line_price)}`
        setSerum.original_price = `${Number(setSerum.original_price) +
            Number(item.original_price)}`
        if ('price' in setSerum) {
            setSerum.price = `${Number(setSerum.price) + Number(item.price)}`
        }
        if (setSerum.tax_lines.length > 0) {
            setSerum.tax_lines[0].price = `${Number(
                setSerum.tax_lines[0].price,
            ) + Number(item.tax_lines[0].price)}`
        }
    }
    isNotTrialItem(product) {
        if (!this.trialSetItems) {
            return false
        } else if (!this.trialSetItems.length) {
            return true
        }
        return (
            this.trialSetItems.filter(item => {
                return parseInt(item.variant_id) === product.variant_id
            }).length === 0
        )
    }
}
</script>

<template>
    <!-- eslint-disable-next-line -->
    <section v-if="cart" id="cart-items" class="p-1">
        <h3 class="py-1">
            ご注文内容確定
        </h3>
        <div
            v-if="isLimitedPromotion && !containsLimitedProduct"
            class="cart-total limited-promotion-title mb-1"
        >
            <span class="cart-item-title text-left">
                {{ promotionText }}
            </span>
        </div>
        <div
            v-for="(product, index) in cartItems"
            :key="`${product.variant_id}${index}`"
        >
            <div v-if="product.variant_id" class="cart-total mb-1">
                <span class="cart-item-title text-left">
                    {{ product.title }}
                    <template v-if="product.subtitle">
                        <br />
                        <span class="subtitle">{{
                            `(${product.subtitle} 2本セット)`
                        }}</span>
                    </template>
                </span>
                <template v-if="isNotTrialItem(product)">
                    <span
                        v-if="
                            product.properties &&
                                product.properties.promotion == 'true' &&
                                product.original_price !== product.price
                        "
                        class="cart-item-price text-left text-bold"
                    >
                        <span class="product-price-discounted mr-1">
                            ¥{{ formatPrice(product.original_price) }}
                        </span>
                        <span> ¥{{ formatPrice(product.price) }} </span>
                    </span>
                    <span v-else class="cart-item-price text-left text-bold">
                        ¥{{ formatPrice(product.price) }}
                    </span>
                </template>
            </div>
            <div
                v-if="
                    isLimitedPromotion &&
                        containsLimitedProduct &&
                        product.title === containsLimitedProduct.title
                "
                class="cart-total limited-promotion-title mb-1"
            >
                <span class="cart-item-title text-left">
                    {{ promotionText }}
                </span>
            </div>
        </div>
        <div class="mb-1">
            <DiscountCode :operable="false" />
        </div>
        <div class="cart-total mb-1">
            <span class="cart-item-title text-left">
                送料
            </span>
            <span class="cart-item-price text-left text-bold text-red">
                ¥{{ formatPrice(shippingRatePrice) }}
            </span>
        </div>
        <div class="cart-total mb-1">
            <span class="cart-item-title text-left">
                計（税込）
            </span>
            <span class="cart-item-price text-left text-bold text-red">
                ¥{{ formatPrice(cart.total_price) }}
            </span>
        </div>
        <div v-if="paymentCod" class="p-1 w-90 m-auto">
            上記の合計金額に加えて代引き手数料として
            <span class="notice">{{ getCodFee }}円（税別）</span>
            を商品お届け時に配達業者様にお支払いください
        </div>
    </section>
</template>
<style scoped>
.notice {
    color: #ff0000;
}
.limited-promotion-title {
    color: #fff;
    background-color: #000;
}
.subtitle {
    font-size: 0.8em;
}
</style>
