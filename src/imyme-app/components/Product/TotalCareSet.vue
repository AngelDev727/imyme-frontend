<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import {State, Action, Getter, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import {isLoggedIn} from '@/shared/auth.js'
import {Results} from '@/shared/store/modules/survey/types'
import {CodProduct} from '@/shared/store/modules/checkout/types'
import {
    formatPrice,
    getDiscountedInfo,
    getProductData,
    getLimitedProductInfo,
    getLimitedPromotionInfo,
} from '@/imyme-app/utils'

@Component
export default class TotalCareSet extends Vue {
    public name: string = 'TotalCareSet'

    @State(state => state.survey.results) results!: Results | null
    @State(state => state.checkout.rechargeObject) rechargeObject: any
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.userSubscriptions) userSubscriptions!:
        | any[]
        | null
    @State(state => state.checkout.userCodSubscriptions)
    userCodSubscriptions!: CodProduct[]
    @Action('products/getProductPrice') getProductPrice
    @Action('products/getProductInfo') getProductInfo
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes
    @Getter('checkout/getPromotionIsInCart') getPromotionIsInCart
    @Getter('checkout/hasDiscounted') hasDiscounted
    @Getter('checkout/getDiscountCode') getDiscountCode
    @Getter('checkout/isAppliedDiscount') isAppliedDiscount
    @Mutation('checkout/SET_DISCOUNT_CODE') setDiscountCode

    discountTitle = ''
    checked: string = ''
    inStock: boolean = false
    selectableProductData: any = null
    serumData: any = null
    soapData: any = null
    productDataLimitedPromotion: any = {}
    serumDataList: any = []
    selectableProductDataList: any = []
    recommendProducts: any = []

    get recommendations() {
        return this.results ? this.results.recommends : null
    }

    get loggedIn() {
        return isLoggedIn()
    }

    get showDiscount() {
        return (
            this.userSubscriptions &&
            this.userSubscriptions.length === 0 &&
            this.recommendations &&
            this.loggedIn &&
            !this.getPromotionIsInCart &&
            !this.hasDiscounted &&
            this.userCodSubscriptions &&
            this.userCodSubscriptions.length === 0
        )
    }

    get containsSerum() {
        const serumCount = this.rechargeObject.line_items.filter(
            item => item.type === 'serum',
        ).length
        const limitedProductCount = this.rechargeObject.line_items.filter(
            item => {
                return getLimitedProductInfo(item.id)
            },
        ).length

        return serumCount > limitedProductCount
    }

    formatPrice(price) {
        return formatPrice(price)
    }

    formatTotalPrice(items: any[], target: string): string {
        let totalPrice: number = 0
        items.forEach(item => {
            if (typeof item[target] === 'number') {
                totalPrice += item[target]
            } else {
                totalPrice += Number(item[target])
            }
        })
        return this.formatPrice(totalPrice)
    }

    capitalizeOnlyFirst(str) {
        return str[0].toUpperCase() + str.slice(1)
    }

    selectedItem(item) {
        if (item === 'serum') {
            this.$emit('emitSelectedPromotion', {...this.selectableProductData})
        } else if (item === 'totalCareSet') {
            this.$emit('emitSelectedPromotion', {
                ...this.productDataLimitedPromotion,
            })
        } else {
            this.$emit('emitResetedPromotion')
        }
    }

    @Watch('getDiscountCode')
    setCheckedDiscount(val: any) {
        if (!val && !this.isAppliedDiscount && this.checked === 'dicountCode') {
            this.checked = this.selectableProductData.type
            this.selectedItem(this.selectableProductData.type)
        } else if (
            val &&
            this.isAppliedDiscount &&
            this.checked !== 'dicountCode'
        ) {
            this.checked = 'dicountCode'
            this.selectedItem('dicountCode')
        }
    }

    @Watch('checked')
    controlDiscount(val: string) {
        if (
            (val === 'serum' || val === 'soap') &&
            this.isAppliedDiscount &&
            this.getDiscountCode
        ) {
            this.setDiscountCode({
                code: val,
            })
        }
    }

    @Watch('rechargeObject.line_items')
    async setProductPromotion() {
        if (
            this.results &&
            this.results.recommends &&
            this.results.recommends.serum &&
            this.results.recommends.serum[0] &&
            this.results.recommends.soap &&
            this.results.recommends.soap[0]
        ) {
            let selectableProductId
            let selectableProductData
            let recommends
            this.selectableProductDataList = []
            if (this.containsSerum) {
                recommends = this.results.recommends.serum
            } else {
                recommends = this.results.recommends.soap
            }
            for (let i = 0; i < recommends.length; i++) {
                selectableProductId = recommends[i].id

                selectableProductData = getProductData(selectableProductId)

                const {priceRange} = await this.getProductPrice(
                    selectableProductData.shopifyId,
                )
                selectableProductData.price = priceRange.minVariantPrice.amount
                if (selectableProductData.price) {
                    const {discountPrice, discountTitle} = getDiscountedInfo(
                        selectableProductData.type,
                        selectableProductData.price,
                        this.getRechargeObjectTypes,
                    )
                    selectableProductData.discountPrice = discountPrice
                    this.discountTitle = discountTitle
                }
                this.selectableProductData = selectableProductData
                this.selectableProductDataList.push(this.selectableProductData)
                if (selectableProductData.id) {
                    this.inStock = true
                }
            }
        }

        this.setSerumAndSoap()
        this.setTotalCareSet()
        this.setSelectedItem()
    }

    setSerumAndSoap() {
        this.serumDataList = []
        if (
            this.results &&
            this.results.recommends &&
            this.results.recommends.serum &&
            this.results.recommends.serum[0] &&
            this.results.recommends.soap &&
            this.results.recommends.soap[0]
        ) {
            this.results.recommends.serum.forEach(async serum => {
                this.serumData = getProductData(serum.id)
                this.serumData.type = this.capitalizeOnlyFirst(
                    this.serumData.type,
                )

                this.serumDataList.push(this.serumData)
            })
            this.soapData = getProductData(this.results.recommends.soap[0].id)
            this.soapData.type = this.capitalizeOnlyFirst(this.soapData.type)
        }
    }

    setTotalCareSet() {
        const totalCareSetInfo = getLimitedPromotionInfo('total care set')
        const {discountPrice, discountTitle} = getDiscountedInfo(
            String(totalCareSetInfo.type),
            Number(totalCareSetInfo.price),
            this.getRechargeObjectTypes,
        )
        totalCareSetInfo.discountPrice = discountPrice
        totalCareSetInfo.discountTitle = discountTitle

        this.productDataLimitedPromotion = totalCareSetInfo
    }

    setSelectedItem() {
        if (this.$route.params.arg === 'totalCareSet') {
            this.checked = 'totalCareSet'
            this.selectedItem('totalCareSet')
        } else if (this.isAppliedDiscount && this.getDiscountCode) {
            this.checked = 'discountCode'
            this.selectedItem('discountCode')
        } else if (this.selectableProductData.id) {
            this.checked = this.selectableProductData.type
            this.selectedItem(this.selectableProductData.type)
        }
    }

    async getRecommendProductInfo() {
        if (this.recommendations) {
            const serums = this.recommendations.serum
            const soap = this.recommendations.soap
            const recommends = serums.concat(soap)
            let productInfo = {}
            this.recommendProducts = []
            for (let i = 0; i < recommends.length; i++) {
                const storageItem = sessionStorage.getItem(recommends[i].id)
                if (!storageItem) {
                    productInfo = await this.getProductInfo(recommends[i].id)
                } else {
                    productInfo = JSON.parse(storageItem)
                }

                const productInfoCopy = JSON.parse(JSON.stringify(productInfo))
                this.recommendProducts.push(productInfoCopy)
            }
        }
    }

    isProductAvailable() {
        let available = true
        for (let i = 0; i < this.recommendProducts.length; i++) {
            available = this.recommendProducts[i].variants.edges.find(
                ({node}) => {
                    return node.availableForSale
                },
            )
            if (!available) {
                return available
            }
        }
        return available
    }

    created() {
        this.setProductPromotion()
        this.getRecommendProductInfo()
    }
}
</script>

<template>
    <!-- eslint-disable-next-line -->
    <div v-if="showDiscount" class="max-page-w new-cart">
        <div class="new-cart-wrapper">
            <h2>定期購入の選択</h2>
            <p>
                肌が輝けば、自然と笑顔に。肌からあなた自身の魅力を引き出して輝いていただけるようお手伝いします！
            </p>
            <div v-if="selectableProductData" class="new-cart-content">
                <label
                    :for="selectableProductData.type"
                    class="product-content"
                    @click="selectedItem(selectableProductData.type)"
                >
                    <div class="new-cart-content-serum-product">
                        <div class="container">
                            <input
                                :id="selectableProductData.type"
                                v-model="checked"
                                type="radio"
                                :value="selectableProductData.type"
                                name="promotion"
                                class="radio"
                                :disabled="!inStock"
                            />
                            <label
                                class="checkmark"
                                :for="selectableProductData.type"
                            ></label>
                            <p v-if="containsSerum" class="discount-title">
                                {{ discountTitle }}
                            </p>
                            <!-- eslint-disable-next-line -->
                            <div v-for="(selectableProductData, index) in selectableProductDataList" :key="index">
                                <p v-if="!inStock">
                                    只今在庫切れのため、選択できません
                                </p>
                                <p>
                                    {{ selectableProductData.type }}
                                    {{ selectableProductData.title }}
                                </p>
                                <div
                                    v-if="
                                        selectableProductData.type !== 'serum'
                                    "
                                >
                                    <p>
                                        <span>
                                            ¥{{
                                                formatPrice(
                                                    selectableProductData.price,
                                                )
                                            }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div
                                v-if="containsSerum"
                                class="product-discount-price total-price"
                            >
                                <p
                                    class="product-price product-price-discounted"
                                >
                                    <span>
                                        ¥{{
                                            formatTotalPrice(
                                                selectableProductDataList,
                                                'price',
                                            )
                                        }}
                                    </span>
                                </p>
                                <p class="product-price">
                                    ¥{{
                                        formatTotalPrice(
                                            selectableProductDataList,
                                            'discountPrice',
                                        )
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                </label>
                <div class="product-img w-50 py-2">
                    <template v-if="selectableProductData.type === 'soap'">
                        <img :src="soapData.image" alt="product" />
                    </template>
                    <template v-else>
                        <template v-for="(serum, index) in serumDataList">
                            <div :key="index" class="w-50">
                                <img :src="serum.image" alt="product" />
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <div v-if="isProductAvailable()" class="icon-img">
                <img
                    src="@app/assets/images/december_icon.png"
                    alt="12月限定"
                    class="serumIconImg"
                />
            </div>
            <div
                v-if="serumDataList && soapData && isProductAvailable()"
                class="new-cart-content-totalset"
            >
                <div class="new-cart-content-totalset-wrapper">
                    <h3>透き通るキメ肌へ導く<br />トータルケアセット</h3>
                </div>
                <div class="new-cart-content-totalset-content">
                    <label
                        for="totalCareSet"
                        class="product-content"
                        @click="selectedItem('totalCareSet')"
                    >
                        <div class="container">
                            <input
                                id="totalCareSet"
                                v-model="checked"
                                type="radio"
                                value="totalCareSet"
                                name="promotion"
                                class="radio"
                            />
                            <label class="checkmark" for="totalCareSet"></label>
                            <div>
                                <p>トータルケアセット</p>
                                <p>Brightning Powder</p>
                                <p
                                    v-for="(serum, index) in serumDataList"
                                    :key="index"
                                >
                                    {{ serum.type }} {{ serum.title }}
                                </p>
                                <p>{{ soapData.type }} {{ soapData.title }}</p>
                                <p>泡立てネット（未販売）</p>
                                <div class="product-discount-price">
                                    <p
                                        class="product-price product-price-discounted"
                                    >
                                        <span>
                                            ¥{{
                                                formatPrice(
                                                    productDataLimitedPromotion.price,
                                                )
                                            }}
                                        </span>
                                    </p>
                                    <p class="product-price">
                                        {{
                                            productDataLimitedPromotion.discountTitle
                                        }}
                                        ¥{{
                                            formatPrice(
                                                productDataLimitedPromotion.discountPrice,
                                            )
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
                <img
                    src="@app/assets/images/careimg.png"
                    alt="トータルケアセット"
                    class="serum2Img"
                />
                <h3>トータルケアセットの内容</h3>
                <p>
                    <span class="small-txt">
                        ※セラムと石鹸のみがいつでも解約できる定期購入になります
                    </span>
                </p>
                <div class="new-cart-content-totalset-setbox">
                    <img
                        src="@app/assets/images/totalcare01.png"
                        alt="brightening powder"
                        class="serum3Img recommend-item"
                    />
                    <div class="new-cart-content-totalset-setboxtxt">
                        <p class="setboxtxt-title">Brightning Powder</p>
                        <p class="setboxtxt-title2">究極の美肌パウダー</p>
                        <p>
                            使用目安：1週間に1,2回(3~6ヶ月分入り)
                        </p>
                        <p>
                            酸化を防いで肌をトーンアップし、還元作用でキメを整えてくれます。ビタミンC*を新鮮な状態で肌に届けるために原末パウダーでお届け！使う直前に精製水と混ぜてパックを作るだけで究極の美肌へ導くスペシャルケアです。
                        </p>
                    </div>
                </div>
                <div class="new-cart-content-totalset-setbox">
                    <template v-for="(serum, index) in serumDataList">
                        <img
                            :key="index"
                            :src="serum.image"
                            alt="serum"
                            class="serum4Img recommend-item"
                        />
                    </template>
                    <div class="new-cart-content-totalset-setboxtxt">
                        <p
                            v-for="(serum, index) in serumDataList"
                            :key="index"
                            class="setboxtxt-title"
                        >
                            {{ serum.type }} {{ serum.title }}
                        </p>
                        <p class="setboxtxt-title2">
                            ぴったりセラムで肌のはたらきをサポート
                        </p>
                        <p>
                            長く綺麗な美肌を保つには、肌自身にきちんとはたらいてもらうことが必要不可欠です。防腐剤、界面活性剤など不要な成分を一切使わない、”ぴったりのセラム”を使うことで肌の魅力を引き出すことができます。
                        </p>
                    </div>
                </div>
                <div class="new-cart-content-totalset-setbox">
                    <img
                        :src="soapData.image"
                        alt="soap"
                        class="serum3Img recommend-item"
                    />
                    <div class="new-cart-content-totalset-setboxtxt">
                        <p class="setboxtxt-title">
                            {{ soapData.type }} {{ soapData.title }}
                        </p>
                        <p class="setboxtxt-title2">
                            肌に優しく、1日の汚れをキレイに落とす洗顔石鹸
                        </p>
                        <p>
                            肌のはたらきで唯一できないのが洗顔部分。汚れを落としてあげることで自然な肌のターンオーバーをサポート。天然成分だけを低温で数ヶ月かけて熟成して作るので、肌に優しく、1日の汚れをキレイに落としてくれます。
                        </p>
                    </div>
                </div>
                <div class="new-cart-content-totalset-setbox">
                    <img
                        src="@app/assets/images/totalcare04.png"
                        alt="泡立てネット"
                        class="serum3Img recommend-item"
                    />
                    <div class="new-cart-content-totalset-setboxtxt">
                        <p class="setboxtxt-title">
                            泡立てネット
                        </p>
                        <p class="setboxtxt-title2">
                            ふわふわの泡で摩擦レス洗顔(未販売！)
                        </p>
                        <p>
                            肌のバリア機能を低下させてしまうのが、日々の摩擦です。洗顔時も手で顔を擦れば肌ストレスに。洗顔のポイントは、手は肌に触れず泡で汚れを吸着する事。キメ肌にはふわふわ泡を作りやすい泡立てネットをお使い下さい。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.new-cart-content {
    display: flex;
}
.new-cart-wrapper {
    background-color: #f1f4f5;
    padding: 3.6vw;
}
.new-cart-content {
    margin-top: 2.1vw;
}
.new-cart-wrapper h2 {
    padding: 2.8vw 0;
}
.new-cart-content-totalset {
    margin-top: -10.8vw;
    background-color: #fcc2c8;
    padding: 2.8vw;
}
.new-cart-content-totalset h3 {
    padding: 3.2vw 0 3.2vw 0;
}
.new-cart {
    width: 96vw;
}
.new-cart-content-totalset-content {
    background-color: #ffffffff;
}
.new-cart-content-totalset-txt {
    padding: 2.8vw;
}
.serumImg {
    display: block;
    width: 24vw;
}
.serum2Img {
    display: block;
    width: 100%;
}
.serum3Img {
    display: block;
    width: 36vw;
    height: 50vw;
    flex-shrink: 0;
}
.serum4Img {
    display: block;
    width: 18vw;
    height: 57vw;
    flex-shrink: 0;
}
.new-cart-content-totalset-setbox {
    display: flex;
    justify-content: space-between;
    padding-bottom: 4.8vw;
}
.new-cart-content-totalset-setboxtxt {
    padding-left: 2.1vw;
}
.new-cart-content-totalset-setboxtxt p {
    font-size: 2.6vw;
    line-height: 4.6vw;
}
.new-cart-content-totalset-setboxtxt p.setboxtxt-title {
    font-size: 3vw;
    font-weight: bold;
}
.new-cart-content-totalset-setboxtxt p.setboxtxt-title2 {
    font-size: 3.8vw;
    line-height: 5.2vw;
    padding: 1.4vw 0;
    font-weight: 400;
}
span.small-txt {
    font-size: 2.1vw;
    display: block;
    padding-bottom: 3.2vw;
}
.answer--checkbox {
    display: none;
}
.answer--checkbox + label {
    padding: 3vw 0 3vw 10vw;
    position: relative;
    margin-right: 20px;
}
.answer--checkbox + label::before {
    content: '';
    display: block;
    position: absolute;
    top: 6vw;
    left: 2vw;
    width: 6vw;
    height: 6vw;
    border: 2px solid #eaeaeb;
    border-radius: 50%;
}
.answer--checkbox:checked + label {
    color: #d01137;
}
.answer--checkbox:checked + label::after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 3px;
    width: 11px;
    height: 11px;
    background: #d01137;
    border-radius: 50%;
}
.button {
    display: flex;
    justify-content: space-around;
    align-items: center;
    justify-items: center;
}
.answer--checkbox label p {
    padding-left: 3.2vw;
}
.serumIconImg {
    width: 25vw;
    height: 25vw;
    display: block;
}
.icon-img {
    position: relative;
    display: flex;
    justify-content: flex-end;
}
.discount-title {
    padding-bottom: 1rem;
    font-weight: bold;
    font-size: 2rem;
}
.product-img {
    display: flex;
}
.product-img > div {
    overflow: hidden;
}
.product-img img {
    width: 100%;
    height: 25rem;
    margin: -5rem 0;
    object-fit: cover;
}
.product-discount-price {
    display: flex;
}
.total-price {
    padding-top: 1rem;
    font-size: 1.2rem;
}
.product-price-discounted {
    padding-right: 2.1vw;
}
.product-content {
    padding: 1rem 5% 1rem 5%;
}
.product-price-discounted span {
    color: #000000;
}
.product-price {
    font-size: 1.6em;
    color: red;
}
img.recommend-item {
    object-fit: cover;
}
</style>
