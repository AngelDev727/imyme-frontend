import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { ProductsState } from './types'
import { RootState } from '../../types'

export const state: ProductsState = {
    products: null,
    essence: null,
    flow: false,
    productModal: null,
    productTimer: null,
}

const namespaced: boolean = true

export const products: Module<ProductsState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}
