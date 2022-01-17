<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State, Action} from 'vuex-class'
import {CheckoutState} from '@/shared/store/modules/checkout/types'
import SubscriptionOverview from '@app/components/Unsubscribe/SubscriptionOverview.vue'
import UnsubscriptionConfirmation from '@app/components/Unsubscribe/UnsubscriptionConfirmation.vue'

@Component({
    components: {
        SubscriptionOverview,
        UnsubscriptionConfirmation,
    },
})
export default class UnsubscribeForm extends Vue {
    public name: string = 'UnsubscribeForm'

    confirmed: boolean = false
    showTerms: boolean = false
    @State('checkout') checkoutState!: CheckoutState
    @Action('checkout/unsubscribeRecharge') unsubscribeRecharge

    get userSubscriptions(): any {
        if (this.checkoutState.userSubscriptions) {
            return this.checkoutState.userSubscriptions.filter(subscription => {
                if (subscription.status === 'ACTIVE') {
                    return subscription
                }
            })
        }
        return []
    }

    confirmUnsubscribe() {
        this.unsubscribeRecharge.then(() => {
            this.confirmed = true
            this.$router.push({name: 'unsubscribe-complete'})
        })
    }
}
</script>

<template>
    <div class="mt-5 pt-3">
        <SubscriptionOverview :user-subscriptions="userSubscriptions" />
    </div>
</template>
