<template>
    <span>
        <StaggeredTransition class="answer--section col-2 mb-1 mt-2">
            <div
                v-for="(answer, index) in questionAnswers"
                :key="`answer${index}`"
                class="button answer-button relative"
            >
                <div class="answer--checkbox" />
                <modal-answer
                    :answer-name="answer"
                    :image="questionImages[index][0]"
                    :index="index"
                    :clear="clear"
                    :parent-answers="checkedAnswers"
                    @add-to-answers="addToAnswers"
                    @show-backdrop="showBackdrop"
                    @clear-answers="clearAnswers"
                    @reset-answers="resetAnswers"
                />
            </div>
        </StaggeredTransition>
        <transition name="fade" mode="out-in">
            <div v-if="backdrop" class="backdrop" />
        </transition>
    </span>
</template>

<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'
import ModalAnswer from '@shared/components/Survey/Questions/ModalAnswerQ1.vue'
import questionDictionary from '@/shared/questionDictionary'
import StaggeredTransition from '@shared/components/StaggeredTransition.vue'
import FaceFill from '@shared/components/AnimatedIcons/Faces/FaceFill.vue'

@Component({
    components: {
        StaggeredTransition,
        ModalAnswer,
        FaceFill,
    },
})
export default class Question1 extends Vue {
    checkedAnswers: any[] = []
    clear: boolean = false
    backdrop: boolean = false
    create: boolean = false
    @State('survey') surveyState!: SurveyState

    get currentQuestion() {
        return this.$route.params.question
    }
    get questionAnswers() {
        return questionDictionary.q1.answers
    }
    get questionImages() {
        return questionDictionary.q1.images
    }
    get survey() {
        return this.surveyState.survey_obj.selection
    }

    @Watch('checkedAnswers', {immediate: false})
    onCheckedAnswersChanged(val: any) {
        if (!this.create) {
            this.$emit('update-answer', this.checkedAnswers)
        }
        this.create = false
    }

    created() {
        if (this.survey[`q${this.currentQuestion}`]) {
            this.checkedAnswers = this.survey[
                `q${this.currentQuestion}`
            ].map(a => [...a])
            this.create = true
        }
    }
    clearAnswers() {
        this.checkedAnswers = [['2']]
        this.clear = true
        this.backdrop = false
    }
    resetAnswers() {
        this.checkedAnswers = []
        this.create = true
        this.backdrop = false
    }
    clearNone() {
        this.checkedAnswers = this.checkedAnswers.filter(a => {
            if (a[0] !== '2') {
                return a
            }
        })
        this.clear = false
    }
    addToAnswers(answer) {
        let addFlag = true

        this.clearNone()
        this.checkedAnswers = []
        this.checkedAnswers.push(answer)

        this.backdrop = false
    }
    showBackdrop(show) {
        this.backdrop = show
    }
}
</script>
