<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {limitedProductInfo} from '@/imyme-app/utils'
import Section from '@app/components/Subscription/Section.vue'
import SectionCod from '@app/components/Subscription/SectionCod.vue'
import {CodProduct} from '@/shared/store/modules/checkout/types'

@Component({
    components: {
        Section,
        SectionCod,
    },
})
export default class MySubscription extends Vue {
    public name: string = 'MySubscription'

    @State(state => state.checkout.userSubscriptions) userSubscriptions!: any[]
    @State(state => state.checkout.userCodSubscriptions)
    userCodSubscriptions!: CodProduct[]

    get subscriptions() {
        if (this.userSubscriptions) {
            return this.userSubscriptions.filter(subscription => {
                if (subscription.status === 'ACTIVE') {
                    for (const productId in limitedProductInfo) {
                        const pattern = limitedProductInfo[productId].name
                        if (subscription.product_title.indexOf(pattern) === 0) {
                            console.log('hidden: ' + subscription.product_title)
                            return false
                        }
                    }
                    return subscription
                }
            })
        } else {
            return []
        }
    }
    get codSubscriptions() {
        if (this.userCodSubscriptions && this.userCodSubscriptions.length > 0) {
            return this.userCodSubscriptions
        } else {
            return []
        }
    }
}
</script>

<template>
    <div
        v-if="
            (subscriptions && subscriptions.length > 0) ||
                (codSubscriptions && codSubscriptions.length > 0)
        "
        id="my-subscription"
    >
        <section class="p-1 mb-2">
            <div class="summary-heading max-w">
                <span class="summary--title">
                    次回配送内容
                </span>
            </div>
            <p class="note-update-subscription">
                ※次回注文日の1週間前まで変更できます。<br />
                ※注文日から製品到着まで5日間ほどかかる場合がございます。
            </p>
            <template v-if="subscriptions && subscriptions.length > 0">
                <Section :my-subscriptions="subscriptions" />
            </template>
            <template v-if="codSubscriptions && codSubscriptions.length > 0">
                <SectionCod :my-subscriptions="codSubscriptions" />
            </template>
        </section>
    </div>
</template>

<style scoped>
p.note-update-subscription {
    text-align: center;
    padding-bottom: 1em;
    font-size: 11px;
}
</style>
