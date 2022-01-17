import { ActionTree } from 'vuex'
import { SubscriptionState } from './types'
import { state } from './index'
import { RootState } from '../../types'
import api from '@/shared/api'

const setErrorMessage = 'application/SET_ERROR_MESSAGE'

export const actions: ActionTree<SubscriptionState, RootState> = {
    async getUserSubscription({ commit }, userId) {
        const subscriptions = await api
            .get(`/subscription/serum/${userId}`)
            .then((response: any) => {
                if (response.errors) {
                    return Promise.resolve({ subscription: [] })
                }
                return Promise.resolve(response)
            })
            .catch(() => {
                // If an error occurs, including 404 errors, return an empty value
                return Promise.resolve({ subscription: [] })
            })
        commit('SET_SUBSCRIPTIONS', subscriptions)
        return subscriptions
    },

    setRetentionSubscription({ commit }, props) {
        const { serums, skinCode } = props
        commit('RETENTION_SUBSCRIPTION_SERUM', serums)
        commit('RETENTION_SUBSCRIPTION_SKINCODE', skinCode)
    },

    setUserSubscription({ commit }, props) {
        const {
            customerId,
            serum,
            skinCode,
            orderNumber = '',
        } = props

        return api
            .post('/subscription/serum', {
                customerId: customerId,
                subscription: {
                    serum: serum,
                    skinCode: skinCode,
                },
                orderNumber: orderNumber,
            })
            .then((response: any) => {
                return Promise.resolve(response)
            })
            .catch(error => {
                commit(
                    setErrorMessage,
                    {
                        endpoint: 'subscription/serum',
                        error: error,
                    },
                    { root: true },
                )
                return Promise.reject(error)
            })
    },
}
