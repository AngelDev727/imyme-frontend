<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Action} from 'vuex-class'

@Component
export default class MyHistorySummary extends Vue {
    public name: string = 'MyHistorySummary'

    @Prop({type: Object, default: () => {}}) skin: any
    @Prop({type: Object, default: () => {}}) product: any
    @Action('tablet/getRecipe') getRecipe
    @Action('products/getProductByRemoteId') getProductByRemoteId
    @Action('products/getProductInfo') getProductInfo

    ja: object = {
        普通肌: 'normal',
        乾燥肌: 'dry',
        脂性肌: 'oily',
        乾燥性脂性肌: 'dryoily',
        混合肌: 'mixed',
        normal: '普通肌',
        dry: '乾燥肌',
        oily: '脂性肌',
        dryoily: '乾燥性脂性肌',
        mixed: '混合肌',
    }
    productInfo: any = null

    async created() {
        if (this.product.id) {
            const storageItem = sessionStorage.getItem(this.product.id)
            if (!storageItem) {
                this.productInfo = await this.getProductInfo(this.product.id)
            } else {
                this.productInfo = JSON.parse(storageItem)
            }
        }
    }
}
</script>

<template>
    <div
        v-if="skin && productInfo && productInfo.shopify_id"
        class="history-summary"
    >
        <div class="history-icon-container">
            <svg class="icon-stroke history-icon-skin-type">
                <use :xlink:href="'#icon-skin-' + ja[skin.type]" />
            </svg>
            <span class="history-icon-text">{{ skin.type }}</span>
        </div>
        <div>
            <div class="history-stats mb-1">
                <span>敏感度</span>
                <span class="no-score">{{ skin.sensitivity }}</span>
            </div>
            <div class="history-stats mb-1">
                <span>シミ</span>
                <span class="score">{{ skin.spot }}</span>
            </div>
            <div class="history-stats mb-1">
                <span>ニキビ</span>
                <span class="score">{{ skin.acne }}</span>
            </div>
            <div class="history-stats">
                <span>シワ</span>
                <span class="score">{{ skin.wrinkle }}</span>
            </div>
        </div>
        <div class="product-img">
            <img
                :src="productInfo.images.edges[0].node.originalSrc"
                alt="product"
            />
        </div>
    </div>
</template>
