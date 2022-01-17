<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import Product from '@shared/components/Product.vue'
import {filterProductData} from '@/imyme-app/utils'
import {Action} from 'vuex-class'

@Component({
    components: {
        Product,
    },
})
export default class SubscriptionOverview extends Vue {
    public name: string = 'SubscriptionOverview'

    @Prop({type: Array, default: () => []}) userSubscriptions!: any[]
    @Action('products/getRecipes') getRecipes
    @Action('tablet/getRecipe') getRecipe
    @Action('products/getProductByRemoteId') getProductByRemoteId
    @Action('products/getProductInfo') getProductInfo
    @Action('checkout/unsubscribeRecharge') unsubscribeRecharge

    subscriptions: any[] = []
    showConfirmation: boolean = false
    confirmed: boolean = false

    mounted() {
        this.userSubscriptionsToProducts()
    }

    async userSubscriptionsToProducts() {
        const itemIds = await Promise.all(
            this.userSubscriptions.map(async subscription => {
                const {id} = await this.getRecipes(
                    `gid://shopify/Product/${subscription.shopify_product_id}`,
                )
                return id
            }),
        )
        itemIds.forEach(async itemId => {
            const productInfo = await this.getProductInfo(itemId)
            this.subscriptions.push(productInfo)
        })
    }

    unsubscribeAll() {
        if (!this.confirmed) {
            this.showConfirmation = true
        } else {
            this.userSubscriptions.forEach(subscription => {
                this.unsubscribeRecharge(subscription.id)
            })
            this.$router.push({name: 'mypage'})
        }
    }

    filterProductData(product) {
        const filterProduct = filterProductData(product)
        filterProduct.discountPrice = undefined
        return filterProduct
    }

    cancelSubscription(subscription) {
        this.unsubscribeRecharge(subscription.id)
    }
}
</script>

<template>
    <div class="cart pt-4">
        <div v-if="userSubscriptions.length > 0">
            <h2 class="mt-2">定期購入ー覧</h2>
            <div v-if="subscriptions.length === userSubscriptions.length">
                <section
                    v-for="(subscription, index) in subscriptions"
                    :key="`subscription-${index}`"
                    class="p-1"
                >
                    <Product
                        :disable-link="true"
                        :product="filterProductData(subscription)"
                    />
                </section>
            </div>
            <h4 class="text-center p-2">
                解約ご希望の場合は、下記までお電話ください。
                <br />TEL：0120-212-008 ※ 平日10:00〜17:00 （土・日・祝日は除く
            </h4>
            <div
                v-if="showConfirmation"
                class="text-unsubscribe-confirmation text-center my-2"
            >
                <input
                    id="confirm-unsubscribe"
                    v-model="confirmed"
                    type="checkbox"
                />
                <label for="confirm-unsubscribe">
                    上記定期購入を解約します
                </label>
            </div>
            <!-- <button class="btn w-center-70" @click="unsubscribeAll">
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-forward" />
                </svg>
                <span class="m-auto">
                    定期購解約の手続き
                </span>
            </button>-->
        </div>
        <div v-else>
            <section class="bg-body hero-icon-container flex-col">
                <div class="subscription-icon-container">
                    <svg class="cart-icon">
                        <use xlink:href="#icon-cart" />
                    </svg>
                </div>
                <div>
                    <span>no subscriptions</span>
                </div>
            </section>
            <span class="back-button">
                <router-link class="btn-circle" :to="{name: 'mypage'}">
                    <svg class="icon-stroke icon-stroke-white icon-btn">
                        <use xlink:href="#icon-back" />
                    </svg>
                </router-link>
            </span>
        </div>
    </div>
</template>
