import { MutationTree } from 'vuex'
import { ProductsState } from './types'

export const mutations: MutationTree<ProductsState> = {
    RESET(state) {
        state.products = null
    },
    SET_PRODUCTS(state, data) {
        state.products = data
    },
    RESET_ESSENCE(state) {
        state.essence = null
    },
    SET_ESSENCE(state, data) {
        state.essence = data
    },
}
