import {Module} from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
import {CheckoutState} from './types'
import {RootState} from '../../types'

export const state: CheckoutState = {
    checkout: null,
    subscriptionChecked: false,
    userSubscriptions: [],
    message: null,
    mockDiscount: null,
    shippingAddress: null,
    rechargeDiscount: null,
    stripePaymentToken: null,
    rechargeObject: {line_items: []},
    promotion: false,
    purchaseCount: null,
    ordersHistory: [],
    ordersDiscounted: false,
    ordersHistoryBoundaryDate: null,
    userCodSubscriptions: [],
    orderCycle: null,
    paymentMethod: null,
    discountCode: null,
}

const namespaced: boolean = true

export const checkout: Module<CheckoutState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}
