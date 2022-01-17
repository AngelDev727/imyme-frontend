<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action, Mutation} from 'vuex-class'

declare global {
    interface Window {
        FFadConversion: any
    }
}
window.FFadConversion = window.FFadConversion || {}

@Component
export default class CheckoutComplete extends Vue {
    public name: string = 'CheckoutComplete'

    @Action('user/getUser') getUser
    @Action('checkout/getUserSubscriptionsRecharge') getUserSubscriptionsRecharge
    @Action('checkout/getUserOrderHistory') getUserOrderHistory
    @Action('checkout/getSubscriptionsCod') getSubscriptionsCod
    @Mutation('checkout/RESET_PROCESS_CHECKOUT') resetProcessCheckout

    FFadSpid = '165'
    FFadOid = ''
    FFadQuant = '1'
    FFadAmount = '1'
    FFadPm1 = ''
    FFadPrid = ''
    FFadOpt = ''

    mounted() {
        this.$nextTick(() => {
            if (this.$route.params.id) {
                this.FFadOid = this.$route.params.id
                window.FFadConversion(
                    this.FFadSpid,
                    this.FFadOid,
                    this.FFadQuant,
                    this.FFadAmount,
                    this.FFadPm1,
                    this.FFadPrid,
                    this.FFadOpt,
                )
            }
            this.resetCheckoutData()
            this.reloadPurchaseInfo()
        })
    }

    resetCheckoutData() {
        this.resetProcessCheckout()
        sessionStorage.removeItem('checkout')
    }

    async reloadPurchaseInfo() {
        const user = await this.getUser()
        await this.getUserSubscriptionsRecharge(user.id)
        await this.getUserOrderHistory(user.id)
        await this.getSubscriptionsCod(user.id)
    }
}
</script>

<template>
    <div class="py-5 text-center flex-col flex-center flex-ai h-100vh">
        <svg class="icon-stroke icon-xl mx-auto mt-5 mb-0">
            <use xlink:href="#icon-delivery" />
        </svg>
        <div class="pt-3 pb-1 text-large text-dark">
            注文受け付けました。
        </div>
        <router-link
            tag="button"
            class="btn mb-2 w-center-70"
            :to="{name: 'top'}"
        >
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-forward" />
            </svg>
            <span class="m-auto">
                TOPへ
            </span>
        </router-link>
    </div>
</template>
