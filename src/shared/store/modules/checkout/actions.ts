import {ActionTree} from 'vuex'
import {CheckoutState} from './types'
import {state} from './index'
import {RootState} from '../../types'
import api from '@/shared/api'
import * as Sentry from '@sentry/browser'

const setErrorMessage = 'application/SET_ERROR_MESSAGE'

export const actions: ActionTree<CheckoutState, RootState> = {
    createRechargeCheckout({commit}, CheckoutInfo) {
        const {rechargeObject, showErrors = true} = CheckoutInfo

        return api
            .post('/recharge/checkouts', {
                checkout: rechargeObject,
            })
            .then(response => {
                if (response.hasOwnProperty('errors')) {
                    if (showErrors) {
                        Sentry.withScope(scope => {
                            scope.setExtra('rechargeCheckoutsError', response)
                            Sentry.captureException(response)
                        })
                        commit(
                            setErrorMessage,
                            {
                                endpoint: '/recharge/checkouts',
                                error: response,
                            },
                            {root: true},
                        )
                        return Promise.reject(response)
                    }
                } else {
                    commit('SET_CHECKOUT', response)
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('rechargeCheckoutsError', error)
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/recharge/checkouts',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    async getUserSubscriptionsRecharge({commit}, userId) {
        const decodedId = window.atob(userId)
        const uid = decodedId.split('/').reverse()[0]
        const {subscriptions} = await api
            .get(`/recharge/subscriptions`, {
                params: {
                    shopify_customer_id: uid,
                },
            })
            .then((response: any) => {
                //the user hasn't bought anything yet so dosn't have a shopify_customer_id
                if (response.errors) {
                    return Promise.resolve({subscriptions: []})
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                const {response} = error
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: '/recharge/subscriptions',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(response)
            })
        // if there was an error fetching the data the user won't be offered a discount
        commit('SET_SUBSCRIPTIONS', subscriptions)
        return subscriptions
    },

    async getUserPurchaseCountRecharge({commit}, userId) {
        const decodedId = window.atob(userId)
        const uid = decodedId.split('/').reverse()[0]
        const purchaseCount = await api
            .get(`/recharge/purchase_count`, {
                params: {
                    shopify_customer_id: uid,
                },
            })
            .then(response => {
                if (!response.hasOwnProperty('count')) {
                    commit(
                        'application/SET_ERROR_MESSAGE',
                        {
                            endpoint: '/recharge/purchase_count',
                            error: response,
                        },
                        {root: true},
                    )
                    return Promise.reject(response)
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('rechargePurchaseCountError', error)
                    Sentry.captureException(error)
                })
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: '/recharge/purchase_count',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
        commit('SET_PURCHASE_COUNT', purchaseCount)
        return purchaseCount
    },

    async getUserOrderHistory({commit}, userId) {
        const decodedId = window.atob(userId)
        const uid = decodedId.split('/').reverse()[0]
        const {orders, discounted, boundary_date} = await api
            .get(`/orders/history`, {
                params: {
                    shopify_customer_id: uid,
                },
            })
            .then((response: any) => {
                if (
                    !response.hasOwnProperty('orders') ||
                    !response.hasOwnProperty('discounted')
                ) {
                    commit(
                        'application/SET_ERROR_MESSAGE',
                        {
                            endpoint: '/orders/history',
                            error: response,
                        },
                        {root: true},
                    )
                    return Promise.reject(response)
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('orderHistoryError', error)
                    Sentry.captureException(error)
                })
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: '/orders/history',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
        commit('SET_ORDERS_HISTORY', orders)
        commit('SET_ORDERS_DISCOUNTED', discounted)
        commit('SET_ORDERS_HISTORY_BOUNDARY_DATE', boundary_date)
        return orders
    },

    async updateSubscriptionsRecharge({commit}, subscriptionInfo) {
        const {
            subscriptionIdList,
            beforeOrderIntervalFrequency,
            afterOrderIntervalFrequency,
            nextChargeScheduledAt,
        } = subscriptionInfo

        return api
            .put('/recharge/v2/subscriptions', {
                id_list: subscriptionIdList,
                order_interval_unit: 'day',
                before_order_interval_frequency: beforeOrderIntervalFrequency,
                after_order_interval_frequency: afterOrderIntervalFrequency,
                next_charge_scheduled_at: nextChargeScheduledAt,
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('checkoutChargeError', error)
                    Sentry.captureException(error)
                })
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: '/recharge/v2/subscriptions',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    async updateSubscriptionRechargeAddress({commit}, updateInfo) {
        const {subscriptionAddressIdList, address} = updateInfo

        return api
            .put(`/recharge/subscriptions/change_address`, {
                subscriptionAddressIdList: subscriptionAddressIdList,
                address: address,
            })
            .then(response => {
                if (!response.hasOwnProperty('address')) {
                    commit(
                        'application/SET_ERROR_MESSAGE',
                        {
                            endpoint: '/recharge/subscriptions/change_address',
                            error: response,
                        },
                        {root: true},
                    )
                    return Promise.reject(response)
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('rechargeChangeAddressError', error)
                    Sentry.captureException(error)
                })
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: '/recharge/subscriptions/change_address',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    async checkSubscriptionProductRecharge({commit}, subscriptionInfo) {
        const {nextChargeScheduledAt} = subscriptionInfo

        return api
            .get(`/recharge/subscription/change_product`, {
                params: {
                    next_charge_scheduled_at: nextChargeScheduledAt,
                },
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra(
                        'rechargeCheckSubscriptionProductError',
                        error,
                    )
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/recharge/subscription/change_product',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    async updateSubscriptionProductRecharge({commit}, subscriptionInfo) {
        const {
            subscriptionIdList,
            shopifyCustomerId,
            beforeItemProductIdList,
            afterItemShopifyVariantIdList,
            reason,
        } = subscriptionInfo

        return api
            .put('/recharge/v2/subscription/change_product', {
                id_list: subscriptionIdList,
                shopify_customer_id: shopifyCustomerId,
                before_item_product_id_list: beforeItemProductIdList,
                after_item_shopify_variant_id_list: afterItemShopifyVariantIdList,
                reason: reason,
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra(
                        'rechargeUpdateSubscriptionProductError',
                        error,
                    )
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/recharge/v2/subscription/change_product',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    unsubscribeRecharge({commit}, subscriptionId) {
        return api
            .post(`/recharge/subscriptions/${subscriptionId}/cancel`)
            .then(response => {
                return Promise.resolve(response)
            })
    },

    processRechargePayment({commit}, paymentData) {
        const {
            checkoutToken,
            paymentToken,
            shippingPrefecture,
            discount,
            stub,
            oneTimeItemId,
            orderCycle,
        } = paymentData
        //Add a temporary verification for the payload to help debug IMYME-JP-BK
        try {
            if (!checkoutToken) {
                throw Error('no checkoutToken')
            } else if (!paymentToken) {
                throw Error('no paymentToken')
            } else if (!shippingPrefecture) {
                throw Error('no shippingPrefecture')
            }
        } catch (error) {
            commit(
                'application/SET_ERROR_MESSAGE',
                {
                    endpoint: 'processRechargePayment',
                    error: error,
                },
                {root: true},
            )
            return Promise.reject(error)
        }
        return api
            .post('/recharge/checkouts/charge', {
                checkoutToken: checkoutToken,
                paymentToken: paymentToken,
                shippingPrefecture: shippingPrefecture,
                discount: discount,
                stub: stub,
                oneTimeItemId: oneTimeItemId,
                orderCycle: orderCycle,
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('checkoutChargeError', error)
                    Sentry.captureException(error)
                })
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: '/recharge/checkouts/charge',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    orderCod({commit}, orderData) {
        const {order, oneTimeItemId, orderCycle} = orderData

        try {
            if (!order.customer.id) {
                throw Error('no customerId')
            }
        } catch (error) {
            commit(
                setErrorMessage,
                {
                    endpoint: '/orders/cod',
                    error: error,
                },
                {root: true},
            )
            return Promise.reject(error)
        }
        return api
            .post('/orders/cod', {
                order,
                oneTimeItemId,
                orderCycle,
            })
            .then(response => {
                if (response.hasOwnProperty('errors')) {
                    Sentry.withScope(scope => {
                        scope.setExtra('orderCodError', response)
                        Sentry.captureException(response)
                    })
                    commit(
                        setErrorMessage,
                        {
                            endpoint: '/orders/cod',
                            error: response,
                        },
                        {root: true},
                    )
                    return Promise.reject(response)
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('orderCodError', error)
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/orders/cod',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    async getSubscriptionsCod({commit}, userId) {
        const decodedId = window.atob(userId)
        const customerId = decodedId.split('/').reverse()[0]

        const cod_subscriptions = await api
            .get(`/orders/cod/${customerId}`)
            .then(response => {
                if (response.hasOwnProperty('errors')) {
                    Sentry.withScope(scope => {
                        scope.setExtra('orderCodError', response)
                        Sentry.captureException(response)
                    })
                    commit(
                        setErrorMessage,
                        {
                            endpoint: '/orders/cod',
                            error: response,
                        },
                        {root: true},
                    )
                    return Promise.reject(response)
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('orderCodError', error)
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/orders/cod',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })

        commit('SET_COD_SUBSCRIPTIONS', cod_subscriptions)
        return cod_subscriptions
    },

    updatePaymentMethod({commit}, paymentData) {
        const {customerId, paymentMethod, stripeToken} = paymentData
        try {
            if (!customerId) {
                throw Error('no customerId')
            }
        } catch (error) {
            commit(
                setErrorMessage,
                {
                    endpoint: '/orders/payment_method',
                    error: error,
                },
                {root: true},
            )
            return Promise.reject(error)
        }
        return api
            .put('/orders/payment_method', {
                customerId,
                paymentMethod,
                stripeToken,
            })
            .then(response => {
                if (response.hasOwnProperty('errors')) {
                    Sentry.withScope(scope => {
                        scope.setExtra('orderPaymentMethodError', response)
                        Sentry.captureException(response)
                    })
                    commit(
                        setErrorMessage,
                        {
                            endpoint: '/orders/payment_method',
                            error: response,
                        },
                        {root: true},
                    )
                    return Promise.reject(response)
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('orderPaymentMethodError', error)
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/orders/payment_method',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    updateSubscriptionsCod({commit}, subscriptionInfo) {
        const {
            subscriptionIdList,
            beforeOrderIntervalFrequency,
            afterOrderIntervalFrequency,
            nextChargeScheduledAt,
        } = subscriptionInfo

        return api
            .put('/orders/v2/cod/subscriptions', {
                id_list: subscriptionIdList,
                before_order_cycle: beforeOrderIntervalFrequency,
                after_order_cycle: afterOrderIntervalFrequency,
                next_order_date: nextChargeScheduledAt,
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('orderCodSubscriptionsError', error)
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/orders/v2/cod/subscriptions',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    updateSubscriptionCodProduct({commit}, subscriptionInfo) {
        const {
            subscriptionIdList,
            shopifyCustomerId,
            beforeItemProductIdList,
            afterItemShopifyProductIdList,
            afterItemShopifyVariantIdList,
            reason,
        } = subscriptionInfo

        return api
            .put('/orders/cod/subscriptions/change_product', {
                id_list: subscriptionIdList,
                shopify_customer_id: shopifyCustomerId,
                before_item_product_id_list: beforeItemProductIdList,
                after_item_shopify_product_id_list: afterItemShopifyProductIdList,
                after_item_shopify_variant_id_list: afterItemShopifyVariantIdList,
                reason: reason,
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('updateCodSubscriptionsProductError', error)
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/orders/cod/subscriptions/change_product',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    async fetchDiscountCode({commit}, code) {
        const discount_code = await api
            .get('/recharge/discount', {
                params: {
                    code: code,
                },
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('getDiscountCodeError', error)
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/recharge/discount',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })

        commit('SET_DISCOUNT_CODE', discount_code)
    },

    async getCodAppliedDiscount({commit}, codAppliedDiscountInfo) {
        const {userId, code} = codAppliedDiscountInfo

        const decodedId = window.atob(userId)
        const shopifyCustomerId = decodedId.split('/').reverse()[0]

        return api
            .get(`/orders/cod/applied-discount/${shopifyCustomerId}`, {
                params: {
                    code: code,
                },
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                Sentry.withScope(scope => {
                    scope.setExtra('getCodAppliedDiscountError', error)
                    Sentry.captureException(error)
                })
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/orders/cod/applied-discount',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },
}
