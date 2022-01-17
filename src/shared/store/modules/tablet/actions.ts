import {ActionTree} from 'vuex'
import {TabletState} from './types'
import {state} from './index'
import {RootState} from '../../types'
import api from '@/shared/api'

export const actions: ActionTree<TabletState, RootState> = {
    getRecipe({commit}, recipeId) {
        return api
            .get(`/recipes/${recipeId}`)
            .then(response => {
                commit('SET_RECIPE', response)
                return Promise.resolve(response)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },

    getRecipeModifications({commit}, recipeId) {
        return api
            .get(`/admin/recipes/${recipeId}/modifications`)
            .then(response => {
                commit('SET_MODIFICATIONS', response)
                return Promise.resolve()
            })
    },

    getCustomerByRemoteId({commit}, remoteId) {
        return api.get(`/customers?remoteId=${remoteId}`).then(response => {
            commit('SET_CUSTOMER', response)
            return Promise.resolve(response)
        })
    },

    createOrder({commit}, props) {
        return api
            .post('/orders', {
                customerId: props.customerId,
                recipeId: props.recipeId,
            })
            .then(response => {
                commit('SET_ORDER', response)
                return Promise.resolve(response)
            })
    },

    getOrderStatus({commit}, orderID) {
        return api
            .get(`/orders/${orderID}`)
            .then(response => {
                commit('SET_ORDER', response)
                return Promise.resolve(response)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
}
