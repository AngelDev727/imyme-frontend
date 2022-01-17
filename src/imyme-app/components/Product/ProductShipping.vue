<template>
    <div class="product-shipping mx-2">
        <div class="date-layout pb-4">
            <div class="pb-1">
                製造日
            </div>
            <div class="date text-center pt-1">
                {{ productionDate }}
            </div>
        </div>
        <div class="date-layout pb-1">
            <div class="pb-1">
                配送予定日
            </div>
            <div class="date text-center pt-1">
                {{ expectedDelivery.delivery_1 }}
            </div>
            <div class="date text-center">
                {{ expectedDelivery.delivery_2 }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import dayjs from 'dayjs'

@Component
export default class ProductShipping extends Vue {
    public name: string = 'ProductShipping'

    @Prop({type: Object, default: () => ({}), required: true}) product: any

    get availableProduct() {
        if (this.product) {
            return this.product.variants.edges.find(({node}) => {
                return node.availableForSale
            })
        }
        return dayjs()
    }
    get productionDate() {
        if (this.availableProduct) {
            if (dayjs(this.availableProduct.node.title).isValid()) {
                return dayjs(this.availableProduct.node.title).format(
                    'YYYY.MM.DD',
                )
            }
        }
        return dayjs().format('YYYY.MM.DD')
    }
    get expectedDelivery() {
        if (dayjs(this.availableProduct.node.title).isValid()) {
            if (dayjs(this.availableProduct.node.title).isBefore(dayjs())) {
                return this.generateDeliveryDateRange(dayjs())
            }
            return this.generateDeliveryDateRange(
                dayjs(this.availableProduct.node.title),
            )
        }
        return this.generateDeliveryDateRange(dayjs())
    }

    generateDeliveryDateRange(startDate) {
        return {
            delivery_1: dayjs(startDate)
                .add(7, 'day')
                .format('YYYY.MM.DD'),
            delivery_2: dayjs(startDate)
                .add(14, 'day')
                .format('YYYY.MM.DD'),
        }
    }
}
</script>
