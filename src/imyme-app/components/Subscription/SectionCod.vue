<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {Action, State} from 'vuex-class'
import {filterProductDataSubscription} from '@/imyme-app/utils'
import Product from '@app/components/Subscription/Product.vue'
import {CodProduct} from '@/shared/store/modules/checkout/types'
import {User} from '@/shared/store/modules/user/types'

@Component({
    components: {
        Product,
    },
})
export default class SectionCod extends Vue {
    public name: string = 'SectionCod'

    @Prop({type: Array, default: () => []})
    readonly mySubscriptions!: CodProduct[]
    @State(state => state.user.user) user!: User
    @Action('products/getRecipes') getRecipes
    @Action('products/getProductInfo') getProductInfo
    @Action('subscription/getUserSubscription') getUserSubscription

    subscriptionList: any[] = []
    sortItem: string = 'title'
    paymentMethod: string = 'cod'
    subscriptionBundleList: any[] = []

    mounted() {
        this.mySubscriptionsToProducts()
    }

    async mySubscriptionsToProducts() {
        this.subscriptionList = await Promise.all(
            this.mySubscriptions.map(async subscription => {
                const {id} = await this.getRecipes(
                    `gid://shopify/Product/${subscription.ItemProductID}`,
                )
                const productInfo = await this.getProductInfo(id)
                productInfo.subscription_id = subscription.ID
                productInfo.next_charge_scheduled_at =
                    subscription.NextOrderDate
                productInfo.order_interval_frequency = subscription.OrderCycle
                return productInfo
            }),
        )

        this.subscriptionList = this.sortArray(
            this.subscriptionList,
            this.sortItem,
        )
        this.bundleSubscriptionProduct()
    }

    async bundleSubscriptionProduct() {
        let subscriptionInfo = await this.getUserSubscription(this.user.id)
        const subscriptionSerum = subscriptionInfo.subscription.serum
        let subscriptionItem: any[] = []
        this.subscriptionBundleList = []
        if (subscriptionSerum) {
            subscriptionSerum.forEach(serum => {
                const index = this.subscriptionList.findIndex(item => {
                    return item.name == serum.name
                })
                if (index > -1) {
                    const subscription_item: any = this.subscriptionList
                        .splice(index, 1)
                        .shift()
                    subscription_item.serumType = serum.type
                    subscriptionItem.push(
                        this.filterProductDataSubscription(subscription_item),
                    )
                }
            })
            if (subscriptionItem.length > 0) {
                this.subscriptionBundleList.push(subscriptionItem)
            }
        }

        this.subscriptionList.forEach(item => {
            subscriptionItem = []
            subscriptionItem.push(this.filterProductDataSubscription(item))
            this.subscriptionBundleList.push(subscriptionItem)
        })
    }

    sortArray(array, sortItem) {
        return array.sort((a, b) => {
            return a[sortItem] > b[sortItem] ? 1 : -1
        })
    }

    filterProductDataSubscription(product) {
        return filterProductDataSubscription(product)
    }

    @Watch('mySubscriptions')
    onMySubscriptionsChanged() {
        this.mySubscriptionsToProducts()
    }
}
</script>

<template>
    <div v-if="mySubscriptions && mySubscriptions.length > 0">
        <section
            v-for="(subscription, index) in subscriptionBundleList"
            :key="`subscription-${index}`"
            class="product-section"
        >
            <Product
                :product="subscription"
                :payment-method="paymentMethod"
            />
        </section>
    </div>
</template>

<style scoped>
.product-section {
    margin: 0;
}

.product-section:nth-child(n + 2) {
    margin-top: 1rem;
}
</style>
