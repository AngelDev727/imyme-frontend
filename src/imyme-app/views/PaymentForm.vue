<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State, Getter} from 'vuex-class'
// import {Checkout} from '@/shared/store/modules/checkout/types'
// import PaymentOptionsForm from '@app/components/Checkout/PaymentOptionsForm'
import Cart from '@app/components/Cart/Cart.vue'
import CreditCardInput from '@app/components/Checkout/CreditCardInput.vue'
import {CheckoutState} from '@/shared/store/modules/checkout/types'
import {getCodFee} from '@/imyme-app/utils'

@Component({
    components: {
        Cart,
        CreditCardInput,
    },
})
export default class PaymentForm extends Vue {
    public name: string = 'PaymentForm'

    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @State('checkout') checkoutState!: CheckoutState
    @Getter('checkout/getRechargeObjectTotal') getRechargeObjectTotal

    paymentOptions: any = null
    chosenPaymentMethod = 'creditcard'
    paymentMethodList = [
        {
            id: 'creditcard',
        },
        {
            id: 'cod',
        },
    ]

    updatePayment(payment) {
        this.paymentOptions = payment
    }
    reviewOrder() {
        this.$router.push('/checkout')
    }
    goConfirm() {
        this.$router.push({
            name: 'checkout',
            params: {payment: 'cod'},
        })
    }
    getLabel(id) {
        if (id === 'cod') {
            const codFee = getCodFee(this.getRechargeObjectTotal, false)
            return (
                '商品代引き（' + codFee + '円（税別）の手数料が別途かかります）'
            )
        } else {
            return 'クレジットカード決済'
        }
    }

    get chosenCreditCard() {
        return this.chosenPaymentMethod === 'creditcard'
    }
}
</script>

<template>
    <div v-if="rechargeObject" class="cart max-page-w">
        <section>
            <h3 class="pt-2">
                ご注文内容
            </h3>
            <Cart :cart="rechargeObject" class="p-1" :allow-remove="false" />
        </section>
        <section class="p-1">
            <h3 class="py-1">支払い方法を選択してください</h3>
            <div
                v-for="paymentMethod in paymentMethodList"
                :key="paymentMethod.label"
            >
                <div class="subscription--item m-1">
                    <label class="container">
                        {{ getLabel(paymentMethod.id) }}
                        <input
                            v-model="chosenPaymentMethod"
                            type="radio"
                            name="paymentMethod.label"
                            :value="paymentMethod.id"
                            required
                        />
                        <span class="checkmark" />
                    </label>
                </div>
            </div>
            <div class="m-1">
                ※商品代引きでは10日前メールの配信がありません。ご了承ください。
            </div>
        </section>
        <CreditCardInput v-if="chosenCreditCard" />
        <div v-else>
            <button
                data-testid="review-order"
                class="btn btn-secondary w-center-70 mb-3"
                @click="goConfirm"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-forward" />
                </svg>
                <span class="mx-auto">確認画面へ進む</span>
            </button>
        </div>
    </div>
</template>
