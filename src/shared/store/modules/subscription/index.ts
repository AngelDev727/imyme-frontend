import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { SubscriptionState } from './types'
import { RootState } from '../../types'

export const state: SubscriptionState = {
    subscription: null,
    beforeCheckoutSerums: null,
    beforeCheckoutSkinCode: null
}

const namespaced: boolean = true

export const subscription: Module<SubscriptionState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}