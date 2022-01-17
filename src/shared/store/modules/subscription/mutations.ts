import { MutationTree } from 'vuex'
import { SubscriptionState } from './types'

export const mutations: MutationTree<SubscriptionState> = {
    RESET(state) {
        state.subscription = null
        state.beforeCheckoutSerums = null
        state.beforeCheckoutSkinCode = null
    },
    SET_SUBSCRIPTIONS(state, data) {
        state.subscription = data
    },
    RETENTION_SUBSCRIPTION_SERUM(state, data) {
        state.beforeCheckoutSerums = data
    },
    RETENTION_SUBSCRIPTION_SKINCODE(state, data) {
        state.beforeCheckoutSkinCode = data
    },
}
