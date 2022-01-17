import {GetterTree} from 'vuex'
import {CheckoutState} from './types'
import {RootState} from '../../types'

export const getters: GetterTree<CheckoutState, RootState> = {
    getRechargeObjectTotal(state) {
        return state.rechargeObject.line_items.reduce((acc, item) => {
            return item.properties.promotion === 'true'
                ? acc + Number(item.discountPrice)
                : acc + Number(item.price)
        }, 0)
    },
    getRechargeObjectTypes(state) {
        return state.rechargeObject.line_items.map(item => {
            return item.type
        })
    },
    getPromotionIsInCart(state) {
        return (
            state.rechargeObject.line_items.filter(item => {
                return item.properties.promotion == 'true'
            }).length > 0
        )
    },
    isOneTimePromotion(state) {
        return state.promotion
    },
    hasPurchased(state) {
        return state.purchaseCount !== null
            ? state.purchaseCount.count > 0
            : false
    },
    hasDiscounted(state) {
        return state.ordersDiscounted
    },
    getOrderCycle(state) {
        return state.orderCycle
    },
    getPaymentMethod(state) {
        return state.paymentMethod
    },
    getDiscountCode(state) {
        return state.discountCode
    },
    getCheckout(state) {
        return state.checkout
    },
    isAppliedDiscount(state) {
        return (
            state.checkout &&
            state.checkout.applied_discount &&
            state.checkout.applied_discount.applicable
        )
    },
    getCountInCart(state) {
        if (!state.rechargeObject || !state.rechargeObject.line_items) {
            return 0
        }
        const skinCodes: string[] = []
        return state.rechargeObject.line_items.filter(item => {
            let isNotDup = item.type !== 'serum' || !item.skinCode
            if (!isNotDup) {
                if (!~skinCodes.indexOf(item.skinCode)) {
                    skinCodes.push(item.skinCode)
                    isNotDup = !isNotDup
                }
            }
            return isNotDup
        }).length
    },
}
