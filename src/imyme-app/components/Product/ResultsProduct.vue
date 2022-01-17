<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import ResultProductEssences from '@app/components/Product/ResultProductEssences.vue'
import ProductShipping from '@app/components/Product/ProductShipping.vue'
import BuyProduct from '@app/components/Product/BuyProduct.vue'
import BuyTrialProduct from '@app/components/Product/BuyTrialProduct.vue'
import {
    decodeBase64Id,
    formatPrice,
    getDiscountedInfo,
    getLimitedPromotionInfo,
} from '@/imyme-app/utils'
import {State, Getter, Action, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import {isLoggedIn} from '@/shared/auth.js'
import {Results} from '@/shared/store/modules/survey/types'
import {
    CodProduct,
    OrderHistoryInfo,
} from '@/shared/store/modules/checkout/types'

interface RechargeObject {
    line_items: any[]
    email?: string
}

@Component({
    components: {
        ResultProductEssences,
        ProductShipping,
        BuyProduct,
        BuyTrialProduct,
    },
})
export default class ResultsProduct extends Vue {
    public name: string = 'ResultsProduct'

    @Prop({type: Array, required: true}) product!: any
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.rechargeObject) rechargeObject: any
    @Getter('survey/nickName') userName
    @Action('products/getProductInfo') getProductInfo
    @Action('products/getRecipes') getRecipes
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @State(state => state.checkout.userSubscriptions) userSubscriptions!:
        | any[]
        | null
    @State(state => state.survey.results) results!: Results | null
    @State(state => state.checkout.userCodSubscriptions)
    userCodSubscriptions!: CodProduct[]
    @State(state => state.checkout.ordersHistory)
    ordersHistory!: OrderHistoryInfo[]
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes
    @Getter('checkout/getPromotionIsInCart') getPromotionIsInCart
    @Getter('checkout/hasDiscounted') hasDiscounted

    showDetails: boolean = false
    productInfo: any = {}
    products: any = []
    displayProducts: any = []
    recommendProducts: any = []
    price = 0
    discountPrice = 0
    discountTitle = ''
    type = ''
    usingSubscription: boolean = false
    usingSubscriptionIncludeRecommend: boolean = false
    checkSubscriptionFlg: boolean = false

    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    }
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll() {
        const BUY_BTN_POSITION = 0.9
        const ele = document.getElementById('not-one-button')
        const rect = ele ? ele.getBoundingClientRect().top : 0
        const window_size = document.documentElement.clientHeight
        const targetRect = window_size * BUY_BTN_POSITION

        if (ele != null) {
            if (Math.floor(targetRect) > Math.floor(rect)) {
                ele.style.visibility = 'hidden'
            } else {
                ele.style.visibility = 'visible'
            }
        }
    }

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
        if (this.results) {
            return {
                serum: this.extractSerum(this.results.recommends.serum),
                soap: this.results.recommends.soap,
            }
        }
        return null
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
    get subscriptions() {
        if (this.userSubscriptions) {
            return this.userSubscriptions.filter(
                subscription => subscription.status === 'ACTIVE',
            )
        } else {
            return []
        }
    }
    get codSubscriptions() {
        return this.userCodSubscriptions
    }
    get isSelectedOtherProducts() {
        return Boolean(this.extractSelectedProducts(this.isNotEqual).length)
    }
    get isSelectedSameProducts() {
        return Boolean(this.extractSelectedProducts(this.isEqual).length)
    }
    get isSelectedTotalCare() {
        return Boolean(
            this.getRechargeObjectTypes.filter(
                type => type === 'total care set',
            ).length,
        )
    }
    get isSelectedTrialSet() {
        return Boolean(
            this.getRechargeObjectTypes.filter(type => type === 'trial set')
                .length,
        )
    }
    get isTrial() {
        return (
            'isTrial' in this.$route.params &&
            this.$route.params.isTrial &&
            this.ordersHistory.length === 0
        )
    }
    get purchaseBtnTxt() {
        if (this.isTrial) {
            return 'トライアルセット'
        }
        return this.type === 'serum' ? 'セラム' : '石けん'
    }
    get selectedProductsTxt() {
        if (this.isSelectedTotalCare) {
            return 'トータルケアセット選択中'
        } else if (this.isSelectedTrialSet) {
            return 'トライアルセット選択中'
        }
        return 'カート内に追加済み'
    }

    @Watch('product')
    async onResultsChange() {
        this.getInfo(this.product)
        await this.checkSubscription()
    }
    async created() {
        this.getInfo(this.product)
        this.getRecommendProductInfo()
        await this.checkSubscription()
    }
    async getInfo(product) {
        if (product) {
            this.products.length = 0
            for (let i = 0; i < product.length; i++) {
                this.productInfo = await this.getItemInfo(product[i].id)
                const {price, discountPrice, discountTitle} = getDiscountedInfo(
                    this.productInfo.type,
                    this.productInfo.priceRange.minVariantPrice.amount,
                    this.getRechargeObjectTypes,
                )

                this.productInfo.serumType = product[i].type
                this.productInfo.productDescription = product[i].description[0]
                this.price = price
                this.discountPrice = discountPrice
                this.discountTitle = discountTitle
                const productInfoCopy = JSON.parse(
                    JSON.stringify(this.productInfo),
                )
                this.type = this.productInfo.type
                this.products.push(productInfoCopy)
            }
            this.products = this.extractSerum(this.products)
            this.displayProducts = this.products.filter(
                (item, index, array) => {
                    return (
                        array.findIndex(item2 => item.id === item2.id) === index
                    )
                },
            )
        }
    }
    async getRecommendProductInfo() {
        if (this.recommendations) {
            const serums = this.recommendations.serum
            const soap = this.recommendations.soap
            const recommends = serums.concat(soap)

            this.recommendProducts = []
            if (this.isTrial) {
                this.recommendProducts.push(
                    await this.getItemInfo(
                        '093f9cb8-2385-48c5-b61f-c7f82ec34fce',
                    ),
                )
            }
            for (let i = 0; i < recommends.length; i++) {
                this.productInfo = await this.getItemInfo(recommends[i].id)

                const productInfoCopy = JSON.parse(
                    JSON.stringify(this.productInfo),
                )
                this.recommendProducts.push(productInfoCopy)
            }
        }
    }
    async getItemInfo(id) {
        const storageItem = sessionStorage.getItem(id)
        if (!storageItem) {
            return await this.getProductInfo(id)
        } else {
            return JSON.parse(storageItem)
        }
    }
    extractSerum(serums) {
        if (this.isTrial && serums.length > 1) {
            const extractSerum = serums.filter(serum => {
                const serumType = serum.serumType || serum.type
                return (
                    serumType === 'night' ||
                    serumType === 'U' ||
                    serumType === 'morning_and_night'
                )
            })
            if (extractSerum.length === 1) {
                return extractSerum
            }
            return [serums[0]]
        }
        return serums
    }
    isEqual(a, b) {
        return a === b
    }
    isNotEqual(a, b) {
        return a !== b
    }
    extractSelectedProducts(compareFunc) {
        if (!this.results) {
            return []
        }
        const skinCode = this.results.skinMapping.skinCode
        const extractProducts = [
            ...this.rechargeObject.line_items.filter(
                item =>
                    item.type === this.type &&
                    'skinCode' in item &&
                    compareFunc(item.skinCode, skinCode),
            ),
        ]
        return extractProducts
    }
    toggleDetails() {
        this.showDetails = !this.showDetails
    }
    removeFromCart(removeProducts) {
        const removeItemNo = removeProducts.map(line => line.line_item_no)[0]
        const {line_items} = this.rechargeObject
        const lineItems: any[] = []
        line_items.forEach(item => {
            let lineNo = 0
            if (item.line_item_no < removeItemNo) {
                lineNo = item.line_item_no
            } else if (item.line_item_no > removeItemNo) {
                lineNo = item.line_item_no - removeProducts.length
            }
            if (removeItemNo !== item.line_item_no) {
                lineItems.push({...item, line_item_no: lineNo})
            }
        })

        const rechargeObject = {
            ...this.rechargeObject,
            line_items: lineItems,
        }
        this.setRechargeObject(rechargeObject)
        if (lineItems.find(({type}) => type == 'soap')) {
            lineItems[0].discountPrice = getDiscountedInfo(
                lineItems[0].type,
                lineItems[0].price,
                this.getRechargeObjectTypes,
            ).discountPrice
        }
        return removeItemNo
    }
    addToCart(products, type, param = '') {
        if (param === 'trial set') {
            this.setRechargeObject({
                ...this.rechargeObject,
                line_items: [{
                    ...getLimitedPromotionInfo('trial set'),
                    line_item_no: 0,
                }],
                product_type: type,
            })
            this.goToCart(param)
            return
        }
        if (this.isSelectedOtherProducts) {
            this.removeFromCart(this.extractSelectedProducts(this.isNotEqual))
        } else if (!!param && this.isSelectedSameProducts) {
            this.removeFromCart(this.extractSelectedProducts(this.isEqual))
        }
        const {line_items} = this.rechargeObject
        const lineItems = [...line_items]
        let orderProduct
        const lineItemlen = line_items.length
        for (let i = 0; i < products.length; i++) {
            orderProduct = products[i].variants.edges.find(({node}) => {
                return node.availableForSale
            })
            const order = {
                itemId: orderProduct.node.id,
            }
            const lineItem = {
                line_item_no: lineItemlen,
                id: products[i].id,
                product_id: order.itemId,
                variant_id: `${decodeBase64Id(order.itemId)}`,
                quantity: '1',
                properties: {promotion: 'false'},
                price: products[i].priceRange.minVariantPrice.amount,
                title: products[i].title,
                type: products[i].type,
                serumType: products[i].serumType,
                shopifyId: products[i].shopify_id,
                image: products[i].images.edges[0].node.originalSrc,
                logo: products[i].logo,
                skinCode: this.results ? this.results.skinMapping.skinCode : '',
            }
            lineItems.push(lineItem)
        }
        const rechargeObject: RechargeObject = {
            ...this.rechargeObject,
            line_items: lineItems,
            product_type: type,
        }
        if (orderProduct) {
            this.setRechargeObject(rechargeObject)
            this.goToCart(param)
        }
    }
    async goToCart(param = '') {
        this.$router.push({name: 'cart', params: {arg: param}})
    }
    isAvailableProducts() {
        if (this.isTrial) {
            return this.isAvailable(this.recommendProducts)
        } else {
            return this.isAvailable(this.products)
        }
    }
    isAvailableTotalCareSet() {
        return this.isAvailable(this.recommendProducts)
    }
    isAvailable(products) {
        let available = true
        for (let i = 0; i < products.length; i++) {
            available = products[i].variants.edges.find(({node}) => {
                return node.availableForSale
            })
            if (!available) {
                return available
            }
        }
        return available
    }
    goToMyPage() {
        this.$router.push({
            name: 'mypage',
            hash: '#my-subscription',
        })
    }
    async getSubscriptionProductInfoList() {
        return await Promise.all(
            this.subscriptions.map(async subscription => {
                const {id} = await this.getRecipes(
                    `gid://shopify/Product/${subscription.shopify_product_id}`,
                )
                const productInfo = await this.getProductInfo(id)
                return productInfo
            }),
        )
    }
    async getCodSubscriptionProductInfoList() {
        return await Promise.all(
            this.codSubscriptions.map(async codSubscription => {
                const {id} = await this.getRecipes(
                    `gid://shopify/Product/${codSubscription.ItemProductID}`,
                )
                const productInfo = await this.getProductInfo(id)
                return productInfo
            }),
        )
    }
    async checkSubscription() {
        if (this.subscriptions.length > 0 || this.codSubscriptions.length > 0) {
            const subscriptionProductList = await this.getSubscriptionProductInfoList()
            const codSubscriptionProductList = await this.getCodSubscriptionProductInfoList()
            const allSubscriptionProductList = subscriptionProductList.concat(
                codSubscriptionProductList,
            )

            const allSubscriptionProductListOfSameProductType = allSubscriptionProductList.filter(
                product => product.type === this.type,
            )
            this.usingSubscription =
                allSubscriptionProductListOfSameProductType.length > 0
                    ? true
                    : false

            const allSubscriptionProductListOfSameProductName = allSubscriptionProductListOfSameProductType.filter(
                subscriptionProduct => {
                    const matchProductName = this.product.filter(
                        recommendProduct =>
                            subscriptionProduct.name === recommendProduct.name,
                    )
                    return matchProductName.length > 0
                },
            )
            const recommendProductListOfSameProductName = this.product.filter(
                recommendProduct => {
                    const matchProductName = allSubscriptionProductListOfSameProductType.filter(
                        subscriptionProduct =>
                            recommendProduct.name === subscriptionProduct.name,
                    )
                    return matchProductName.length > 0
                },
            )
            if (
                allSubscriptionProductListOfSameProductName.length ===
                    this.product.length &&
                recommendProductListOfSameProductName.length ===
                    this.product.length
            ) {
                this.usingSubscriptionIncludeRecommend = true
            }
        }
        this.checkSubscriptionFlg = true
    }
}
</script>

<template>
    <div v-if="productInfo.shopify_id" class="pb-5">
        <h3 class="text-subheading first ls-1 no-transform">
            {{ userName }}
            <br />
            にぴったりの{{ type === 'serum' ? 'セラム' : '石けん' }}
        </h3>

        <div
            v-for="(productInfo, index) in displayProducts"
            :key="index"
            class="results-product-layout-container pt-1 w-90"
        >
            <div
                :id="
                    displayProducts.length - 1 !== index ? 'not-one-button' : ''
                "
                class="results-product-buy-btn"
            >
                <template v-if="checkSubscriptionFlg">
                    <button
                        v-if="usingSubscriptionIncludeRecommend"
                        class="btn btn-secondary w-60 mx-auto"
                        disabled="true"
                    >
                        <span class="m-auto">
                            定期購入中
                        </span>
                    </button>
                    <button
                        v-else-if="usingSubscription"
                        class="btn btn-secondary w-90 mx-auto"
                        @click="goToMyPage()"
                    >
                        <span class="m-auto">
                            別の{{
                                type === 'serum' ? 'セラム' : '石けん'
                            }}を定期購入中
                        </span>
                    </button>
                    <button
                        v-else-if="isSelectedOtherProducts"
                        class="btn btn-secondary w-90 mx-auto"
                        @click="addToCart(products, type)"
                    >
                        <span class="m-auto">
                            カート内の{{
                                type === 'serum' ? 'セラム' : '石けん'
                            }}を変更する
                        </span>
                    </button>
                    <button
                        v-else-if="
                            (isSelectedSameProducts && !isTrial) ||
                                isSelectedTotalCare ||
                                isSelectedTrialSet
                        "
                        class="btn btn-secondary w-90 mx-auto"
                        @click="goToCart()"
                    >
                        <span class="m-auto">
                            {{selectedProductsTxt}}
                        </span>
                    </button>
                    <button
                        v-else-if="isAvailableProducts()"
                        :class="[
                            'btn',
                            'btn-secondary',
                            'mx-auto',
                            isTrial ? 'w-70' : 'w-60',
                        ]"
                        @click="
                            isTrial
                                ? addToCart(products, '', 'trial set')
                                : addToCart(products, type)
                        "
                    >
                        <svg class="icon-stroke icon-btn">
                            <use xlink:href="#icon-cart" />
                        </svg>
                        <span :class="['m-auto', {'trial-set': isTrial}]">
                            {{ purchaseBtnTxt }}を購入
                        </span>
                    </button>
                    <button
                        v-else
                        class="btn btn-secondary w-60 mx-auto"
                        disabled="true"
                    >
                        <span class="m-auto">
                            在庫切れ
                        </span>
                    </button>
                </template>
            </div>

            <div class="results-product-img-container ml-1 mr-1">
                <div
                    :class="[
                        'results-product-img',
                        {'serum-img': productInfo.type === 'serum'},
                    ]"
                >
                    <img
                        v-lazy="productImage(productInfo)"
                        alt="product"
                        class="results-product-image"
                    />
                </div>
            </div>

            <div class="results-product-header w-70 m-auto">
                <div v-if="productInfo.logo" class="results-serum-description">
                    {{ productInfo.productDescription.upper }}<br />
                    {{ productInfo.productDescription.lower }}
                </div>

                <div v-if="productInfo.logo">
                    <img
                        v-lazy="productInfo.logo"
                        alt="product"
                        class="results-product-logo mt-2"
                    />
                </div>
                <div>
                    <div class="results-product-text mt-2 ls-1">
                        <span class="text-capitalize">
                            {{ type }}
                        </span>
                        {{ productInfo.name }}
                    </div>
                </div>
            </div>

            <div class="p-3 text-product-description w-100">
                {{ productInfo.description }}
            </div>
            <div class="partition" />
            <div class="bg-white">
                <h3 class="text-subheading mt-3 py-3 no-transform">
                    {{ userName }}<br v-if="userName !== 'あなた'" />
                    の肌本来のはたらきを<br />
                    ひきだすこだわりの成分
                </h3>
                <div>
                    <ResultProductEssences
                        v-if="productInfo.essences"
                        :product="productInfo"
                    />
                </div>
                <div class="mx-3">
                    <h3 class="text-subheading py-2 mt-4">全成分一覧</h3>
                    <span
                        v-for="(essence, index2) in productInfo.essences"
                        :key="essence.id"
                        class="text-essence-description"
                    >
                        {{ essence.name }}
                        <span v-if="index2 < productInfo.essences.length - 1">
                            /
                        </span>
                    </span>
                    <div class="list-end-harf" />
                </div>
                <template
                    v-if="
                        type === 'serum' && displayProducts.length - 1 === index
                    "
                >
                    <h3 class="text-subheading py-2 mt-4-calc ls-1">
                        もちろん以下の成分は<br />
                        配合しておりません
                    </h3>
                    <ul class="text-free-description">
                        <li>合成防腐剤</li>
                        <li>合成香料</li>
                        <li>合成色素</li>
                        <li>合成ポリマー</li>
                        <li>石油由来合成界面活性剤</li>
                        <li>エタノール</li>
                        <li>シリコン</li>
                        <li>乳化剤</li>
                    </ul>
                    <div class="list-end-harf" />
                </template>
            </div>
            <template
                v-if="type === 'serum' && displayProducts.length - 1 === index"
            >
                <div class="partition" />
                <div class="w-90 m-auto bg-white">
                    <h3 class="text-subheading py-2 mt-4">
                        使用方法
                    </h3>
                    <div class="text-left">
                        <span>
                            みずみずしい肌を保つためには、何より水分が大切です。<br />
                            1回の使用量は500円硬貨くらいの量です。商品によって異なりますが、
                            化粧水の容器を5～7回振ったくらいの量です。手の平からこぼれないよう
                            に両手のひら全体に広げ、顔の中心から外側へ、大きく円を描くように
                            のばします。首につける場合は、首の下から上に向かって、両手のひら
                            全体を使い、軽くすりあげるようになじませます。
                        </span>
                    </div>
                    <h3 class="text-subheading py-2 mt-4">
                        使用期限
                    </h3>
                    <div class="text-left">
                        <span>
                            imymeは鮮度にこだわり、製造年月日と使用期限を記載しています。<br />
                            これからお使いになるあなたにぜひ、お願いがあります。imymeの
                            セラムをできる限り新鮮な情報でお使いください。そして、使用期限
                            内に使い切ってください。新鮮なセラムこそ、あなたの肌状態を最大
                            限に引き上げてくれるのです。
                        </span>
                    </div>
                    <div class="list-end-harf" />
                </div>
            </template>
            <template v-if="displayProducts.length - 1 === index">
                <div class="list-end partition" />
                <BuyProduct
                    v-if="!isTrial"
                    :product="recommendations"
                    :type="type"
                />
                <BuyTrialProduct v-else />
            </template>
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
            <!-- <div
                v-if="showDiscount && isAvailableTotalCareSet() && !isTrial"
                class="bannerImg bg-body"
                @click="addToCart(products, '', 'totalCareSet')"
            >
                <img src="@app/assets/images/banner1212.png" />
            </div> -->

            <div v-if="type === 'serum' || isTrial" class="subscr"></div>
            <div v-else-if="type === 'soap'" class="subscr bg-white">
                <div class="desc">
                    <svg class="icon-stroke icon-stroke-bold icon-top-page">
                        <use xlink:href="#icon-cycle" />
                    </svg>
                    <h2>
                        季節によって変化する肌を
                        <br />imymeがサポート
                    </h2>
                    <p>
                        詳しく見る＞
                    </p>
                </div>
                <div class="img">
                    <img
                        src="@app/assets/images/Subscriptions/header_subscriptions_pc.jpg"
                        alt="定期購入のご案内"
                    />
                </div>
                <!-- Comment out and leave as there is a possibility of switching back. -->
                <!-- <router-link
                    :to="{
                        path: 'subscriptions-description?ref=results',
                    }"
                >
                    <div class="desc">
                        <svg class="icon-stroke icon-stroke-bold icon-top-page">
                            <use xlink:href="#icon-cycle" />
                        </svg>
                        <h2>
                            季節によって変化する肌を
                            <br />imymeがサポート
                        </h2>
                        <p>
                            詳しく見る＞
                        </p>
                    </div>
                    <div class="img">
                        <img
                            src="@app/assets/images/Subscriptions/header_subscriptions_pc.jpg"
                            alt="定期購入のご案内"
                        />
                    </div>
                </router-link> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.mt-4-calc {
    margin-top: calc(4rem - 25px);
}
.text-subheading {
    font-size: 2.5rem;
}
.text-subheading.first {
    font-size: 2.8rem;
    line-height: 5.6rem;
    padding: 3rem 0;
}
.no-transform {
    text-transform: none;
}
div.list-end {
    min-height: 5rem;
}
div.list-end-harf {
    min-height: 25px;
}
.subscr {
    position: relative;
    margin: 0;
    margin-bottom: 7rem;
}
.subscr.bg-white {
    position: relative;
    margin: 0 -5% 7rem;
    padding: 0 5% 3rem;
}
.desc {
    width: 100%;
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
.results-product-layout-container {
    background-color: #fff;
    margin: auto;
}
.product-price-discounted span {
    color: #000000;
    font-size: 4vw;
}
.bannerImg {
    margin: 0 -5%;
    padding-bottom: 3rem;
}
.bannerImg img {
    width: 90%;
    display: block;
    margin: 0 5%;
    padding: 0 1rem;
}
.results-product-text {
    margin-left: 0;
    line-height: 4.8vw;
    font-size: 6.2vw;
}
.results-product-description {
    text-align: center;
    font-size: 1.6rem;
}
.results-serum-description {
    margin-top: 20px;
    text-align: center;
    font-size: 2.2rem;
    line-height: 4rem;
    word-break: keep-all;
}
span.results-product-tex-red {
    font-size: 5.2vw;
    color: red;
    padding-left: 2.8vw;
}
.results-product-img.serum-img {
    height: 37vh;
    overflow: hidden;
}
.results-product-img.serum-img img {
    height: 57vh;
    max-height: 57vh;
    margin: -10vh 0;
}
.results-productall {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.2vw 0;
}
.text-product-description {
    font-size: 1.4em;
    background-color: #fff;
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

.results-product-header {
    flex-direction: column;
}

.text-free-description {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.text-free-description li {
    text-align: center;
    padding: 1rem;
    margin: 1rem;
    margin-right: 0.5rem;
    width: 45%;
    background-color: #f0f3f7;
    text-decoration: line-through #b4b0b0;
}
.text-free-description li:nth-child(even) {
    margin: 1rem;
    margin-left: 0.5rem;
}
.results-product-buy-btn {
    height: 0;
}
.partition {
    height: 1rem;
    background-color: #f0f3f7;
}
.btn-secondary > span {
    height: 1.7em;
    line-height: 1.9em;
}
.trial-set {
    font-size: 0.65em;
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
    .results-product-text,
    .results-product-text span {
        font-size: 2.2vw;
    }
}
@media screen and (min-width: 846px) and (max-width: 75em) {
    .results-product-img.serum-img {
        height: 57vh;
    }
    .serum-img img {
        height: 80vh;
        min-height: 80vh;
    }
}
@media screen and (max-width: 74em) {
    .btn {
        padding: 0.65rem 2vw;
    }
}
@media screen and (min-width: 75em) {
    .results-product-layout-container {
        margin-bottom: 7rem;
    }
    .results-product-img-container {
        grid-column: span 1;
        grid-column-start: 1;
        grid-row: span 2;
    }
    .results-product-layout-container > .results-product-buy-btn {
        margin: 0;
        grid-column: span 2;
        position: sticky;
        top: 90%;
    }
    .results-product-img {
        height: 100% !important;
    }
    .results-product-img img {
        height: 100% !important;
        max-height: 100% !important;
        margin: auto 0 !important;
        padding-bottom: 1rem;
    }
    .text-product-description {
        margin-top: 3rem;
        grid-column: span 1;
    }
    .subscr,
    .subscr.bg-white {
        margin-bottom: 0;
    }
}
</style>
