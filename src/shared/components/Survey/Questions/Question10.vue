<template>
    <div class="answer--section-image mb-1">
        <div class="question--img item">
            <Component :is="questionImages[0]" />
        </div>

        <StaggeredTransition class="answers col-2">
            <div
                v-for="(answer, index) in questionAnswers"
                :key="`answer${index}`"
                class="button answer-button relative"
            >
                <input
                    :id="`q${currentQuestion}-a${index + 1}`"
                    v-model="checkedAnswers"
                    class="answer--checkbox"
                    type="checkbox"
                    :value="index.toString()"
                    :disabled="isDisabled(index.toString())"
                />
                <label
                    :for="`q${currentQuestion}-a${index + 1}`"
                    class="answer--answer py-1"
                >
                    <span
                        class="text-answer text-answer-center absolute-top-left bg-body px-1"
                    >
                        {{ showNumber(index.toString()) }}
                    </span>
                    <span class="text-answer text-answer-center">
                        {{ answer }}
                    </span>
                </label>
            </div>
        </StaggeredTransition>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'
import questionDictionary from '@/shared/questionDictionary'
import StaggeredTransition from '@shared/components/StaggeredTransition.vue'

@Component({
    components: {
        StaggeredTransition,
        Plate: () => import('@shared/components/AnimatedIcons/Items/Plate.vue'),
    },
})
export default class Question10 extends Vue {
    public name: string = 'Question10'

    checkedAnswers: any[] = []
    @State('survey') surveyState!: SurveyState

    get currentQuestion() {
        return this.$route.params.question
    }
    get questionAnswers() {
        return questionDictionary[`q${this.currentQuestion}`].answers
    }
    get questionImages() {
        return questionDictionary[`q${this.currentQuestion}`].images
    }
    get survey() {
        return this.surveyState.survey_obj.selection
    }

    @Watch('checkedAnswers')
    onCheckedAnswersChanged() {
        if (this.checkedAnswers.length === 3) {
            this.$emit('update-answer', this.checkedAnswers)
        } else {
            this.$emit('update-answer', [])
        }
    }

    created() {
        if (this.survey[`q${this.currentQuestion}`]) {
            this.checkedAnswers = this.survey[`q${this.currentQuestion}`]
        }
    }
    isDisabled(answer) {
        if (this.checkedAnswers.length < 3) return false
        if (this.checkedAnswers.includes(answer)) {
            return false
        } else {
            return true
        }
    }
    showNumber(answer) {
        const index = this.checkedAnswers.findIndex(ans => {
            return answer == ans
        })
        return index == -1 ? null : index + 1
    }
}
</script>
<style>
    .answer--section-image .answers{
        height: 40%;
    }
</style>
