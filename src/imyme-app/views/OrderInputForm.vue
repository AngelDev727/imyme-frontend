<script lang="ts">
import {Vue, Component, Ref} from 'vue-property-decorator'
import {State, Action, Mutation, Getter} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import {OrderHistoryInfo} from '@/shared/store/modules/checkout/types'
import Cart from '@app/components/Cart/Cart.vue'
import RegisteredAddresses from '@app/components/AddressInput/RegisteredAddresses.vue'
import ShippingAddressForm from '@app/components/AddressInput/ShippingAddressForm.vue'
import SelectOrderCycle from '@app/components/Checkout/SelectOrderCycle.vue'
import CreditCardInput from '@app/components/Checkout/CreditCardInput.vue'
import {getCodFee, getLimitedProductInfo} from '@/imyme-app/utils'
import CartTotalPrice from '@app/components/Cart/CartTotalPrice.vue'
import DiscountCode from '@app/components/Cart/DiscountCode.vue'

@Component({
    components: {
        Cart,
        RegisteredAddresses,
        ShippingAddressForm,
        SelectOrderCycle,
        CreditCardInput,
        CartTotalPrice,
        DiscountCode,
    },
})
export default class OrderInputForm extends Vue {
    public name: string = 'OrderInputForm'

    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.ordersHistory)
    ordersHistory!: OrderHistoryInfo[]
    @Action('application/loadingPromiseAdd') loadingPromiseAdd
    @Mutation('checkout/SET_STRIPE_TOKEN') setStripeToken
    @Mutation('checkout/SET_ORDER_CYCLE') setOrderCycle
    @Mutation('checkout/SET_PAYMENT_METHOD') setPaymentMethod
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage
    @Getter('checkout/getRechargeObjectTotal') getRechargeObjectTotal
    @Getter('checkout/getPaymentMethod') getPaymentMethod
    @Getter('checkout/isAppliedDiscount') isAppliedDiscount
    @Ref() readonly shippingAddressForm!: ShippingAddressForm | any
    @Ref() readonly creditCardInput!: CreditCardInput | any

    processing: boolean = false
    selectedPaymentMethod: string = ''
    paymentMethodList = [
        {
            id: 'creditcard',
        },
        {
            id: 'cod',
        },
    ]
    stripeToken: string = ''
    selectedOrderCycle: string = ''
    selectedShippingAddress: any = null

    created() {
        this.selectedPaymentMethod = this.getPaymentMethod || 'creditcard'
    }

    get selectedCreditCard() {
        return this.selectedPaymentMethod === 'creditcard'
    }

    get containsSubscriptionProduct() {
        if (this.isTrial) {
            return 0
        }
        return this.rechargeObject.line_items.filter(
            ({id}) => !getLimitedProductInfo(id),
        ).length
    }

    get existsAddress() {
        return this.user && this.user.defaultAddress
    }

    get isTrial() {
        return (
            'isTrial' in this.$route.params &&
            this.$route.params.isTrial &&
            this.ordersHistory.length === 0
        )
    }

    async setUserInput() {
        if (!this.existsAddress) {
            const nicknameError = this.shippingAddressForm.nicknameError
            if (nicknameError.nickname) {
                this.setErrorMessage({
                    message: nicknameError.nicknameMessage,
                })
                return
            }
        }

        if (this.selectedCreditCard) {
            const res = await this.creditCardInput[0].createStripeToken()
            if (res.error) {
                this.setErrorMessage({
                    message: res.error.code,
                })
                return
            } else {
                this.setStripeToken(res.token)
            }
        }

        if (!this.existsAddress || !this.selectedShippingAddress) {
            try {
                await this.shippingAddressForm.saveAddress()
            } catch (error) {
                this.setErrorMessage({
                    message: error,
                })
                return
            }
        }

        if (this.containsSubscriptionProduct) {
            this.setOrderCycle(this.selectedOrderCycle)
        } else {
            this.setOrderCycle(null)
        }

        this.setPaymentMethod(this.selectedPaymentMethod)

        this.goToCheckout()
    }

    async submitUserInput() {
        this.startProcessing()
        this.loadingPromiseAdd([await this.setUserInput()])
        this.endProcessing()
    }

    goToCheckout() {
        this.$router.push({name: 'checkout'})
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

    startProcessing() {
        this.processing = true
    }

    endProcessing() {
        this.processing = false
    }

    isProcessing() {
        return this.processing
    }
}
</script>

<template>
    <!-- eslint-disable-next-line -->
    <div v-if="rechargeObject" class="cart max-page-w">
        <section class="cart-items">
            <h3 class="pt-2">
                ご注文内容
            </h3>
            <Cart :cart="rechargeObject" class="p-1" :allow-remove="false" />
        </section>
        <section v-if="isAppliedDiscount" class="p-1 discount-code">
            <DiscountCode :operable="false" />
        </section>
        <section class="p-1 total-price">
            <CartTotalPrice :cart="rechargeObject" />
        </section>
        <form @submit.prevent="submitUserInput">
            <span v-if="existsAddress">
                <RegisteredAddresses v-model="selectedShippingAddress" />
                <ShippingAddressForm
                    v-if="!selectedShippingAddress"
                    ref="shippingAddressForm"
                />
            </span>
            <ShippingAddressForm v-else ref="shippingAddressForm" />
            <SelectOrderCycle
                v-if="containsSubscriptionProduct"
                v-model="selectedOrderCycle"
            />
            <section class="p-1">
                <h3 class="py-1">支払い方法の選択</h3>
                <div
                    v-for="paymentMethod in paymentMethodList"
                    :key="paymentMethod.label"
                >
                    <div class="subscription--item m-1">
                        <label class="container">
                            {{ getLabel(paymentMethod.id) }}
                            <input
                                v-model="selectedPaymentMethod"
                                type="radio"
                                name="paymentMethod.label"
                                :value="paymentMethod.id"
                                required
                            />
                            <span class="checkmark" />
                        </label>
                    </div>
                    <CreditCardInput
                        v-if="
                            selectedCreditCard &&
                                paymentMethod.id === 'creditcard'
                        "
                        ref="creditCardInput"
                    />
                </div>
                <div class="m-1">
                    ※商品代引きでは10日前メールの配信がありません。ご了承ください。
                </div>
            </section>
            <h3>約7日から10日でお届けします。</h3>
            <button
                class="btn btn-secondary w-center-70"
                data-testid="review-order"
                :disabled="isProcessing()"
                type="submit"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-forward" />
                </svg>
                <span class="mx-auto">確認画面へ進む</span>
            </button>
        </form>
    </div>
</template>

<style scoped>
.cart-items {
    margin: 2rem 1.5rem 1rem;
}
.discount-code {
    margin: 0 1.5rem 1rem;
}
.total-price {
    margin: 0 1.5rem 3rem;
}
</style>
