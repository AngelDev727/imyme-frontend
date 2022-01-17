<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import ProductPromotion from '@/imyme-app/components/Cart/ProductPromotion.vue'
import {isLoggedIn} from '@/shared/auth.js'
import {State, Getter} from 'vuex-class'
import {Results} from '@/shared/store/modules/survey/types'
import {CodProduct} from '@/shared/store/modules/checkout/types'

@Component({
    components: {
        ProductPromotion,
    },
})
export default class PromotionItemSelection extends Vue {
    public name: string = 'PromotionItemSelection'

    @State(state => state.checkout.rechargeObject) rechargeObject!: any | null
    @State(state => state.survey.results) results!: Results | null
    @State(state => state.checkout.userSubscriptions) userSubscriptions!:
        | any[]
        | null
    @State(state => state.checkout.userCodSubscriptions)
    userCodSubscriptions!: CodProduct[]
    @Getter('checkout/getPromotionIsInCart') getPromotionIsInCart
    @Getter('checkout/hasDiscounted') hasDiscounted
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes

    get recommendations() {
        return this.results ? this.results.recommends : null
    }
    get loggedIn() {
        return isLoggedIn()
    }
    get discountSoap() {
        return this.getRechargeObjectTypes.find(el => el == 'serum')
            ? '"石けん無料"'
            : '"石けん30%オフ"'
    }
    get selectDiscount() {
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

    selectedItem(item) {
        this.$emit('emitSelectedPromotion', item)
    }
}
</script>

<template>
    <div
        v-if="selectDiscount"
        id="promotion-section"
    >
        <section class="p-1 trialkit">
            <h3 class="mt-1 mb-2">
                今なら、"セラム30%オフ"または{{ discountSoap }}のどちらかをお選びいただけます。※初めてのお客様限定
            </h3>
            <div
                v-if="recommendations.serum && recommendations.serum[0]"
                class="my-1"
            >
                <ProductPromotion
                    :product="recommendations.serum[0]"
                    @emitSelectedItem="selectedItem"
                />
            </div>
            <div
                v-if="recommendations.soap && recommendations.soap[0]"
                class="my-1"
            >
                <ProductPromotion
                    :product="recommendations.soap[0]"
                    @emitSelectedItem="selectedItem"
                />
            </div>
        </section>
    </div>
</template>
<style scoped>
.trialkit h3 {
    font-size: 3.6vw;
    text-align: left;
}
</style>
