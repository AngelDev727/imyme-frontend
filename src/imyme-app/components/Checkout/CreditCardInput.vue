<script>
import errorMessageDictionary from '@shared/errorMessageDictionary'

const elementStyles = {
    base: {
        color: '#000',
        fontWeight: 600,
        fontFamily:
            'itc-avant-garde-gothic-pro, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':focus': {
            color: '#000',
        },
        '::placeholder': {
            color: '#9BACC8',
        },
    },
    invalid: {
        color: '#000',
    },
    complete: {
        color: '#000',
    },
}
const elementClasses = {
    focus: 'focus',
    empty: 'empty',
    invalid: 'invalid',
    complete: 'complete',
}
const {VUE_APP_STRIPE_PUB_KEY} = process.env
const stripe = Stripe(
    VUE_APP_STRIPE_PUB_KEY || 'pk_test_nnQsmKZIEix5C4KVn2CyehZL',
)
const elements = stripe.elements({
    fonts: [
        {
            cssSrc: 'https://use.typekit.net/xnj6jee.css',
        },
    ],
})
export default {
    name: 'CreditCardInput',
    data() {
        return {
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null,
            errors: {
                number: null,
                expiry: null,
                cvc: null,
            },
            showHelp: false,
            cardType: 'unknown',
        }
    },
    mounted() {
        this.cardNumber = elements.create('cardNumber', {
            style: elementStyles,
            classes: elementClasses,
            placeholder: 'カード番号',
        })
        this.cardNumber.mount(this.$refs.cardNumber)
        this.cardExpiry = elements.create('cardExpiry', {
            style: elementStyles,
            classes: elementClasses,
            placeholder: '有効期限(月/年)',
        })
        this.cardExpiry.mount(this.$refs.cardExpiry)
        this.cardCvc = elements.create('cardCvc', {
            style: elementStyles,
            classes: elementClasses,
            placeholder: 'セキュリティコード',
        })
        this.cardCvc.mount(this.$refs.cardCvc)
        this.cardNumber.addEventListener('change', ({error, brand}) => {
            if (error) {
                this.errors.number =
                    errorMessageDictionary[error.code] || error.message
            } else {
                this.errors.number = null
            }
            this.cardType = brand
        })
        this.cardExpiry.addEventListener('change', ({error}) => {
            if (error) {
                this.errors.expiry =
                    errorMessageDictionary[error.code] || error.message
            } else {
                this.errors.expiry = null
            }
        })
        this.cardCvc.addEventListener('change', ({error}) => {
            if (error) {
                this.errors.cvc =
                    errorMessageDictionary[error.code] || error.message
            } else {
                this.errors.cvc = null
            }
        })
    },
    beforeDestroy() {
        this.cardNumber.destroy(this.$refs.cardNumber.$destroy)
        this.cardExpiry.destroy(this.$refs.cardExpiry.$destroy)
        this.cardCvc.destroy(this.$refs.cardCvc.$destroy)
    },
    methods: {
        async createStripeToken() {
            const result = await stripe.createToken(
                this.cardNumber,
                this.cardExpiry,
                this.cardCvc,
            )
            return result
        },
        toggleHelp() {
            this.showHelp = !this.showHelp
        },
    },
}
</script>

<template>
    <div>
        <section>
            <div class="stripe-input mt-1">
                <div class="cardCvc-help">
                    <img
                        :class="cardType == 'visa' ? 'display' : ''"
                        class="card-type"
                        src="@app/assets/images/CreditCards/visa_electron.png"
                        alt="visa logo"
                    />
                    <img
                        :class="cardType == 'mastercard' ? 'display' : ''"
                        class="card-type"
                        src="@app/assets/images/CreditCards/mastercard2.png"
                        alt="mastercard logo"
                    />
                    <img
                        :class="cardType == 'amex' ? 'display' : ''"
                        class="card-type"
                        src="@app/assets/images/CreditCards/american_express.png"
                        alt="american express logo"
                    />
                    <img
                        :class="cardType == 'jcb' ? 'display' : ''"
                        class="card-type"
                        src="@app/assets/images/CreditCards/jcb-card.png"
                        alt="jcb logo"
                    />
                </div>
                <div ref="cardNumber" class="field p-1" />
                <div class="input-err-message">- {{ errors.number }}</div>
            </div>
            <div class="stripe-input mt-1">
                <div ref="cardExpiry" class="field p-1" />
                <div class="input-err-message">- {{ errors.expiry }}</div>
            </div>
            <div class="stripe-input cvc-input mt-1">
                <div class="cardCvc-help" @click.stop="toggleHelp">
                    <svg class="icon-stroke cardCvc-help-btn">
                        <use xlink:href="#icon-help" />
                    </svg>
                    <div
                        class="cardCvc-help-message"
                        :class="{display: showHelp}"
                    >
                        カード裏面にある3桁のセキュリティコードです。 American
                        Expressカードは前面にある4桁のコードです。
                    </div>
                </div>
                <div ref="cardCvc" class="field p-1"></div>
                <div class="input-err-message">- {{ errors.cvc }}</div>
            </div>
        </section>
    </div>
</template>
