import { ActionTree } from 'vuex'
import { RootState } from './types'

export const actions: ActionTree<RootState, RootState> = {
    resetState({ commit }) {
        commit('application/RESET_LOADING_WITH_PROMISE')
        commit('checkout/RESET')
        commit('products/RESET')
        commit('social/RESET')
        commit('survey/RESET')
        commit('tablet/RESET')
        commit('user/RESET')
        commit('subscription/RESET')
    },
}
