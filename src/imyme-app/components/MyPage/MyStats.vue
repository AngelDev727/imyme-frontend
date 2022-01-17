<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import dayjs from 'dayjs'
import MySkinType from '@shared/components/MyPage/MySkinType.vue'
import MyLifeBalance from '@shared/components/MyPage/MyLifeBalance.vue'
import MyAdvice from '@shared/components/MyPage/MyAdvice.vue'
import MyAnswers from '@shared/components/MyAnswers.vue'
import {State, Getter} from 'vuex-class'
import {SurveyState, Results} from '../../../shared/store/modules/survey/types'

@Component({
    components: {
        MySkinType,
        MyLifeBalance,
        MyAdvice,
        MyAnswers,
    },
})
export default class MyStats extends Vue {
    public name: string = 'MyStats'

    @State('survey') surveyState!: SurveyState
    @Getter('survey/nickName') userName

    get results(): Results | null {
        return this.surveyState.results
    }
    get createdAt() {
        return this.surveyState.createdAt || dayjs().format('YYYY.MM.DD')
    }
    get answer() {
        return this.surveyState.survey_obj
    }

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
}
</script>

<template>
    <div v-if="results" id="my-stats">
        <h3 class="lh-1 ls-1">
            {{ userName }}<br />の肌分析結果
            <br />
        </h3>
        <div class="bg-body w-90">
            <h4 class="w-90">{{ createdAt }}</h4>
            <MySkinType
                :skin="{
                    type: results.skinType,
                    sensitivity: results.sensitivity,
                    spot: results.spot,
                    acne: results.acne,
                    wrinkle: results.wrinkle,
                }"
            />
            <div class="partition" />
            <MyLifeBalance
                :life-balance="{
                    stress: results.stress,
                    mental: results.mentality,
                    excercise: results.excercise,
                    diet: results.eatingHabit,
                    sleep: results.sleep,
                }"
                :show-header="false"
                :radar-chart-context="'radar-chart'"
            />
            <div class="partition" />
            <MyAdvice
                :advice="allAdvice"
                :skin="{
                    type: results.skinType,
                    sensitivity: results.sensitivity,
                    spot: results.spot,
                    acne: results.acne,
                    wrinkle: results.wrinkle,
                }"
            />
            <div class="partition" />
            <MyAnswers v-if="answer" :data="answer" :need-format="false" />
        </div>
    </div>
</template>
<style scoped>
#my-stats {
    padding-bottom: 4rem;
    background-color: #dbe3ec;
}
h3 {
    font-size: 2.8rem;
    line-height: 5.6rem;
    padding: 3.5rem 0;
    text-transform: none;
}
h4 {
    margin: auto;
    margin-bottom: 3rem;
    padding: 4rem 0 3rem;
    border-bottom: 2px solid #888;
    text-align: center;
    font-size: 2.2rem;
}
.bg-body {
    margin: auto;
}
.partition {
    height: 1rem;
    background-color: #dbe3ec;
}
</style>
<style>
#my-stats section {
    margin: 0 !important;
    background-color: #fff;
}
#my-stats section > .text-subheading {
    font-size: 2.6rem;
}
</style>
