<template>
    <div class="answer--section col-3 mb-1 mt-1">
        <StaggeredTransition class="answer--section col-3 mb-1 mt-1">
            <div
                v-for="(answer, index) in questionAnswers"
                :key="`answer${index}`"
                class="button answer-button"
            >
                <input
                    :id="`q${currentQuestion}-a${index + 1}`"
                    v-model="checkedAnswers"
                    class="answer--checkbox"
                    type="checkbox"
                    :value="index.toString()"
                />
                <label
                    v-if="index.toString() !== clearAllAnswer"
                    :for="`q${currentQuestion}-a${index + 1}`"
                    class="answer--answer food"
                    @click="clearNone()"
                >
                    <Component
                        :is="questionImages[index][0]"
                        v-if="questionImages[index][0]"
                    />
                    <span
                        class="text-answer"
                        :class="
                            questionImages[index][0]
                                ? ''
                                : 'text-answer-center py-2'
                        "
                    >
                        {{ answer }}
                    </span>
                </label>
                <label
                    v-else
                    :for="`q${currentQuestion}-a${index + 1}`"
                    class="answer--answer food"
                    @click.prevent="clearAnswers(index.toString())"
                >
                    <Component
                        :is="questionImages[index][0]"
                        v-if="questionImages[index][0]"
                    />
                    <span
                        class="text-answer"
                        :class="
                            questionImages[index][0]
                                ? ''
                                : 'text-answer-center py-2'
                        "
                    >
                        {{ answer }}
                    </span>
                </label>
            </div>
        </StaggeredTransition>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'
import questionDictionary from '@/shared/questionDictionary'
import StaggeredTransition from '@shared/components/StaggeredTransition.vue'
import Sesame from '@shared/components/AnimatedIcons/Foods/Sesame.vue'
import Nuts from '@shared/components/AnimatedIcons/Foods/Nuts.vue'
import Kiwi from '@shared/components/AnimatedIcons/Foods/Kiwi.vue'
import Meats from '@shared/components/AnimatedIcons/Foods/Meats.vue'
import Orange from '@shared/components/AnimatedIcons/Foods/Orange.vue'
import Honey from '@shared/components/AnimatedIcons/Foods/Honey.vue'
import Rice from '@shared/components/AnimatedIcons/Foods/Rice.vue'
import Soybeans from '@shared/components/AnimatedIcons/Foods/Soybeans.vue'
import Shrimp from '@shared/components/AnimatedIcons/Foods/Shrimp.vue'
import Potato from '@shared/components/AnimatedIcons/Foods/Potato.vue'
import Apple from '@shared/components/AnimatedIcons/Foods/Apple.vue'
import Soba from '@shared/components/AnimatedIcons/Foods/Soba.vue'
import Fish from '@shared/components/AnimatedIcons/Foods/Fish.vue'
import Egg from '@shared/components/AnimatedIcons/Foods/Egg.vue'
import Milk from '@shared/components/AnimatedIcons/Foods/Milk.vue'

@Component({
    components: {
        StaggeredTransition,
        Sesame,
        Nuts,
        Kiwi,
        Meats,
        Orange,
        Honey,
        Rice,
        Soybeans,
        Shrimp,
        Potato,
        Apple,
        Soba,
        Fish,
        Egg,
        Milk,
    },
})
export default class Question7 extends Vue {
    public name: string = 'Question7'

    checkedAnswers: any[] = []
    @State('survey') surveyState!: SurveyState

    get currentQuestion() {
        return this.$route.params.question
    }
    get questionAnswers() {
        return questionDictionary.q7.answers
    }
    get questionImages() {
        return questionDictionary.q7.images
    }
    get clearAllAnswer() {
        if (this.currentQuestion == 'summary' || this.currentQuestion == '16')
            return null
        return (
            questionDictionary[`q${this.currentQuestion}`].clearAllAnswer ||
            null
        )
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
            this.checkedAnswers = this.survey[`q${this.currentQuestion}`]
        }
    }
    clearAnswers(index) {
        this.checkedAnswers = [index]
    }
    clearNone() {
        if (this.checkedAnswers.indexOf(this.clearAllAnswer) !== -1) {
            this.checkedAnswers.splice(
                this.checkedAnswers.indexOf(this.clearAllAnswer),
                1,
            )
        }
    }
}
</script>
<style>
@media only screen and (min-width: 1027px) {
    .answer--section.col-3 .button{
        width: 22%;
    }
}
</style>
