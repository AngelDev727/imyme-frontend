<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Getter} from 'vuex-class'

@Component
export default class SelectOrderCycle extends Vue {
    public name: string = 'SelectOrderCycle'

    @Getter('checkout/getOrderCycle') getOrderCycle

    orderCycle: string = ''
    optionOrderCycle = [
        {value: '30', name: '30日'},
        {value: '40', name: '40日'},
        {value: '50', name: '50日'},
    ]

    created() {
        this.orderCycle = this.getOrderCycle || '30'
        this.$emit("input", this.orderCycle);
    }

    updateOrderCycle(e) {
        this.$emit("input", e.target.value);
    }
}
</script>

<template>
    <div>
        <section class="p-1">
            <h3 class="py-1">お届けサイクルの選択</h3>
            <section class="m-0">
                <select
                    @change="updateOrderCycle"
                    v-model="orderCycle"
                    class="order-cycle"
                >
                    <option
                        v-for="option in optionOrderCycle"
                        :key="option.name"
                        :value="option.value"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </section>
            <div class="m-1">
                製品毎のお届けサイクルはマイページから変更が可能です。
            </div>
        </section>
    </div>
</template>

<style scoped>
select.order-cycle {
    width: 100%;
    outline: none;
    height: 30px;
    padding-left: 3px;
    border: #ccc solid 2px;
    border-radius: 3px;
}
</style>
