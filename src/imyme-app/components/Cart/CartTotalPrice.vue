<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {formatPrice} from '@/imyme-app/utils'
import {Getter} from 'vuex-class'

@Component
export default class CartTotalPrice extends Vue {
    public name: string = 'CartTotalPrice'

    @Prop({type: Object, default: () => ({})}) cart: any
    @Prop({type: Object, default: null}) totalPrice: any
    @Getter('checkout/getRechargeObjectTotal') getRechargeObjectTotal
    @Getter('checkout/getCheckout') getCheckout
    @Getter('checkout/isAppliedDiscount') isAppliedDiscount

    get discountedPrice() {
        if (
            this.totalPrice &&
            this.totalPrice.price !== this.totalPrice.discounted
        ) {
            return this.totalPrice.discounted
                ? this.totalPrice.discounted
                : null
        }
        return this.isAppliedDiscount
            ? this.getRechargeObjectTotal -
                  this.getCheckout.applied_discount.amount
            : null
    }

    get defaultTotalPrice() {
        return this.totalPrice
            ? this.totalPrice.price
            : this.getRechargeObjectTotal
    }

    formatPrice(price) {
        return formatPrice(price)
    }
}
</script>

<template>
    <!-- eslint-disable-next-line -->
    <div v-if="cart">
        <div class="cart-total bg-body">
            <span class="text" role="heading">計（税込）</span>
            <span class="cart-item-price">
                <template v-if="discountedPrice">
                    <span class="product-price-discounted mr-1">
                        ¥{{ formatPrice(defaultTotalPrice) }}
                    </span>
                    ¥{{ formatPrice(discountedPrice) }}
                </template>
                <template v-else>
                    ¥{{ formatPrice(defaultTotalPrice) }}
                </template>
            </span>
        </div>
    </div>
</template>

<style scoped>
.cart-total > .cart-item-price {
    font-size: 2.5em;
    font-weight: 500;
}
span.cart-item-price {
    color: #ed7c8b;
}
</style>
