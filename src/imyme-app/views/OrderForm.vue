<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State} from 'vuex-class'
import Cart from '@app/components/Cart/Cart.vue'
import EmptyCart from '@app/components/Cart/EmptyCart.vue'

@Component({
    components: {
        Cart,
        EmptyCart,
    },
})
export default class OrderForm extends Vue {
    public name: string = 'OrderForm'

    @State(state => state.checkout.rechargeObject) rechargeObject!: any
}
</script>

<template>
    <div v-if="rechargeObject" class="cart max-page-w">
        <section>
            <h3 class="pt-2">ご注文内容</h3>
            <Cart :cart="rechargeObject" class="p-1" :allow-remove="false" />
        </section>
        <router-view></router-view>
    </div>
    <EmptyCart v-else />
</template>
