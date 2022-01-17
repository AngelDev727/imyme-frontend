<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import ResultsProduct from '@app/components/Product/ResultsProduct.vue'
import EssenceModal from '@shared/components/EssenceModal.vue'
import {State} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'
import ResultsSerums from '@app/components/Product/ResultsSerums.vue'
import MyStats from '@app/components/MyPage/MyStats.vue'

@Component({
    components: {
        ResultsProduct,
        EssenceModal,
        ResultsSerums,
        MyStats,
    },
})
export default class ProductSection extends Vue {
    public name: string = 'ProductSection'

    @State('survey') surveyState!: SurveyState

    get recommendations() {
        return this.surveyState.results
            ? this.surveyState.results.recommends
            : null
    }
}
</script>

<template>
    <div v-if="recommendations">
        <ResultsSerums :product="recommendations.serum" />
        <MyStats v-if="surveyState.answerId" />

        <div
            v-if="recommendations.serum && recommendations.serum[0]"
            class="results-product-area"
            id="my_serum_area"
        >
            <ResultsProduct :product="recommendations.serum" />
        </div>
        <div
            v-if="recommendations.soap && recommendations.soap[0]"
            class="results-product-area"
            id="my_soap_area"
        >
            <ResultsProduct :product="recommendations.soap" />
        </div>
        <EssenceModal />
    </div>
</template>
<style scoped>
.results-product-area {
    background-color: #f0f3f7;
}
</style>
