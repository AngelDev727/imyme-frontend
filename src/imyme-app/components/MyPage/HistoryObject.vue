<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import MySkinType from '@shared/components/MyPage/MySkinType.vue'
import MyLifeBalance from '@shared/components/MyPage/MyLifeBalance.vue'
import MyAdvice from '@shared/components/MyPage/MyAdvice.vue'
import MyAnswers from '@shared/components/MyAnswers.vue'
import Product from '@shared/components/Product.vue'
import {Action, Getter, State} from 'vuex-class'
import {Results} from '@/shared/store/modules/survey/types'

@Component({
    components: {
        MySkinType,
        MyLifeBalance,
        MyAdvice,
        MyAnswers,
        Product,
    },
})
export default class HistoryObject extends Vue {
    public name: string = 'HistoryObject'

    @Prop({type: Object, default: () => {}}) answer: any
    @State(state => state.survey.results) results!: Results | null
    @Action('application/loadingPromiseAdd') loadingPromiseAdd
    @Action('products/getProductPrice') getProductPrice
    @Action('products/getProductByRemoteId') getProductByRemoteId
    @Action('products/getProductInfo') getProductInfo
    @Action('tablet/getRecipe') getRecipe
    @Getter('survey/nickName') userName

    truncate: boolean = false
    productInfo: any = null
    products: any = []
    soapInfo: any = null
    soaps: any = []

    get allAdvice() {
        const {
            detailAdvice1,
            detailAdvice2,
            sensitivityAdvice,
            skinTypeAdvice,
            zoneAdvice1,
            zoneAdvice2,
            zoneAdviceId,
        } = this.results as Results
        return {
            detailAdvice1,
            detailAdvice2,
            sensitivityAdvice,
            skinTypeAdvice,
            zoneAdvice1,
            zoneAdvice2,
            zoneAdviceId,
        }
    }

    // only need to watch because on sign in results might not be fetched until after created (there may be a better solution)
    @Watch('results')
    async onResultsChange() {
        this.loadingPromiseAdd([await this.getInfo(this.results)])
    }

    async created() {
        this.loadingPromiseAdd([await this.getInfo(this.results)])
    }
    async getInfo(results) {
        if (results) {
            if (results.recommends.serum) {
                this.products = []
                results.recommends.serum.forEach(async serum => {
                    const storageItem = sessionStorage.getItem(serum.id)
                    if (!storageItem) {
                        this.productInfo = await this.getProductInfo(serum.id)
                    } else {
                        this.productInfo = JSON.parse(storageItem)
                    }
                    this.productInfo.serumType = serum.type
                    this.products.push(this.productInfo)
                })
            }
            if (results.recommends.soap) {
                this.soaps = []
                results.recommends.soap.forEach(async soap => {
                    const storageItem = sessionStorage.getItem(soap.id)
                    if (!storageItem) {
                        this.soapInfo = await this.getProductInfo(soap.id)
                    } else {
                        this.soapInfo = JSON.parse(storageItem)
                    }
                    this.soapInfo.image = this.soapInfo.images.edges[0].node.originalSrc
                    this.soaps.push(this.soapInfo)
                })
            }
        }
    }

    toggleTruncate() {
        this.truncate = !this.truncate
    }
}
</script>

<template>
    <div v-if="results">
        <h3 class="pt-2">{{ userName }}のマイページ</h3>
        <section class="p-1 mb-2">
            <h3 class="py-1 text-subheading" @click="toggleTruncate">
                分析履歴
            </h3>
            <div class="bg-body">
                <MySkinType
                    v-if="results"
                    class="m-0 bg-body"
                    :show-header="false"
                    :created-at="results.createdAt"
                    :skin="{
                        type: results.skinType,
                        sensitivity: results.sensitivity,
                        spot: results.spot,
                        acne: results.acne,
                        wrinkle: results.wrinkle,
                    }"
                />
            </div>
        </section>
        <MyLifeBalance
            :subcategory="true"
            :life-balance="{
                stress: results.stress,
                mental: results.mentality,
                excercise: results.excercise,
                diet: results.eatingHabit,
                sleep: results.sleep,
            }"
            :radar-chart-context="`radar-chart-history-${results.id}`"
        />
        <MyAdvice
            :subcategory="true"
            :advice="allAdvice"
            :skin="{
                type: results.skinType,
                sensitivity: results.sensitivity,
                spot: results.spot,
                acne: results.acne,
                wrinkle: results.wrinkle,
            }"
        />
        <MyAnswers :subcategory="true" :data="answer" :can-edit="false" />
        <section v-if="results && results.recommends" class="p-1 mb-2">
            <h3 class="pt-1 pb-2">あなたにぴったりのimyme</h3>
            <Product
                v-if="productInfo && productInfo.logo"
                :product="products"
            />
            <Product
                v-if="soapInfo && soapInfo.image"
                :product="soaps"
                class="mt-1"
            />
            <router-link
                class="btn btn-blue w-70 mx-auto m-1"
                :to="{name: 'results'}"
            >
                <span class="m-auto">おすすめを全て見る</span>
            </router-link>
        </section>
    </div>
</template>

<style scoped>
h3 {
    text-transform: none;
}
.w-70 {
    width: 70vw;
}
</style>
