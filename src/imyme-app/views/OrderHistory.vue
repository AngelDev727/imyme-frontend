<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action, State} from 'vuex-class'
import Product from '@app/components/OrderHistory/Product.vue'
import {filterProductDataOrderHistory} from '@/imyme-app/utils'
import {
    OrderHistoryInfo,
    OrderHistoryLineItemProperty,
    OrderHistoryFulfillment,
} from '@/shared/store/modules/checkout/types'

interface LineItems {
    product_id: number
    properties: OrderHistoryLineItemProperty[]
    ordered_at: string
    fulfillment_status: string
    fulfillments: OrderHistoryFulfillment[]
}

@Component({
    components: {
        Product,
    },
})
export default class OrderHistory extends Vue {
    public name: string = 'OrderHistory'

    @Action('products/getRecipes') getRecipes
    @Action('products/getProductInfo') getProductInfo
    @State(state => state.checkout.ordersHistory) ordersHistory!: OrderHistoryInfo[]
    @State(state => state.checkout.ordersHistoryBoundaryDate) ordersHistoryBoundaryDate!: string

    products: any[] = []

    mounted() {
        this.ordersHistoryToProducts()
    }

    formatDate(date) {
        const picked = date.match(/^\d{4}-\d{2}-\d{2}/)
        return picked ? picked[0].replace(/-/g, '.') : '---'
    }

    async ordersHistoryToProducts() {
        const lineItems: LineItems[] = []

        this.validOrdersHistory.forEach(order => {
            order.line_items.forEach(line_item => {
                lineItems.push({
                    product_id: line_item.product_id,
                    properties: line_item.properties,
                    ordered_at: order.created_at,
                    fulfillment_status: line_item.fulfillment_status,
                    fulfillments: order.fulfillments,
                })
            })
        })

        this.products = await Promise.all(
            lineItems.map(async lineItem => {
                const {id} = await this.getRecipes(
                    `gid://shopify/Product/${lineItem.product_id}`,
                )

                const productInfo = await this.getProductInfo(id)
                productInfo.properties = lineItem.properties
                productInfo.ordered_at = lineItem.ordered_at
                productInfo.fulfillment_status = lineItem.fulfillment_status
                productInfo.fulfillments = lineItem.fulfillments

                return productInfo
            }),
        )
    }

    filterProductDataOrderHistory(product) {
        return filterProductDataOrderHistory(product)
    }

    get validOrdersHistory() {
        if (this.ordersHistory) {
            return this.ordersHistory
                .filter(order => order.cancelled_at === '')
                .filter(
                    order => order.created_at >= this.ordersHistoryBoundaryDate,
                )
                .map(order => order)
        } else {
            return []
        }
    }
}
</script>

<template>
    <div class="mt-5 pt-3">
        <div class="pt-3">
            <h2>注文履歴</h2>
            <div v-if="validOrdersHistory && validOrdersHistory.length > 0">
                <section
                    v-for="(product, index) in products"
                    :key="`order-${index}`"
                    class="p-1 history-section"
                >
                <div v-if="index === 0">
                    <h3 class="date ls-1 my-1">
                        {{formatDate(product.ordered_at)}}
                    </h3>
                </div>
                <div v-else-if="formatDate(products[index - 1].ordered_at) !== formatDate(product.ordered_at)">
                    <h3 class="date ls-1 my-1">
                        {{formatDate(product.ordered_at)}}
                    </h3>
                </div>
                    <Product
                        :product="filterProductDataOrderHistory(product)"
                    />
                </section>
            </div>
            <div v-else>
                <div class="py-5 text-center text-large text-light">
                    過去1年以内の注文履歴はありません。
                </div>
            </div>
            <div class="mt-5 mb-3">
                <router-link
                    tag="button"
                    class="btn w-center-70"
                    :to="{name: 'mypage'}"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-back" />
                    </svg>
                    <span class="m-auto">戻る</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.history-section {
    margin: 1rem 1.5rem 1rem;
}
</style>
