<script>
import CreditCardInput from '@app/components/Checkout/CreditCardInput'

export default {
    name: 'PaymentOptionsForm',
    components: {
        CreditCardInput,
    },
    data() {
        return {
            paymentMethod: 'creditCard',
            memo: '',
        }
    },
    methods: {
        catchCardErrors(error) {
            this.$emit('card-error', error)
        },
    },
}
</script>

<template>
    <transition name="grow" mode="out-in">
        <CreditCardInput
            v-show="paymentMethod === 'creditCard'"
            @card-error="catchCardErrors"
        />
    </transition>
</template>
