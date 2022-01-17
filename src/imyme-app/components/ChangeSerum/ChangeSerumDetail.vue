<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Action} from 'vuex-class'
import {formatPrice} from '@/imyme-app/utils'
import Morning from '@shared/components/AnimatedIcons/Skincare/Morning.vue'
import Night from '@shared/components/AnimatedIcons/Skincare/Night.vue'
import MorningAndNight from '@shared/components/AnimatedIcons/Skincare/MorningAndNight.vue'
import EyesAndMouth from '@shared/components/AnimatedIcons/Skincare/EyesAndMouth.vue'
import TZone from '@shared/components/AnimatedIcons/Skincare/TZone.vue'
import UZone from '@shared/components/AnimatedIcons/Skincare/UZone.vue'
import Aging from '@shared/components/AnimatedIcons/Skincare/Aging.vue'
@Component({
    components: {
        Morning,
        Night,
        morning_and_night: MorningAndNight,
        eyes_and_mouth: EyesAndMouth,
        T: TZone,
        U: UZone,
        A: Aging,
    },
})
export default class ChangeSerumDetail extends Vue {
    @Prop({type: Array, required: true}) readonly productList!: any
    @Prop({type: Boolean, required: true}) readonly isBeforeItem!: boolean
    @Action('products/getProductInfo') getProductInfo

    productInfo: any = {}
    products: any = []

    get productImage() {
        return function (productInfo) {
            if (productInfo) {
                if (productInfo.images) {
                    return productInfo.images.edges[0].node.originalSrc
                } else if (productInfo.image) {
                    return productInfo.image
                }
            }
            return ''
        }
    }

    get isSerumTwoBottles() {
        if (this.isBeforeItem) {
            return this.productList.length === 1
        }
        return false
    }

    created() {
        this.getInfo(this.productList)
    }

    formatPrice(price) {
        return formatPrice(price)
    }

    async getInfo(productList) {
        if (productList) {
            this.products = []
            productList.forEach(async item => {
                const storageItem = sessionStorage.getItem(item.id)
                if (!storageItem) {
                    this.productInfo = await this.getProductInfo(item.id)
                } else {
                    this.productInfo = JSON.parse(storageItem)
                }
                this.productInfo.serum_type = item.serum_type

                const productInfoCopy = JSON.parse(
                    JSON.stringify(this.productInfo),
                )
                this.products.push(productInfoCopy)
            })
            this.products = this.products.filter((item, index, array) => {
                return array.findIndex(item2 => item.id === item2.id) === index
            })
        }
    }
}
</script>

<template>
    <div class="changeserum-wrapper">        
        <div class="products ml-1 mr-1">
            <div v-for="(productInfo, index) in products" :key="index" class="results-product-layout-container">
                <div v-if="productInfo.type === 'serum'" class="results-product text-center ml-1 mr-1 mb-1">
                    <div v-if="productInfo.serum_type" class="product-skincare-icon bg-white p-1">
                        <Component :is="productInfo.serum_type" />
                    </div>
                    <div class="inner">
                        <div class="inner-img">
                            <template v-if="products.length > 1 || isSerumTwoBottles">
                                <img
                                    v-lazy="productImage(productInfo)"
                                    alt="product"
                                    class="results-product-image"
                                />
                            </template>
                            <template v-else-if="products.length === 1">
                                <img
                                    v-lazy="productImage(productInfo)"
                                    alt="product"
                                    class="results-product-image flex-img"
                                />
                                <img
                                    v-lazy="productImage(productInfo)"
                                    alt="product"
                                    class="results-product-image flex-img"
                                />
                            </template>
                        </div>
                        <div>
                            <div class="product-serum-text">
                                {{ productInfo.type }} {{ productInfo.title }}
                            </div>
                        </div>
                    </div>
                </div>  
                <div v-else class="text-center ml-1 mr-1 mb-1">
                    <div class="results-product text-center mb-1">
                        <div class="inset">
                            <img
                                v-lazy="productImage(productInfo)"
                                alt="product"
                                class="results-product-image"
                            />
                        </div>
                    </div>
                    <div class="results-productall w-90 m-auto">
                        <div v-if="productInfo.logo">
                            <img
                                v-lazy="productInfo.logo"
                                alt="product"
                                class="results-product-logo"
                            />
                        </div>
                        <div>
                            <div class="product-serum-text">
                                <span class="text-capitalize">
                                    {{ productInfo.type }}
                                </span>
                                {{ productInfo.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.changeserum-wrapper {
    background-color: #ffffff;
}
.results-productall {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
}
.results-product-text {
    line-height: 4.8vw;
    font-size: 5vw;
    padding-top: 2.1vw;
}
.products {
    display: flex;
    text-align: center;
}
.product-skincare-icon > svg {
    max-width: 24vw;
    max-height: 16vw;
}
.product-serum-text {
    font-size: 1.8rem;
}
.inner-img .results-product-image {
    height: 57vh;
    max-height: 57vh;
    margin-top: -7.5vh;
}
.inner-img {
    display: flex;
    justify-content: space-evenly;
    height: 42vh;
    overflow: hidden;
}
.inner-img .flex-img {
    width: 50%;
    object-fit: cover;
}
</style>
