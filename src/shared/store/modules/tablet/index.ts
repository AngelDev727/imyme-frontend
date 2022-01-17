import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { TabletState } from './types'
import { RootState } from '../../types'

export const state: TabletState = {
    recipe: null,
    tuning: [],
    modifications: null,
    childRecipeId: null,
    customerDetails: null,
    order: null,
}

const namespaced: boolean = true

export const tablet: Module<TabletState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}
