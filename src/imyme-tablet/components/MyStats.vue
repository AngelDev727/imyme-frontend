<script>
import MySkinType from '@shared/components/MyPage/MySkinType'
import MyLifeBalance from '@shared/components/MyPage/MyLifeBalance'
import MyAdvice from '@shared/components/MyPage/MyAdvice'
import MyAnswers from '@shared/components/MyAnswers'

export default {
    name: 'MyStats',

    components: {
        MySkinType,
        MyLifeBalance,
        MyAdvice,
        MyAnswers,
    },

    data() {
        return {
            toggle: false,
        }
    },

    computed: {
        allAdvice() {
            let {
                detailAdvice1,
                detailAdvice2,
                sensitivityAdvice,
                skinTypeAdvice,
                zoneAdvice1,
                zoneAdvice2,
                zoneAdviceId,
            } = this.results
            return {
                sensitivityAdvice,
                skinTypeAdvice,
                zoneAdvice1,
                zoneAdvice2,
                zoneAdviceId,
            }
        },
        results() {
            return this.$store.state.survey.results
        },
        answer() {
            return this.$store.state.survey.survey_obj
        },
    },

    methods: {
        resizeContainer(status) {
            this.toggle = status
        },
    },
}
</script>

<template>
    <div v-if="results" id="my-stats">
        <div class="results-group">
            <MySkinType
                :skin="{
                    type: results.skinType,
                    sensitivity: results.sensitivity,
                    spot: results.spot,
                    acne: results.acne,
                    wrinkle: results.wrinkle,
                }"
                :show-prefix="false"
                :score-cap="10"
            />
            <MyLifeBalance
                :life-balance="{
                    stress: results.stress,
                    mental: results.mentality,
                    excercise: results.excercise,
                    diet: results.eatingHabit,
                    sleep: results.sleep,
                }"
                :show-prefix="false"
            />
        </div>
        <MyAdvice
            :advice="allAdvice"
            :skin="{
                type: results.skinType,
                sensitivity: results.sensitivity,
                spot: results.spot,
                acne: results.acne,
                wrinkle: results.wrinkle,
            }"
            @toggle="resizeContainer"
        />
        <MyAnswers v-if="answer" :data="answer" />
    </div>
</template>
