import { MutationTree } from 'vuex'
import { TabletState } from './types'

export const mutations: MutationTree<TabletState> = {
    RESET(state) {
        state.recipe = null
        state.tuning = []
        state.modifications = null
        state.childRecipeId = null
        state.customerDetails = null
        state.order = null
    },

    SET_RECIPE(state, data) {
        state.recipe = data
    },

    SET_MODIFICATIONS(state, data) {
        state.modifications = data
    },

    SET_TUNING(state, data) {
        state.tuning = data
    },

    SET_CHILD_RECIPE(state, data) {
        state.childRecipeId = data
    },

    SET_CUSTOMER(state, data) {
        state.customerDetails = data
    },

    SET_ORDER(state, data) {
        state.order = data
    },
}
