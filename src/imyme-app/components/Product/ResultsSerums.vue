<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {State, Getter, Action} from 'vuex-class'
import {Results} from '@/shared/store/modules/survey/types'
import {SurveyState} from '@/shared/store/modules/survey/types'
import {OrderHistoryInfo} from '@/shared/store/modules/checkout/types'
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
export default class ResultsSerums extends Vue {
    public name: string = 'ResultsSerums'

    @Prop({type: Array, required: true}) product!: any
    @State('survey') surveyState!: SurveyState
    @State(state => state.checkout.ordersHistory)
    ordersHistory!: OrderHistoryInfo[]
    @Getter('survey/nickName') userName
    @Action('products/getProductInfo') getProductInfo
    @State(state => state.survey.results) results!: Results | null

    productInfo: any = {}
    products: any = []
    links: object = [
        {
            text: '肌分析結果',
            href: '#my-stats',
        },
        {
            text: 'スキンケア',
            href: '#my_serum_area',
        },
        {
            text: '洗顔',
            href: '#my_soap_area',
        },
    ]

    get productImage() {
        return function(productInfo) {
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
    get skinmapDiscription() {
        return this.surveyState.results
            ? this.surveyState.results.skinMapping.description[0]
            : null
    }

    get isTrial() {
        return (
            'isTrial' in this.$route.params &&
            this.$route.params.isTrial &&
            this.ordersHistory.length === 0
        )
    }

    @Watch('product')
    async onResultsChange() {
        this.getInfo(this.product)
    }

    async created() {
        this.getInfo(this.product)
    }

    async getInfo(product) {
        if (product) {
            this.products = []
            product.forEach(async item => {
                const storageItem = sessionStorage.getItem(item.id)
                if (!storageItem) {
                    this.productInfo = await this.getProductInfo(item.id)
                } else {
                    this.productInfo = JSON.parse(storageItem)
                }
                this.productInfo.serumType = item.type
                const productInfoCopy = JSON.parse(
                    JSON.stringify(this.productInfo),
                )
                const isExistSerum = this.products.filter(
                    item2 => item.id === item2.id,
                ).length
                if (isExistSerum === 0) {
                    if (this.isTrial && this.products.length === 1) {
                        const serumType = this.products[0].serumType
                        if (
                            serumType === 'night' ||
                            serumType === 'U' ||
                            serumType === 'morning_and_night'
                        ) {
                            return
                        }
                        this.products = []
                    }
                    this.products.push(productInfoCopy)
                }
            })
        }
    }

    sendHash(hash) {
        this.$router.push({
            name: 'results',
            hash: hash,
            params: this.$route.params,
        })
    }
}
</script>

<template>
    <div class="results-serum-container">
        <div class="complete">Complete!</div>
        <h3 class="p-1 text-subheading ls-2 lh-1">
            {{ userName }}にぴったりのセラム
        </h3>
        <div class="results-serum-content w-90">
            <div class="results-serum-description">
                {{ skinmapDiscription.upper }}<br />
                {{ skinmapDiscription.lower }}<br />
            </div>

            <div :class="[isTrial ? 'trial-mode' : 'result-serums']">
                <div
                    v-for="(productInfo, index) in products"
                    :key="index"
                    class="results-product-layout-container"
                >
                    <div class="results-product text-center ml-1 mr-1 mb-1">
                        <div class="results-product-skincare-icon bg-white p-1">
                            <Component
                                :is="
                                    isTrial
                                        ? 'morning_and_night'
                                        : productInfo.serumType
                                "
                            />
                        </div>
                        <div class="inner">
                            <div class="inner-img">
                                <template v-if="products.length > 1 || isTrial">
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
                                <div class="results-serum-text">
                                    {{ productInfo.type }}
                                    {{ productInfo.name }}
                                </div>
                            </div>
                            <div>
                                <div class="results-serum-text mb-1">
                                    {{ productInfo.capacity / 1000 }}ml
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="jump-container py-2">
            <div
                v-for="(link, index) in links"
                :key="index"
                class="box link"
                :style="{width: 'calc(100% / ' + links.length + ')'}"
                @click="sendHash(link.href)"
            >
                {{ link.text }}
            </div>
        </div>
    </div>
</template>

<style scoped>
h3 {
    text-transform: none;
}
.results-serum-container {
    background-color: #f0f3f7;
}
.complete {
    text-align: center;
    font-size: 3.5rem;
    letter-spacing: 3px;
    padding-top: 40px;
    padding-bottom: 10px;
    width: 100vw;
    display: table-cell;
    vertical-align: middle;
}
.text-subheading {
    font-size: 1.6rem;
    padding-bottom: 30px;
}
.results-serum-content {
    margin: auto;
    padding: 1rem;
    background-color: #fff;
}
.results-product {
    padding: 1rem;
}
.results-product-skincare-icon > svg {
    max-width: 24vw;
    max-height: 16vw;
}
.results-serum-description {
    text-align: center;
    font-size: 2rem;
    line-height: 4rem;
    word-break: keep-all;
    margin: calc(20px - 1rem) 0 20px;
    letter-spacing: 0.1em;
}
.result-serums {
    display: flex;
    text-align: center;
}
.jump-container {
    display: flex;
    flex-wrap: wrap;
}
.results-serum-text {
    font-size: 1.8rem;
}
.jump-container > .box {
    height: 8rem;
    /* border: 1px solid #F0F3F7; */
    background-color: #f0f3f7;
    text-align: center;
    font-size: 1.8rem;
    padding-top: 1.5rem;
    position: relative;
}

.jump-container > .box > a:hover,
a:visited,
a:link:hover,
a:link:visited {
    color: #000000;
}
.jump-container > .box > a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
}

.jump-container > .box::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 8.5px 0 8.5px;
    border-color: #000000 transparent transparent transparent;
    position: absolute;
    top: 5.3rem;
    right: calc(50% - 8.5px);
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
.img img {
    width: 100%;
    height: 100vw;
    object-fit: cover;
}
h2 {
    text-transform: none;
    margin: 0.5em 0;
}

.results-product-image {
    height: 57vh;
    max-height: 57vh;
    margin-top: -7.5vh;
}

@media only screen and (min-width: 75em) {
    .results-product-layout-container > .results-product {
        width: 250%;
    }
}

@media screen and (min-width: 768px) {
    .img {
        width: 50%;
        order: 1;
    }
    .img img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    h2 {
        text-transform: none;
        font-size: 24px;
        margin: 0.25em 0;
    }
    p {
        margin: 0.25em 0 0;
    }
    .results-product-text p {
        font-size: 4.2vw;
    }
}

@media screen and (min-width: 1012px) {
    .trial-mode img {
        width: 80%;
    }
}
</style>
