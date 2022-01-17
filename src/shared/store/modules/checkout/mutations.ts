import {MutationTree} from 'vuex'
import {CheckoutState, DiscountCode} from './types'

export const mutations: MutationTree<CheckoutState> = {
    RESET(state) {
        state.checkout = null
        state.subscriptionChecked = false
        state.userSubscriptions = []
        state.message = null
        state.mockDiscount = null
        state.shippingAddress = null
        state.rechargeDiscount = null
        state.stripePaymentToken = null
        state.rechargeObject = {line_items: []}
        state.promotion = false
        state.purchaseCount = null
        state.ordersHistory = []
        state.ordersDiscounted = false
        state.ordersHistoryBoundaryDate = null
        state.userCodSubscriptions = []
        state.orderCycle = null
        state.paymentMethod = null
        state.discountCode = null
    },
    RESET_PROCESS_CHECKOUT(state) {
        state.stripePaymentToken = null
        state.rechargeObject = {line_items: []}
        state.checkout = null
        state.promotion = false
        state.orderCycle = null
        state.paymentMethod = null
        state.discountCode = null
    },
    SET_CHECKOUT(state, data) {
        state.checkout = data.checkout
    },
    SET_SUBSCRIPTIONS(state, data) {
        state.userSubscriptions = data
    },
    SET_STRIPE_TOKEN(state, data) {
        state.stripePaymentToken = data
    },
    SET_RECHARGE_OBJECT(state, data) {
        state.rechargeObject = data
    },
    SET_PROMOTION(state, data) {
        state.promotion = data
    },
    SET_PURCHASE_COUNT(state, data) {
        state.purchaseCount = data
    },
    SET_ORDERS_HISTORY(state, data) {
        state.ordersHistory = data
    },
    SET_ORDERS_DISCOUNTED(state, data) {
        state.ordersDiscounted = data
    },
    SET_ORDERS_HISTORY_BOUNDARY_DATE(state, data) {
        state.ordersHistoryBoundaryDate = data
    },
    SET_COD_SUBSCRIPTIONS(state, data) {
        state.userCodSubscriptions = data
    },
    SET_ORDER_CYCLE(state, data) {
        state.orderCycle = data
    },
    SET_PAYMENT_METHOD(state, data) {
        state.paymentMethod = data
    },
    SET_DISCOUNT_CODE(state, data: DiscountCode) {
        if ((data && data.code) || data === null) {
            state.discountCode = data
        }
    },
}
