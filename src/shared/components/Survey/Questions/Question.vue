<script lang="ts">
import {Vue, Component, Watch, Prop} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'
import questionDictionary from '@/shared/questionDictionary'
import StaggeredTransition from '@shared/components/StaggeredTransition.vue'
import Face from '@shared/components/AnimatedIcons/Faces/Face.vue'
import FaceFill from '@shared/components/AnimatedIcons/Faces/FaceFill.vue'
import TZoneFill from '@shared/components/AnimatedIcons/Faces/TZoneFill.vue'
import JawFill from '@shared/components/AnimatedIcons/Faces/JawFill.vue'
import EyesMouthFill from '@shared/components/AnimatedIcons/Faces/EyesMouthFill.vue'
import TempleFill from '@shared/components/AnimatedIcons/Faces/TempleFill.vue'
import TempleFillSm from '@shared/components/AnimatedIcons/Faces/TempleFillSm.vue'
import SinusDotted from '@shared/components/AnimatedIcons/Faces/SinusDotted.vue'
import CheekFill from '@shared/components/AnimatedIcons/Faces/CheekFill.vue'
import SinusStripped from '@shared/components/AnimatedIcons/Faces/SinusStripped.vue'
import ForeheadDotted from '@shared/components/AnimatedIcons/Faces/ForeheadDotted.vue'
import JawDotted from '@shared/components/AnimatedIcons/Faces/JawDotted.vue'
import TempleDotted from '@shared/components/AnimatedIcons/Faces/TempleDotted.vue'
import ChinDotted from '@shared/components/AnimatedIcons/Faces/ChinDotted.vue'
import CheekLinesFill from '@shared/components/AnimatedIcons/Faces/CheekLinesFill.vue'
import BrowsFill from '@shared/components/AnimatedIcons/Faces/BrowsFill.vue'
import ForeheadTopFill from '@shared/components/AnimatedIcons/Faces/ForeheadTopFill.vue'
import EyesFill from '@shared/components/AnimatedIcons/Faces/EyesFill.vue'
import FaceFillPurple from '@shared/components/AnimatedIcons/Faces/FaceFillPurple.vue'
import FaceDotted from '@shared/components/AnimatedIcons/Faces/FaceDotted.vue'
import BagsFill from '@shared/components/AnimatedIcons/Faces/BagsFill.vue'
import FaceFillGray from '@shared/components/AnimatedIcons/Faces/FaceFillGray.vue'
import Bed from '@shared/components/AnimatedIcons/Items/Bed.vue'
import Bubble from '@shared/components/AnimatedIcons/Items/Bubble.vue'
import Plate from '@shared/components/AnimatedIcons/Items/Plate.vue'
import Heart from '@shared/components/AnimatedIcons/Items/Heart.vue'
import Thoughts from '@shared/components/AnimatedIcons/Items/Thoughts.vue'
import LeaningHead from '@shared/components/AnimatedIcons/Items/LeaningHead.vue'

@Component({
    components: {
        StaggeredTransition,
        Face,
        FaceFill,
        TZoneFill,
        JawFill,
        EyesMouthFill,
        TempleFill,
        TempleFillSm,
        SinusDotted,
        CheekFill,
        SinusStripped,
        ForeheadDotted,
        JawDotted,
        TempleDotted,
        ChinDotted,
        CheekLinesFill,
        BrowsFill,
        ForeheadTopFill,
        EyesFill,
        FaceFillPurple,
        FaceDotted,
        BagsFill,
        FaceFillGray,
        Bed,
        Bubble,
        Plate,
        Heart,
        Thoughts,
        LeaningHead,
    },
})
export default class Question extends Vue {
    public name: string = 'Question'

    checkedAnswers: any[] = []
    editAnswer: boolean = false
    @State('survey') surveyState!: SurveyState

    get currentQuestion() {
        return this.$route.params.question
    }
    get currentQuestionLogical() {
        return parseInt(this.$route.params.question) - 1
    }
    get questionAnswers() {
        return questionDictionary[`q${this.currentQuestion}`].answers
    }
    get questionImages() {
        return questionDictionary[`q${this.currentQuestion}`].images
    }
    get clearAllAnswer() {
        return (
            questionDictionary[`q${this.currentQuestion}`].clearAllAnswer ||
            null
        )
    }
    get isMultiple() {
        return questionDictionary[`q${this.currentQuestion}`].multiple || false
    }
    get columns() {
        return questionDictionary[`q${this.currentQuestion}`].columns || 'col-2'
    }
    get survey() {
        return this.surveyState.survey_obj.selection
    }
    get questionType() {
        return questionDictionary[`q${this.currentQuestion}`].type || 'face'
    }

    @Watch('checkedAnswers')
    onCheckedAnswersChanged(val: any) {
        if (!this.isMultiple) {
            if (this.survey[`q${this.currentQuestion}`]) {
                //when an answer is deselected set editAnswer to true
                //so we can call updateAnswer if the same answer is choosen again
                if (val.length === 0) {
                    this.editAnswer = true
                }
                //updateAnswer will go to the next question if checkedAnswers isn't []
                //use editAnswer to block this the first time around as checkedAnswers may have a value
                if (this.editAnswer) {
                    this.$emit('update-answer', this.checkedAnswers)
                }
            } else {
                this.$emit('update-answer', this.checkedAnswers)
            }
        } else {
            this.$emit('update-answer', this.checkedAnswers)
        }
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
    isDisabled(answer) {
        if (this.isMultiple) return false
        if (this.checkedAnswers.length < 1) return false

        if (this.checkedAnswers.includes(answer)) {
            return false
        } else {
            return true
        }
    }
}
</script>

<template>
    <div
        v-if="questionType === 'image'"
        class="answer--section-image"
        :class="columns"
    >
        <div class="question--img item">
            <Component :is="questionImages[0]" />
        </div>
        <StaggeredTransition class="answers col-2">
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
                    :disabled="isDisabled(index.toString())"
                />
                <label
                    v-if="index.toString() !== clearAllAnswer"
                    :for="`q${currentQuestion}-a${index + 1}`"
                    class="answer--answer py-1"
                    @click="clearNone()"
                >
                    <span class="text-answer text-answer-center">
                        {{ answer }}
                    </span>
                </label>
                <label
                    v-else
                    :for="`q${currentQuestion}-a${index + 1}`"
                    class="answer--answer py-1"
                    @click.prevent="clearAnswers(index.toString())"
                >
                    <span class="text-answer text-answer-center">
                        {{ answer }}
                    </span>
                </label>
            </div>
        </StaggeredTransition>
    </div>
    <StaggeredTransition v-else class="answer--section mb-1" :class="columns">
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
                :disabled="isDisabled(index.toString())"
            />
            <label
                v-if="index.toString() !== clearAllAnswer"
                :for="`q${currentQuestion}-a${index + 1}`"
                class="answer--answer face-large"
                @click="clearNone()"
            >
                <Component :is="questionImages[index][0]" />
                <p class="text-answer">
                    {{ answer }}
                </p>
            </label>
            <label
                v-else
                :for="`q${currentQuestion}-a${index + 1}`"
                class="answer--answer face-large"
                @click.prevent="clearAnswers(index.toString())"
            >
                <Component :is="questionImages[index][0]" />
                <p class="text-answer">
                    {{ answer }}
                </p>
            </label>
        </div>
    </StaggeredTransition>
</template>
