<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State, Action, Mutation} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'
import questionDictionary from '@/shared/questionDictionary'
import QuestionNumber from '@shared/components/Survey/QuestionNumber.vue'
import PageTransition from '@shared/components/PageTransition.vue'
import {SurveyObject} from '@/shared/store/modules/survey/types'
import {User} from '@/shared/store/modules/user/types'

@Component({
    components: {
        SurveyStart: () => import('@shared/components/Survey/SurveyStart.vue'),
        Question: () =>
            import('@shared/components/Survey/Questions/Question.vue'),
        Question1: () =>
            import('@shared/components/Survey/Questions/Question1.vue'),
        Question2: () =>
            import('@shared/components/Survey/Questions/Question2.vue'),
        Question7: () =>
            import('@shared/components/Survey/Questions/Question7.vue'),
        Question10: () =>
            import('@shared/components/Survey/Questions/Question10.vue'),
        Question11: () =>
            import('@shared/components/Survey/Questions/Question11.vue'),
        Question15: () =>
            import('@shared/components/Survey/Questions/Question15.vue'),
        SurveySummary: () =>
            import('@shared/components/Survey/SurveySummary.vue'),
        QuestionNumber,
        PageTransition,
    },
})
export default class Survey extends Vue {
    public name: string = 'Questions'

    readonly questionCount: number = 15
    checkedAnswers: any[] = []
    @State('survey') surveyState!: SurveyState
    @Mutation('survey/SET_EDITED') setEdited
    @Action('survey/addToSurvey') addToSurveyState
    @State(state => state.user.user) user!: User
    @State(state => state.survey.survey_obj) surveyObject!: SurveyObject
    @Action('survey/setAnswers') setAnswers

    get currentQuestion(): string {
        return this.$route.params.question
    }
    get sectionStyle() {
        return parseInt(this.currentQuestion) === 16 ||
            this.currentQuestion === 'summary'
            ? 'questions summary'
            : 'questions'
    }
    get questionText() {
        if (parseInt(this.currentQuestion) <= this.questionCount) {
            if (
                this.isMultipleChoice &&
                parseInt(this.currentQuestion) !== 15
            ) {
                return (
                    questionDictionary[
                        `q${this.currentQuestion}`
                    ].question.replace(
                        '\t',
                        `<span class="bg-body underline">&nbsp;</span>`,
                    ) +
                    `${
                        questionDictionary[`q${this.currentQuestion}`]
                            .multiple === 3
                            ? `<small><b>3</b> つ選択してください。</small>`
                            : `<small>複数回答可</small>`
                    }`
                )
            } else {
                return questionDictionary[
                    `q${this.currentQuestion}`
                ].question.replace(
                    '\t',
                    `<span class="bg-body underline">&nbsp;</span>`,
                )
            }
        } else {
            return ''
        }
    }
    get currentComponent() {
        if (this.currentQuestion === 'start') {
            return `surveyStart`
        } else if (parseInt(this.currentQuestion) <= this.questionCount) {
            return questionDictionary[`q${this.currentQuestion}`].component
        } else {
            return `surveySummary`
        }
    }
    get answerCount() {
        return Object.keys(this.surveyState.survey_obj.selection).length
    }
    get isMultipleChoice() {
        if (questionDictionary[`q${this.currentQuestion}`]) {
            return !!questionDictionary[`q${this.currentQuestion}`].multiple
        }
        return false
    }
    get transitionMode() {
        if (
            this.currentQuestion === 'start' ||
            parseInt(this.currentQuestion) === 15
        ) {
            return 'fade'
        } else {
            return 'slide'
        }
    }

    updateAnswer(newAnswer) {
        this.checkedAnswers = newAnswer
        if (!this.isMultipleChoice) {
            this.nextQuestion(this.checkedAnswers)
        }
    }
    nextQuestion(answer) {
        if (answer.length !== 0) {
            this.setEdited(true)
            if (parseInt(this.currentQuestion) <= this.questionCount) {
                const nextQuestionNumber = parseInt(this.currentQuestion) + 1
                this.addToSurvey(answer, parseInt(this.currentQuestion) - 1)
                this.checkedAnswers = []
                if (this.surveyState.answerId != null) {
                    this.$router.push({
                        name: 'survey',
                        params: {question: 'summary'},
                    })
                } else if (this.answerCount < this.questionCount) {
                    this.$router.push({
                        name: 'survey',
                        params: {question: nextQuestionNumber.toString()},
                    })
                } else {
                    this.submitAnswers()
                }
            }
        } else {
            this.addToSurvey(answer, parseInt(this.currentQuestion) - 1)
            this.checkedAnswers = []
        }
    }
    addToSurvey(answer, number) {
        this.addToSurveyState({
            answer: answer,
            questionNumber: number,
        })
    }
    previousQuestion() {
        const previousQuestionNumber = parseInt(this.currentQuestion) - 1
        this.checkedAnswers = []
        if (parseInt(this.currentQuestion) > 1) {
            this.$router.push({
                name: 'survey',
                params: {question: previousQuestionNumber.toString()},
            })
        }
    }
    async submitAnswers() {
        const answers = await this.setAnswers({
            customerId: this.user ? this.user.id : null,
            answers: this.surveyObject.selection,
        })
        sessionStorage.setItem('results', JSON.stringify(answers))
    }
}
</script>

<template>
    <div
        v-if="currentQuestion"
        :id="`q${currentQuestion}`"
        :class="sectionStyle"
    >
        <div class="survey-background" />
        <SurveyStart v-if="answerCount == 0" />
        <div style="height:13.5em;">
            <transition name="fade" mode="out-in">
                <h3
                    v-if="currentQuestion <= questionCount"
                    class="question--count"
                >
                    <QuestionNumber
                        :current-question="currentQuestion"
                        :question-count="questionCount"
                    />
                </h3>
            </transition>
            <transition name="fade" mode="out-in">
                <div
                    v-if="questionText"
                    class="question--question top"
                    v-html="questionText"
                />
            </transition>
        </div>
        <PageTransition :show-splash="false" :t-name="transitionMode">
            <Component
                :is="currentComponent"
                :key="currentQuestion"
                @update-answer="updateAnswer"
            />
        </PageTransition>
        <div class="question-action-buttons">
            <span class="previous--question--button">
                <button
                    v-if="
                        currentQuestion <= questionCount && currentQuestion != 1
                    "
                    class="btn-circle m-auto"
                    @click="previousQuestion()"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-back" />
                    </svg>
                </button>
            </span>
            <span class="next--question--button">
                <!-- <router-link
                    v-if="currentQuestion === 'start'"
                    tag="button"
                    class="btn-survey-start bt-1"
                    :to="{name: 'survey', params: {question: 1}}"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-forward" />
                    </svg>
                    <span class="m-auto">start</span>
                </router-link> -->
                <button
                    v-if="currentQuestion <= questionCount && isMultipleChoice"
                    :disabled="checkedAnswers.length === 0"
                    class="btn-start bt-1"
                    @click="nextQuestion(checkedAnswers)"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-forward" />
                    </svg>
                    <span class="m-auto">OK</span>
                </button>
            </span>
        </div>
    </div>
</template>
<style>
span.answer_title {
    font-size: 0.4em;
}
@media only screen and (max-width: 376px) {
    .answer--section-image {
        height: 77vh;
        margin-top: 5rem;
    }
    .question-action-buttons {
        position: absolute;
    }
    .answer--section-image .answers {
        height: 40%;
    }
    .question-top-icon {
        width: 40%;
    }
}
@media only screen and (max-width: 376px) {
    .answer--section-image {
        height: 77vh;
        margin-top: 5rem;
    }
    .question-action-buttons {
        margin-top: 5%;
    }
}
@media only screen and (max-width: 413px) {
    .answer--section-image {
        height: 68vh;
        margin-top: 3vh;
    }
    .question-action-buttons {
        margin-top: 5%;
    }
}
@media only screen and (max-width: 413px) {
    .answer--section-image {
        height: 72vh;
        margin-top: 5vh;
    }
}
@media only screen and (min-width: 414px) {
    .answer--section-image {
        height: 67vh;
        margin-top: 5vh;
    }
}
@media only screen and (min-width: 768px) and (max-width: 1026px) {
    .answer--section-image {
        height: 57vh;
        margin-top: 5vh;
        padding: 0 15%;
    }
}

@media only screen and (min-width: 1027px) {
    .answer--section-image {
        height: 70vh;
        margin-top: 5vh;
    }
    .question-top-icon {
        width: 30%;
    }
    .answer--section.col-3 .button {
        width: 25%;
    }
}

@media only screen and (min-width: 1027px) {
    .answer--section-image {
        height: 97vh;
        margin-top: 5vh;
    }
}

@media only screen and (max-height: 628px) {
    #q8 .answer--section-image,
    #q9 .answer--section-image,
    #q10 .answer--section-image,
    #q12 .answer--section-image,
    #q13 .answer--section-image,
    #q14 .answer--section-image {
        height: max-content;
    }
    #q15 .answer--section-image {
        height: 80vh;
    }
    .question-action-buttons {
        margin-bottom: 0;
        padding-bottom: 5%;
        position: relative;
        bottom: 0;
    }
}

@media only screen and (max-height: 628px) and (max-width: 1026px) {
    #q15 .answer--section-image {
        height: 450px;
    }
}
@media only screen and (max-height: 628px) and (max-width: 376px) {
    #q15 .answer--section-image {
        height: 400px;
    }
}
</style>
