<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {
    OrderHistoryLineItemProperty,
    OrderHistoryFulfillment,
} from '@/shared/store/modules/checkout/types'

interface ProductInfo {
    type: string
    title: string
    image: string
    logo: string
    ordered_at: string
    properties: OrderHistoryLineItemProperty[]
    fulfillment_status: string
    fulfillments: OrderHistoryFulfillment[]
}

@Component
export default class Product extends Vue {
    public name: string = 'Product'

    @Prop({type: Object, default: () => ({}), required: true})
    readonly product!: ProductInfo

    formatDate(date) {
        const picked = date.match(/^\d{4}-\d{2}-\d{2}/)
        return picked ? picked[0].replace(/-/g, '.') : '---'
    }

    get fulfillmentStatus() {
        const unshipped = '配送準備中'

        if (this.product.fulfillment_status !== 'fulfilled') {
            return unshipped
        }
        if (this.product.fulfillments.length > 0) {
            const fulfillment = this.product.fulfillments.find(
                fulfillment => fulfillment.updated_at !== '',
            )
            if (fulfillment !== undefined) {
                return this.formatDate(fulfillment.updated_at) + ' 配送済'
            } else {
                return unshipped
            }
        }
        return unshipped
    }
}
</script>

<template>
    <div>
        <div v-if="product" class="product">
            <div class="product-img py-1">
                <span>
                    <img :src="product.image" alt="product" />
                </span>
            </div>
            <div class="product-content">
                <div class="product-header">
                    <div class="product-title pl-1">
                        <div class="product-id">
                            <p>{{ product.type }}</p>
                            <p>{{ product.title }}</p>
                        </div>
                    </div>
                </div>
                <p class="fulfillment-status">
                    <span>
                        {{ fulfillmentStatus }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-content {
    padding: 1rem;
    display: inline-flex;
    justify-content: center;
}
p.fulfillment-status {
    font-size: 3vw;
    line-height: 4.6vw;
    padding-top: 5vw;
}
.product-id p {
    font-size: 3.8vw;
    line-height: 4.8vw;
    word-break: keep-all;
}
.product-img {
    width: 30%;
}
.product-img img {
    margin: -10% -50%;
}
.product-header {
    padding: 1.6vw 0;
}
</style>
