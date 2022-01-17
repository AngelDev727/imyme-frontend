<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {formatPrice, getDiscountedInfo} from '@/imyme-app/utils'
import {State, Getter, Action, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import {isLoggedIn} from '@/shared/auth.js'
import {Results} from '@/shared/store/modules/survey/types'
import {CodProduct} from '@/shared/store/modules/checkout/types'
import {SurveyState} from '@/shared/store/modules/survey/types'
import Morning from '@shared/components/AnimatedIcons/Skincare/Morning.vue'
import Night from '@shared/components/AnimatedIcons/Skincare/Night.vue'
import MorningAndNight from '@shared/components/AnimatedIcons/Skincare/MorningAndNight.vue'
import EyesAndMouth from '@shared/components/AnimatedIcons/Skincare/EyesAndMouth.vue'
import TZone from '@shared/components/AnimatedIcons/Skincare/TZone.vue'
import UZone from '@shared/components/AnimatedIcons/Skincare/UZone.vue'
import Aging from '@shared/components/AnimatedIcons/Skincare/Aging.vue'

interface RechargeObject {
    line_items: any[]
    email?: string
}

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
export default class BuyProduct extends Vue {
    public name: string = 'BuyProduct'

    @Prop({type: Object, required: true}) product!: any
    @Prop({type: String, required: true}) type!: any
    @State('survey') surveyState!: SurveyState
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.rechargeObject) rechargeObject: any
    @Getter('survey/nickName') userName
    @Action('products/getProductInfo') getProductInfo
    @Action('tablet/getRecipe') getRecipe
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @State(state => state.checkout.userSubscriptions) userSubscriptions!:
        | any[]
        | null
    @State(state => state.survey.results) results!: Results | null
    @State(state => state.checkout.userCodSubscriptions)
    userCodSubscriptions!: CodProduct[]
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes
    @Getter('checkout/getPromotionIsInCart') getPromotionIsInCart
    @Getter('checkout/hasDiscounted') hasDiscounted

    showDetails: boolean = false
    productInfo: any = {}
    products: any = []
    price: number = 0
    discountPrice: number = 0
    discountTitle = ''

    formatPrice(price) {
        return formatPrice(price)
    }

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
    get recommendations() {
        return this.surveyState.results
            ? this.surveyState.results.recommends
            : null
    }
    get skinmapDiscription() {
        return this.surveyState.results
            ? this.surveyState.results.skinMapping.description[0]
            : null
    }
    get loggedIn() {
        return isLoggedIn()
    }
    get showDiscount() {
        if (!this.loggedIn) {
            // For New customer
            return true
        } else {
            // For Existing customer
            return (
                this.userSubscriptions &&
                this.userSubscriptions.length === 0 &&
                this.recommendations &&
                !this.getPromotionIsInCart &&
                !this.hasDiscounted &&
                this.userCodSubscriptions &&
                this.userCodSubscriptions.length === 0
            )
        }
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
            this.products.length = 0
            this.price = 0
            this.discountPrice = 0

            let showProduct
            if (this.type === 'serum') {
                showProduct = product.serum
            } else {
                showProduct = product.soap
            }

            for (let i = 0; i < showProduct.length; i++) {
                const storageItem = sessionStorage.getItem(showProduct[i].id)
                if (!storageItem) {
                    this.productInfo = await this.getProductInfo(
                        showProduct[i].id,
                    )
                } else {
                    this.productInfo = JSON.parse(storageItem)
                }
                this.productInfo.serumType = showProduct[i].type

                this.products.push(this.productInfo)
                const {price, discountPrice, discountTitle} = getDiscountedInfo(
                    this.productInfo.type,
                    this.productInfo.priceRange.minVariantPrice.amount,
                    this.getRechargeObjectTypes,
                )
                this.price += Number(price)
                this.discountPrice += Number(discountPrice)
                this.discountTitle = discountTitle
            }
            this.products = this.products.filter((item, index, array) => {
                return array.findIndex(item2 => item.id === item2.id) === index
            })
        }
    }
}
</script>

<template>
    <div v-if="productInfo.shopify_id" class="results-serum-container">
        <div class="results-serum-content">
            <h3 class="px-1 pt-2 pb-0 text-subheading ls-2">
                {{ userName }}
                <br />
                にぴったりの{{ type === 'serum' ? 'セラム' : '石けん' }}
            </h3>
            <div class="results-serum-description">
                <template v-if="type === 'serum'">
                    {{ skinmapDiscription.upper }}<br />
                    {{ skinmapDiscription.lower }}
                </template>
                <template v-if="type === 'soap'">
                    {{ recommendations.soap[0].description[0].upper }}<br />
                    {{ recommendations.soap[0].description[0].lower }}
                </template>
            </div>

            <div v-if="type === 'serum'" class="result-serums">
                <div
                    v-for="(productInfo, index) in products"
                    :key="index"
                    class="results-product-layout-container"
                >
                    <div class="results-product text-center ml-1 mr-1 mb-1">
                        <div class="results-product-skincare-icon bg-white p-1">
                            <Component :is="productInfo.serumType" />
                        </div>
                        <div class="inner">
                            <div class="inner-img">
                                <template v-if="products.length > 1">
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
            <div v-if="type === 'soap'">
                <div class="results-product-layout-container">
                    <div class="results-product text-center ml-1 mr-1 mb-1">
                        <div class="inner">
                            <img
                                v-lazy="productImage(productInfo)"
                                alt="product"
                                class="results-product-image"
                            />
                            <div>
                                <div class="results-serum-text">
                                    {{ productInfo.type }}
                                    {{ productInfo.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showDiscount" class="w-90 m-auto">
                <div class="results-productall w-90 m-auto">
                    <div>
                        <div v-if="type === 'serum'" class="discountPrice">
                            <div class="text-center mb-2">
                                <span class="results-product-text">
                                    2本セット
                                </span>
                            </div>
                            <div class="text-center">
                                <span
                                    class="results-product-text product-price-discounted"
                                >
                                    ¥{{ formatPrice(price) }}
                                </span>
                            </div>
                            <div class="product-price-discount-text">
                                <span>
                                    {{ discountTitle }}
                                </span>
                            </div>
                            <div class="text-center">
                                <span class="results-product-text">
                                    ¥{{ formatPrice(discountPrice) }}
                                </span>
                            </div>
                            <div class="results-product-img">
                                <img
                                    src="@app/assets/images/Subscriptions/campagin-flow.png"
                                    alt="定期購入のご案内"
                                />
                            </div>
                            <div class="campaign-image-txt">
                                <p>※1 送料無料に関して：3,000円以上のご購入者様が対象となります。また、北海道、沖縄、離島は対象になりませんのでご了承下さいませ。</p>
                                <p>※2 初回購入の方のみご対象となります。</p>
                            </div>
                        </div>
                        <div v-else>
                            <div class="results-product-text my-2">
                                ¥{{ formatPrice(price) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="w-90 m-auto">
                <div class="results-productall w-90 m-auto">
                    <div>
                        <div class="discountPrice">
                            <div v-if="type === 'serum'" class="mb-2">
                                <span class="results-product-text">
                                    2本セット
                                </span>
                            </div>
                            <div>
                                <span class="results-product-text">
                                    ¥{{ formatPrice(price) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.results-serum-container {
    margin: 0 -5%;
    background-color: #f0f3f7;
}
.results-serum-content {
    margin: auto;
    padding: 1rem;
    background-color: #fff;
}

.results-product-skincare-icon > svg {
    max-width: 24vw;
    max-height: 16vw;
}
.text-subheading {
    font-size: 1.6rem;
    line-height: 3.2rem;
    text-transform: none;
}
.results-serum-description {
    text-align: center;
    font-size: 2.2rem;
    line-height: 4.4rem;
    word-break: keep-all;
    margin: 2rem 0;
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

.img img {
    width: 100%;
    height: 100vw;
    object-fit: cover;
}
.product-price-discounted {
    text-decoration: none;
    color: #a1a1a1;
}
.product-price-discounted span {
    color: #000000;
    font-size: 4vw;
}
.results-product-text p,
.results-product-text span {
    font-size: 4.8vw;
}

.results-product-text {
    line-height: 4.8vw;
    font-size: 7.2vw;
    letter-spacing: 2px;
}
span.results-product-tex-red {
    font-size: 5.2vw;
    color: red;
    padding-left: 2.8vw;
}
.results-product-img img {
    width: 100%;
}
.results-productall {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.2vw 0;
}
.text-product-description {
    font-size: 1.4em;
}
.results-product-text-title p {
    word-break: keep-all;
}
.discountPrice {
    padding-top: 2.1vw;
}
.product-price-discount-text {
    font-size: 4vw;
    margin: 20% 0 20% 50%;
    border-left: 1px solid #000;
    padding: 15px 0 15px 10px;
}

@media only screen and (min-width: 75em) {
    .results-product-layout-container {
        margin: 0 1rem;
        width: calc(100% - 2rem);
    }
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
    p {
        margin: 0.25em 0 0;
    }
    .results-product-text p {
        font-size: 4.2vw;
    }
    .campaign-image-txt p {
        font-size: 2vw;
    }
    .campaign-image-txt {
        margin: 0 2.1vw;
    }
    .campaign-image-txt p {
        line-height: 3.8vw;
    }
}
@media screen and (max-width: 840px) {
    .campaign-image-txt p {
        font-size: 1.4vw;
    }
    .campaign-image-txt {
        margin: 0 2.1vw;
    }
    .campaign-image-txt p {
        line-height: 3.8vw;
    }
}
</style>
