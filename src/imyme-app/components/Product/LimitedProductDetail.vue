<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import ProductEssences from '@app/components/Product/ProductEssences.vue'
import ProductShipping from '@app/components/Product/ProductShipping.vue'
import {decodeBase64Id, formatPrice, getDiscountedInfo, oneTimePromotionItem, getLimitedProductInfo, canDisplayLimitedProductBanner, getProductTypeName} from '@/imyme-app/utils'
import {State, Getter, Action, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'

interface RechargeObject {
    line_items: any[]
    email?: string
}

interface lineItemObject {
    id: string
    product_id: string
    variant_id: string
    quantity: string
    properties: any
    price: string
    title: string
    type: string
    shopifyId: string
    image: string
    logo: string
    [prop: string]: any
}

@Component({
    components: {
        ProductEssences,
        ProductShipping,
    },
})
export default class LimitedProductDetail extends Vue {
    public name: string = 'LimitedProductDetail'

    @Prop({type: String, required: true}) product_id!: any
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.rechargeObject) rechargeObject: any
    @Getter('survey/nickName') userName
    @Action('products/getProductInfo') getProductInfo
    @Action('tablet/getRecipe') getRecipe
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @Mutation('checkout/SET_PROMOTION') setPromotion
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes

    showDetails: boolean = false
    productInfo: any = {}
    price = 0
    discountPrice = 0
    discountTitle = ''
    limitedProduct: {[key: string]: string} = {}
    isWide = false

    formatPrice(price) {
        return formatPrice(price)
    }

    get productImage() {
        if (this.productInfo) {
            if (this.productInfo.images) {
                return this.productInfo.images.edges[0].node.originalSrc
            } else if (this.productInfo.image) {
                return this.productInfo.image
            }
        }
        return ''
    }
    get isOneTimePromotion() {
        return (this.$route.query.promotion && this.$route.query.promotion === 'on') ? true : false
    }
    get showLimitedBanner() {
        return canDisplayLimitedProductBanner(this.productInfo.id)
    }
    get productTypeName() {
        return getProductTypeName(this.productInfo.type)
    }

    @Watch('product_id')
    async onResultsChange() {
        this.getInfo(this.product_id)
    }
    async created() {
        this.getInfo(this.product_id)
    }
    async getInfo(productId) {
        if (productId) {
            const storageItem = sessionStorage.getItem(productId)
            if (!storageItem) {
                try {
                    this.productInfo = await this.getProductInfo(productId)
                } catch {
                    this.$router.push({name: 'top'})
                }
            } else {
                this.productInfo = JSON.parse(storageItem)
            }
            const {price, discountPrice, discountTitle} = getDiscountedInfo(
                this.productInfo.type,
                this.productInfo.priceRange.minVariantPrice.amount,
                this.getRechargeObjectTypes,
            )
            this.price = price
            this.discountPrice = discountPrice
            this.discountTitle = discountTitle
            this.limitedProduct = getLimitedProductInfo(this.productInfo.id)
            if (!this.limitedProduct) this.$router.push({name: 'top'})
            this.productInfo.type === 'brightening powder'
                ? (this.isWide = true)
                : ''
        }
    }
    toggleDetails() {
        this.showDetails = !this.showDetails
    }
    async addToCart(product) {
        const {line_items} = this.rechargeObject
        const lineItems = [...line_items]

        const orderProduct = product.variants.edges.find(({node}) => {
            return node.availableForSale
        })
        const order = {
            itemId: orderProduct.node.id,
        }

        const lineItemObject: lineItemObject = {
            line_item_no: line_items.length,
            id: product.id,
            product_id: order.itemId,
            variant_id: `${decodeBase64Id(order.itemId)}`,
            quantity: '1',
            properties: {promotion: 'false'},
            price: this.productInfo.priceRange.minVariantPrice.amount,
            title: product.title,
            type: product.type,
            shopifyId: product.shopify_id,
            image: product.images.edges[0].node.originalSrc,
            logo: product.logo,
        }
        if (this.limitedProduct.discount) {
            lineItemObject.properties.promotion = 'true'
            lineItemObject.discountPrice = this.discountPrice
        }

        lineItems.push(
            lineItemObject
        )

        const rechargeObject: RechargeObject = {
            ...this.rechargeObject,
            line_items: lineItems,
        }
        if (orderProduct) {
            this.setRechargeObject(rechargeObject)
            if (this.isOneTimePromotion) {
                this.setPromotion(true)
                await this.getProductInfo(oneTimePromotionItem.id)
                this.goToCart()
            } else if (this.showLimitedBanner || this.limitedProduct.discount) {
                this.goToCart()
            } else {
                this.goToAddress()
            }
        }
    }
    async goToCart() {
        this.$router.push({name: 'cart'})
    }
    async goToAddress() {
        this.$router.push({name: 'orderInputForm'})
    }
    isAvailable(product) {
        const available = product.variants.edges.find(({node}) => {
            return node.availableForSale
        })
        return available
    }
    getBannerPath(fileName: string): string {
        return require('@app/assets/images/limited/' + fileName + '')
    }
}
</script>

<template>
    <div v-if="productInfo.shopify_id" class="pb-5">
        <div class="p-2 product-title ls-2 lh-1 m-auto">
            <span v-if="limitedProduct && limitedProduct.title">
                {{ userName }}へ
                <br />
                <span v-html="limitedProduct.title"></span>
            </span>
        </div>
        <div class="results-product-layout-container">
            <div class="results-product text-center ml-1 mr-1 mb-1">
                <div class="inset">
                    <img
                        v-lazy="productImage"
                        alt="product"
                        class="results-product-image"
                    />
                </div>
            </div>

            <div class="w-90 m-auto">
                <div class="results-productall w-90 m-auto">
                    <div v-if="productInfo.logo">
                        <img
                            v-lazy="productInfo.logo"
                            alt="product"
                            class="results-product-logo"
                        />
                    </div>
                    <div>
                        <div class="results-product-text">
                            <span class="text-capitalize">
                                {{ productInfo.type }}
                            </span>
                            {{ productInfo.title }}
                        </div>
                        <div v-if="limitedProduct.discount" class="discountPrice">
                            <span class="results-product-text product-price-discounted"><span>¥{{ formatPrice(price) }}</span></span>
                            <span class="results-product-text results-product-tex-red">¥{{ formatPrice(discountPrice) }}</span>
                        </div>
                        <div v-else class="discountPrice">
                            <span class="results-product-text">
                                <span>¥{{ formatPrice(price) }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div v-if="productInfo.totalInventory" class="stock-number">
                    残り {{ productInfo.totalInventory }} 本！
                </div>
                <span v-if="showLimitedBanner">
                    <div class="results-product-img">
                        <img
                            :src="getBannerPath(limitedProduct.banner)"
                            alt="今回限定！石鹸セットで送料無料"
                        />
                    </div>
                    <div class="campaign-image-txt">
                        <p>
                            ※1 北海道、沖縄、離島は対象になりませんのでご了承下さいませ。
                        </p>
                    </div>
                </span>
            </div>
            <div class="results-product-buy-btn">
                <button
                    v-if="!isAvailable(productInfo)"
                    class="btn btn-secondary w-60 mx-auto"
                    disabled="true"
                >
                    <span class="m-auto">
                        在庫切れ
                    </span>
                </button>
                <button
                    v-else-if="~getRechargeObjectTypes.indexOf('trial set')"
                    class="btn btn-secondary w-60 mx-auto"
                    disabled="true"
                >
                    <span class="m-auto">
                        トライアルセット選択中
                    </span>
                </button>
                <button
                    v-else
                    class="btn btn-secondary mx-auto"
                    :class="[isWide ? 'w-90 wide' : 'w-60']"
                    @click="addToCart(productInfo)"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-cart" />
                    </svg>
                    <span class="m-auto">{{ productTypeName }}を購入</span>
                </button>
            </div>
            <h3 class="text-subheading results-product-description-heading">
                特長
            </h3>
            <div
                class="text-regular left p-1 text-product-description results-product-description w-90 m-auto"
            >
                {{ productInfo.description }}
            </div>
            <h3 class="text-subheading pt-4">使用成分</h3>
            <div>
                <ProductEssences
                    v-if="productInfo.essences"
                    :product="productInfo"
                />
            </div>
            <div class="mx-3 mb-2">
                <span
                    v-for="(essence, index) in productInfo.essences"
                    :key="essence.id"
                    class="text-essence-description"
                >
                    {{ essence.name }}
                    <span v-if="index < productInfo.essences.length">/</span>
                </span>
                <div class="essence-list-end" />
            </div>
            <transition
                duration="5000"
                :css="false"
                @enter="$enter"
                @after-enter="$afterEnter"
                @leave="$leave"
            >
                <div v-if="showDetails" class="collapse-section">
                    <ProductShipping :product="productInfo" />
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.product-title {
    font-size: 2.4em;
    line-height: normal;
    word-break: keep-all;
}
div.stock-number {
    text-align: center;
    font-size: 2.8em;
    color: red;
    padding-bottom: 2vw;
}
div.essence-list-end {
    min-height: 50px;
}
.subscr {
    margin: 0;
    margin-bottom: 7rem;
    position: relative;
}
.desc {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
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
.product-price-discounted span {
    color: #000000;
    font-size: 4vw;
}
.results-product-text p,
.results-product-text span {
    font-size: 4.8vw;
}
.results-product-logo {
    max-height: 9em;
    padding-right: 2.1vw;
}
.results-product-text {
    line-height: 4.8vw;
    font-size: 5.2vw;
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
.campaign-image-txt p {
    font-size: 2vw;
}
.campaign-image-txt {
    margin: 0 2.1vw;
}
.campaign-image-txt p {
    line-height: 3.8vw;
}
.wide {
    font-size: 2.3em;
}
@media screen and (min-width: 768px) {
    .subscr {
        margin: 0;
        margin-bottom: 7rem;
        display: flex;
    }
    .desc {
        width: 50%;
        display: flex;
        flex-direction: column;
        position: static;
        justify-content: center;
        align-items: center;
        order: 2;
        transform: none;
    }
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
</style>
