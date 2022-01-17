<template>
    <div v-if="cart">
        <div
            v-for="(product, index) in collateLineItems"
            :key="`${product.id}-${index}`"
            class="mt-1"
        >
            <Product :product="product" :disable-link="!allowRemove">
                <button
                    v-if="allowRemove"
                    slot="button"
                    class="btn btn-item p-0"
                    data-testid="remove-item-button"
                    @click="removeFromCart(product, index)"
                >
                    <span class="m-auto text-regular">削除する</span>
                </button>
            </Product>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import Product from '@shared/components/Product.vue'
import {
    formatPrice,
    getDiscountedInfo,
    getLimitedPromotionInfo,
} from '@/imyme-app/utils'
import {Mutation, Getter} from 'vuex-class'

@Component({
    components: {
        Product,
    },
})
export default class Cart extends Vue {
    public name: string = 'Cart'

    @Prop({type: Object, default: () => ({})}) cart: any
    @Prop({type: Boolean, default: false}) allowRemove!: boolean
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @Getter('checkout/getRechargeObjectTotal') getRechargeObjectTotal
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes

    collateLineItems: any = []

    formatPrice(price) {
        return formatPrice(price)
    }
    async removeFromCart(itemToRemove, index) {
        const removeItemNo = itemToRemove.map(line => line.line_item_no)[0]
        const {line_items} = this.cart
        const lineItems: any[] = []
        line_items.forEach((item, liIndex) => {
            if (
                liIndex == 0 &&
                item.properties.promotion == 'true' &&
                line_items.length == 1 &&
                !getLimitedPromotionInfo(item.type)
            ) {
                lineItems.push({...item, properties: {promotion: 'false'}})
            } else if (removeItemNo !== item.line_item_no) {
                lineItems.push({...item})
            }
        })

        const rechargeObject = {
            ...this.cart,
            line_items: lineItems,
        }

        this.setRechargeObject(rechargeObject)
        //Prevents a 0yen charged case where user has 100% discount on soap then removes serum
        if (lineItems.find(({type}) => type == 'soap')) {
            lineItems[0].discountPrice = getDiscountedInfo(
                lineItems[0].type,
                lineItems[0].price,
                this.getRechargeObjectTypes,
            ).discountPrice
        }
    }
    @Watch('cart')
    async onResultsChange() {
        this.collateItem(this.cart)
    }
    async created() {
        this.collateItem(this.cart)
    }
    async collateItem(cart) {
        if (cart) {
            // line_item_sqの重複なし一覧を取得する
            const unique_item = cart.line_items
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
                    cart.line_items.filter(item => {
                        return item.line_item_no === no
                    }),
                )
            })
            this.collateLineItems = lineItem
        }
    }
}
</script>
<style>
.cart-total > .cart-item-price {
    font-size: 2.5em;
    font-weight: 500;
}
span.cart-item-price {
    color: #ed7c8b;
}
button {
    display: block;
    margin-top: 4.2vw;
}
</style>
