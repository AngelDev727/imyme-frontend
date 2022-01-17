<template>
    <div>
        <div v-if="productData" class="product max-page-w">
            <label
                :for="productData.type"
                class="product-content"
                @click="emitSelectedItem"
            >
                <div class="product-header product-promotion-header">
                    <div class="container">
                        <input
                            :id="productData.type"
                            v-model="checked"
                            type="radio"
                            :value="productData.type"
                            name="promotion"
                            class="radio"
                            :disabled="!inStock"
                        />
                        <label
                            class="checkmark"
                            :for="productData.type"
                        ></label>
                    </div>
                    <div class="product-title pl-1">
                        <div v-if="!inStock">
                            只今在庫切れのため、選択できません
                        </div>
                        <div class="product-id ls-1">
                            {{ discountTitle }}
                        </div>
                        <div class="product-id">
                            {{ productData.type }} {{ productData.title }}
                        </div>
                        <div class="product-discount-price">
                            <div class="product-price product-price-discounted">
                                <span>¥{{ formatPrice(productData.price) }}</span>
                            </div>
                            <div class="product-price">
                                ¥{{ formatPrice(productData.discountPrice) }}
                            </div>
                        </div>
                    </div>
                </div>
            </label>
            <div class="product-img w-30 py-2">
                <img :src="productData.image" alt="product" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {formatPrice, getProductData, getDiscountedInfo} from '@/imyme-app/utils'
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {Getter, Action} from 'vuex-class'

@Component
export default class ProductionPromotion extends Vue {
    public name: string = 'Product'

    @Prop({type: Object, default: () => ({})}) product: any
    @Action('products/getProductPrice') getProductPrice
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes

    discountTitle: string | null = null
    productData: any = null
    checked: boolean | string = false
    inStock: boolean = false

    created() {
        this.setProductPromotion()
    }

    @Watch('getRechargeObjectTypes')
    onGetRechargeObjectTypesChanged(val) {
        this.setProductPromotion()
    }

    async setProductPromotion() {
        const productData = getProductData(this.product.id)
        const {priceRange} = await this.getProductPrice(productData.shopifyId)
        productData.price = priceRange.minVariantPrice.amount
        if (productData.price) {
            const {discountPrice, discountTitle} = getDiscountedInfo(
                productData.type,
                productData.price,
                this.getRechargeObjectTypes,
            )
            productData.discountPrice = discountPrice
            this.discountTitle = discountTitle
        }
        this.productData = productData
        if (productData.id) {
            this.inStock = true
        }
        if (productData.id && productData.type === 'serum') {
            this.checked = 'serum'
            this.emitSelectedItem()
        }
    }

    formatPrice(price) {
        return formatPrice(price)
    }
    emitSelectedItem() {
        this.$emit('emitSelectedItem', {...this.productData})
    }
}
</script>
<style scoped>
    .product-content{
        padding: 1rem;
    }
    .product-id{
        font-size: 3.8vw;
    }
    .product-price-discounted,.product-price{
        font-size: 3.8vw;
    }
    .product-discount-price{
        display: flex;
    }
    .product-price-discounted{
        padding-right: 2.1vw;
    }
    .product-price-discounted span{
        color: #000000;
    }
    .product-promotion-header{
        align-items: baseline;
    }
</style>
