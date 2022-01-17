<script lang="ts">
import questionDictionary from '@/shared/questionDictionary'
import staggeredTransition from '@/shared/components/StaggeredTransition.vue'
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

@Component({
    components: {
        staggeredTransition,
    },
})
export default class FormattedAnswers extends Vue {
    public name: string = 'FormattedAnswers'

    @Prop({type: Boolean, default: true}) canEdit!: boolean
    @Prop({type: Object, default: null}) answers!: object | null

    get survey() {
        return this.$store.state.survey.survey_obj.selection
    }

    @Watch('survey', {immediate: true, deep: true})
    onPersonChanged1() {
        return this.$store.state.survey.survey_obj.selection
    }

    formatAnswer(index, answer) {
        if (!answer) return '_____'
        if (!index) return

        let formattedAnswer = ''

        if (index === 1 || index === 2 || index === 11) {
            answer.forEach(a => {
                formattedAnswer +=
                    questionDictionary[`q${index}`].answers[a[0]] + '、'
                if (questionDictionary[`q${index}`].subAnswers[a[1]]) {
                    formattedAnswer +=
                        questionDictionary[`q${index}`].subAnswers[a[1]] + '、'
                }
            })
        } else {
            answer.forEach(a => {
                formattedAnswer +=
                    questionDictionary[`q${index}`].answers[a] + '、'
            })
        }

        return formattedAnswer.substring(0, formattedAnswer.length - 1)
    }
    answerText(index) {
        return questionDictionary[`q${index}`].question.replace(
            '\t',
            `${this.formatAnswer(index, this.survey[`q${index}`])}`,
        )
    }
    changeAnswer(questionNum) {
        if (this.canEdit) {
            this.$store.commit('survey/SET_EDITED', true)
            this.$router.push({
                name: 'survey',
                params: {question: questionNum},
            })
        }
    }
}
</script>

<template>
    <div class="answer-summary pb-2 max-w">
        <staggeredTransition>
            <div v-for="index in 15" :key="`summary-item-${index}`">
                <span
                    v-if="index < 15"
                    class="answer-summary--item"
                    :class="{
                        'answer-summary--error':
                            !survey[`q${index}`] ||
                            survey[`q${index}`].length == 0,
                    }"
                >
                    <span class="answer-summary--number">Q{{ index }}</span>
                    <span
                        class="answer-summary--ans px-1"
                        @click="changeAnswer(index)"
                        v-html="answerText(index)"
                    />
                    <span
                        v-if="canEdit"
                        class="answer-summary--return px-1 pt-1"
                    >
                        <svg class="icon-stroke icon-btn">
                            <use xlink:href="#icon-return" />
                        </svg>
                    </span>
                </span>
                <span
                    v-else
                    class="answer-summary--item"
                    :class="{
                        'answer-summary--error':
                            !survey[`q${index}`] ||
                            survey[`q${index}`].length == 0,
                    }"
                >
                    <span class="answer-summary--number">Q{{ index }}</span>
                    <span
                        class="answer-summary--ans-15 px-1"
                        @click="changeAnswer(index)"
                    >
                        <span>
                            私の名前は{{
                                survey[`q${15}`]
                                    ? survey[`q${15}`][1]
                                    : '_____'
                            }}で、
                        </span>
                        <br />
                        <span>
                            {{
                                survey[`q${15}`]
                                    ? survey[`q${15}`][2]
                                    : '_____'
                            }}年{{
                                survey[`q${15}`]
                                    ? survey[`q${15}`][3]
                                    : '_____'
                            }}月生まれ。
                        </span>
                        <br />
                        <span>
                            性別は{{
                                survey[`q${15}`]
                                    ? survey[`q${15}`][0]
                                    : '_____'
                            }}です。
                        </span>
                    </span>
                    <span
                        v-if="canEdit"
                        class="answer-summary--return py-5 px-1"
                    >
                        <svg class="icon-stroke icon-btn">
                            <use xlink:href="#icon-return" />
                        </svg>
                    </span>
                </span>
            </div>
        </staggeredTransition>
    </div>
</template>
