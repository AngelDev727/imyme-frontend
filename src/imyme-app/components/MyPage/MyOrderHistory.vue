<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {OrderHistoryInfo} from '@/shared/store/modules/checkout/types'

@Component
export default class MyOrderHistory extends Vue {
    public name: string = 'MyOrderHistory'

    @State(state => state.checkout.ordersHistory) ordersHistory!: OrderHistoryInfo[]

    get validOrdersHistory() {
        if (this.ordersHistory) {
            return this.ordersHistory.filter(order => order.cancelled_at === '')
                .map(order => order.line_items)
        } else {
            return []
        }
    }
}
</script>

<template>
    <div v-if="validOrdersHistory && validOrdersHistory.length > 0">
        <router-link
            tag="button"
            class="btn btn-secondary w-center-70"
            :to="{name: 'order-history'}"
        >
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-next" />
            </svg>
            <span class="m-auto">注文履歴</span>
        </router-link>
    </div>
</template>
