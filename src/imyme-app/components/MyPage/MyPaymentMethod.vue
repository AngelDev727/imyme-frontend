<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {CodProduct} from '@/shared/store/modules/checkout/types'

@Component
export default class MyPaymentMethod extends Vue {
    public name: string = 'MyPaymentMethod'

    @State(state => state.checkout.userSubscriptions)
    userSubscriptions!: any[]
    @State(state => state.checkout.userCodSubscriptions)
    userCodSubscriptions!: CodProduct[]

    get rechargeSubscriptions() {
        if (this.userSubscriptions) {
            return this.userSubscriptions.filter(subscription => {
                if (subscription.status === 'ACTIVE') {
                    return subscription
                }
            })
        } else {
            return []
        }
    }
    get paymentMethod() {
        if (
            this.rechargeSubscriptions &&
            this.rechargeSubscriptions.length > 0
        ) {
            return 'クレジットカード'
        } else if (
            this.userCodSubscriptions &&
            this.userCodSubscriptions.length > 0
        ) {
            return '商品代引き'
        } else {
            return '---'
        }
    }
}
</script>

<template>
    <div
        v-if="
            (userCodSubscriptions && userCodSubscriptions.length > 0) ||
                (rechargeSubscriptions && rechargeSubscriptions.length > 0)
        "
    >
        <section class="p-1">
            <div class="summary-heading pb-1 max-w">
                <span class="summary--title">
                    定期購入のお支払い方法
                </span>
                <router-link
                    :to="{name: 'edit-payment-method'}"
                    class="edit--button"
                    tag="button"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-return" />
                    </svg>
                    編集
                </router-link>
            </div>
            <h3 class="bg-body p-1 text-center">
                {{ paymentMethod }}
            </h3>
        </section>
    </div>
</template>
