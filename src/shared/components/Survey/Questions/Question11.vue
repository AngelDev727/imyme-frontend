<template>
    <span>
        <StaggeredTransition class="answer--section col-3 mb-1 mt-2">
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
import ModalAnswer from '@shared/components/Survey/Questions/ModalAnswer.vue'
import questionDictionary from '@/shared/questionDictionary'
import StaggeredTransition from '@shared/components/StaggeredTransition.vue'

@Component({
    components: {
        StaggeredTransition,
        ModalAnswer,
    },
})
export default class Question11 extends Vue {
    checkedAnswers: any[] = []
    clear: boolean = false
    backdrop: boolean = false
    @State('survey') surveyState!: SurveyState

    get currentQuestion() {
        return this.$route.params.question
    }
    get questionAnswers() {
        return questionDictionary.q11.answers
    }
    get questionImages() {
        return questionDictionary.q11.images
    }
    get survey() {
        return this.surveyState.survey_obj.selection
    }

    @Watch('checkedAnswers')
    onCheckedAnswersChanged() {
        this.$emit('update-answer', this.checkedAnswers)
    }

    created() {
        if (this.survey[`q${this.currentQuestion}`]) {
            this.checkedAnswers = this.survey[`q${this.currentQuestion}`].map(
                a => [...a],
            )
        }
    }
    clearAnswers() {
        this.checkedAnswers = [['11']]
        this.clear = true
        this.backdrop = false
    }
    clearNone() {
        this.checkedAnswers = this.checkedAnswers.filter(a => {
            if (a[0] !== '11') {
                return a
            }
        })
        this.clear = false
    }
    addToAnswers(answer) {
        let addFlag = true

        //remove none if it's in the array
        this.clearNone()

        //replace sport time if sport already exsists in array
        this.checkedAnswers.forEach(a => {
            if (a[0] === answer[0]) {
                a[1] = answer[1]
                addFlag = false
            }
        })

        //remove sport time if sport time already exsists in array
        this.checkedAnswers.forEach((a, index) => {
            if (a[0] === answer[0] && a[1] === answer[1]) {
                this.checkedAnswers.splice(index, 1)
                this.checkedAnswers = this.checkedAnswers
                addFlag = false
            }
        })

        //add sport if it isn't in the array
        if (addFlag) {
            this.checkedAnswers.push(answer)
        }

        this.backdrop = false
    }
    showBackdrop(show) {
        this.backdrop = show
    }
}
</script>
