<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import {State, Action, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import {CodProduct} from '@/shared/store/modules/checkout/types'
import CreditCardInput from '@app/components/Subscription/CreditCardInput.vue'

@Component({
    components: {
        CreditCardInput,
    },
})
export default class EditPaymentMethod extends Vue {
    public name: string = 'EditPaymentMethod'

    @State(state => state.user.user) user!: User
    @State(state => state.checkout.userSubscriptions) userSubscriptions!: any[]
    @State(state => state.checkout.userCodSubscriptions)
    userCodSubscriptions!: CodProduct[]
    @Action('checkout/updatePaymentMethod') updatePaymentMethod
    @Action('checkout/getUserSubscriptionsRecharge')
    getUserSubscriptionsRecharge
    @Action('checkout/getSubscriptionsCod') getSubscriptionsCod
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage

    processing: boolean = false
    chosenPaymentMethod: string = ''
    setPaymentMethod: string = ''
    noChangePaymentMethod: boolean = true
    paymentMethodList = [
        {
            id: 'creditcard',
        },
        {
            id: 'cod',
        },
    ]
    stripeToken: string = ''

    get subscriptionsByCreditCard() {
        if (this.userSubscriptions) {
            return this.userSubscriptions.filter(subscription => {
                if (subscription.status === 'ACTIVE') {
                    return subscription
                }
            })
        } else {
            return []
        }
    }

    get isChargeErrorSubscriptionsByCreditCard() {
        return Boolean(
            this.subscriptionsByCreditCard.filter(
                subscription => !subscription.next_charge_scheduled_at,
            ).length,
        )
    }

    get isExpiredSubscriptionsByCreditCard() {
        return Boolean(
            this.subscriptionsByCreditCard.filter(
                subscription => subscription.is_expired,
            ).length,
        )
    }

    get isExpiredSubscriptionsByCod() {
        return Boolean(
            this.userCodSubscriptions.filter(
                codSubscription => codSubscription.IsExpired,
            ).length,
        )
    }

    get paymentMethod() {
        if (
            this.subscriptionsByCreditCard &&
            this.subscriptionsByCreditCard.length > 0
        ) {
            this.setPaymentMethod = this.chosenPaymentMethod = 'creditcard'
            return 'クレジットカード'
        } else if (
            this.userCodSubscriptions &&
            this.userCodSubscriptions.length > 0
        ) {
            this.setPaymentMethod = this.chosenPaymentMethod = 'cod'
            return '商品代引き'
        } else {
            return '---'
        }
    }

    get chosenCreditCard() {
        return this.chosenPaymentMethod === 'creditcard'
    }

    getLabel(id) {
        if (id === 'cod') {
            return '商品代引き（代引き手数料が別途かかります）'
        } else {
            return 'クレジットカード決済'
        }
    }

    async savePaymentMethod() {
        this.startProcessing()

        let customerId: number = 0
        const userId = this.user ? this.user.id : undefined
        if (userId !== undefined) {
            customerId = parseInt(
                window
                    .atob(userId)
                    .split('/')
                    .reverse()[0],
            )
        }

        if (this.chosenCreditCard) {
            const cardInputComponent: any = this.$refs.cardInput
            const res = await cardInputComponent
                .createStripeToken()
                .catch(() => {
                    this.endProcessing()
                    return
                })
            if (res.error) {
                this.setErrorMessage({
                    message: res.error.code,
                })
                this.endProcessing()
                return
            } else {
                this.stripeToken = res.token.id
            }
        }
        const paymentMethodObject = {
            customerId: customerId,
            paymentMethod: this.chosenPaymentMethod,
            stripeToken: this.stripeToken,
        }
        await this.updatePaymentMethod(paymentMethodObject).catch(() => {
            this.endProcessing()
            return
        })

        await this.getUserSubscriptionsRecharge(userId)
        await this.getSubscriptionsCod(userId)
        this.$router.push({name: 'mypage'})
        this.endProcessing()
    }

    startProcessing() {
        this.processing = true
    }

    endProcessing() {
        this.processing = false
    }

    @Watch('chosenPaymentMethod')
    async paymentMethodChanged() {
        if (this.setPaymentMethod !== this.chosenPaymentMethod) {
            this.noChangePaymentMethod = false
        } else {
            this.noChangePaymentMethod = true
        }
    }
}
</script>

<template>
    <div
        v-if="
            (userCodSubscriptions && userCodSubscriptions.length > 0) ||
                (subscriptionsByCreditCard &&
                subscriptionsByCreditCard.length > 0)
        "
    >
        <div class="cart max-page-w">
            <section class="p-1">
                <h3 class="py-1">定期購入の支払い方法</h3>
                <div class="py-1 text-center">
                    現在
                    <span class="required-heading">{{ paymentMethod }}</span>
                    になっております
                </div>
                <template v-if="isChargeErrorSubscriptionsByCreditCard">
                    <p class="warning">
                        定期購入分の支払いに不備があり、現在支払い方法の変更ができません。<br />
                        お手数ですが、imymeカスタマーサポートまでご連絡ください。
                    </p>
                    <span class="contact">
                        <a
                            href="https://lin.ee/9jwOJdN"
                            class="btn btn-line w-center-40"
                        >
                            <img
                                alt="LINE"
                                src="@app/assets/images/contact/line_icon.png"
                                width="20"
                                height="20"
                            />
                            <span class="m-auto">LINEで変更する</span>
                        </a>
                        <a
                            href="tel:0120212008"
                            class="btn btn-blue w-center-40"
                        >
                            <img
                                alt="電話"
                                src="@app/assets/images/contact/tel_icon.png"
                                width="20"
                                height="20"
                            />
                            <span class="m-auto">電話で変更する</span>
                        </a>
                    </span>
                </template>
                <template
                    v-else-if="
                        isExpiredSubscriptionsByCreditCard ||
                            isExpiredSubscriptionsByCod
                    "
                >
                    <p class="warning">
                        支払い方法の変更ができるのは、次回注文日の前日までとなります。<br />
                        お手数ですが、次回注文日が更新されるまで今しばらくお待ちください。
                    </p>
                </template>
                <template v-else>
                    <div class="py-1">
                        <div
                            v-for="paymentMethod in paymentMethodList"
                            :key="paymentMethod.id"
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
                    </div>
                </template>
            </section>
            <template
                v-if="
                    isChargeErrorSubscriptionsByCreditCard ||
                        isExpiredSubscriptionsByCreditCard ||
                        isExpiredSubscriptionsByCod
                "
            >
                <div class="mt-5 mb-3">
                    <router-link
                        tag="button"
                        class="btn w-center-70"
                        :to="{name: 'mypage'}"
                    >
                        <svg class="icon-stroke icon-btn">
                            <use xlink:href="#icon-back" />
                        </svg>
                        <span class="m-auto">戻る</span>
                    </router-link>
                </div>
            </template>
            <template v-else>
                <credit-card-input
                    v-if="chosenCreditCard && !noChangePaymentMethod"
                    ref="cardInput"
                />
                <button
                    v-if="noChangePaymentMethod"
                    class="btn btn-secondary w-center-70 mb-3"
                    disabled
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-forward" />
                    </svg>
                    <span class="mx-auto">保存</span>
                </button>
                <button
                    v-else
                    class="btn btn-secondary w-center-70 mb-3"
                    :disabled="processing"
                    @click="savePaymentMethod"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-forward" />
                    </svg>
                    <span v-if="processing" class="m-auto">
                        保存中
                    </span>
                    <span v-else class="mx-auto">保存</span>
                </button>
            </template>
        </div>
    </div>
</template>

<style scoped>
p.warning {
    text-align: center;
    padding-bottom: 1em;
    font-size: 11px;
}
span.contact {
    display: flex;
    font-size: 0.5em;
}
a.btn-line {
    background-color: #02c755;
}
</style>
