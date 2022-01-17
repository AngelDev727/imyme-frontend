<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import questionDictionary from '@/shared/questionDictionary'
import Running from '@shared/components/AnimatedIcons/Sports/Running.vue'
import Yoga from '@shared/components/AnimatedIcons/Sports/Yoga.vue'
import Gym from '@shared/components/AnimatedIcons/Sports/Gym.vue'
import Weights from '@shared/components/AnimatedIcons/Sports/Weights.vue'
import Golf from '@shared/components/AnimatedIcons/Sports/Golf.vue'
import Cycling from '@shared/components/AnimatedIcons/Sports/Cycling.vue'
import Stretching from '@shared/components/AnimatedIcons/Sports/Stretching.vue'
import Workout from '@shared/components/AnimatedIcons/Sports/Workout.vue'
import Tennis from '@shared/components/AnimatedIcons/Sports/Tennis.vue'
import Swimming from '@shared/components/AnimatedIcons/Sports/Swimming.vue'

@Component({
    components: {
        Running,
        Yoga,
        Gym,
        Weights,
        Golf,
        Cycling,
        Stretching,
        Workout,
        Tennis,
        Swimming,        
    },
})
export default class ModalAnswer extends Vue {
    public name: string = 'ModalAnswer'

    @Prop({required: true, type: String}) answerName!: string
    @Prop({required: true, type: String}) image!: string
    @Prop({required: true, type: Boolean}) clear!: boolean
    @Prop({default: 0, type: Number}) index!: number
    @Prop({default: () => [], type: Array}) parentAnswers!: any[]
    showButtons: boolean = false
    selectedAnswers: any[] = []
    modalTop: number = 0

    get selectedClass() {
        if (this.index !== 11) {
            return {
                tooltip: this.showButtons,
                // 'answer--modal-answer__selected': this.showButtons,
                'answer--modal-answer__selected':
                    this.selectedAnswers.length > 1,
            }
        } else {
            if (this.parentAnswers.length > 0) {
                return {
                    tooltip: this.showButtons,
                    'answer--modal-answer__selected':
                        this.parentAnswers[0][0] === '11',
                }
            } else {
                return {
                    tooltip: this.showButtons,
                }
            }
        }
    }
    get selectedText() {
        if (this.selectedAnswers.length === 2) {
            return questionDictionary.q11.subAnswers[this.selectedAnswers[1]]
        }
        return null
    }

    @Watch('clear')
    onClearChanged() {
        if (this.clear == true) {
            this.clearAnswers()
        }
    }

    mounted() {
        if (this.parentAnswers.length > 0) {
            this.parentAnswers.forEach(answer => {
                if (answer[0] === this.index.toString()) {
                    this.selectedAnswers = answer
                }
            })
        }
    }

    clearAnswers() {
        this.selectedAnswers = []
    }

    selectedAns(answer) {
        this.selectedAnswers[1] == answer[1]
            ? this.clearAnswers()
            : (this.selectedAnswers = answer)
        //regardless we need to pass the answer to the parent so it can add/remove it from its checked answers array
        this.$emit('add-to-answers', answer)
    }

    showModal() {
        if (this.index !== 11) {
            this.showButtons = !this.showButtons
            this.$emit('show-backdrop', this.showButtons)
            this.modalTop =
                (this.$el as HTMLElement).offsetTop +
                (this.$el as HTMLElement).offsetHeight
        } else {
            this.selectedAnswers = ['11']
            this.$emit('clear-answers')
        }
    }

    setPosition() {
        if (
            this.index === 0 ||
            this.index === 3 ||
            this.index === 6 ||
            this.index === 9
        ) {
            return 'left'
        } else if (
            this.index === 1 ||
            this.index === 4 ||
            this.index === 7 ||
            this.index === 10
        ) {
            return 'center'
        } else {
            return 'right'
        }
    }
}
</script>

<template>
    <div
        class="answer--answer modal pointer"
        :class="selectedClass"
        @click.prevent="showModal"
    >
        <Component :is="image" v-if="image" />
        <span class="text-answer text-answer-center">
            {{ answerName }}
        </span>
        <span v-if="selectedText" class="text-answer text-answer-center">
            {{ selectedText }}
        </span>
        <transition answer-name="zoom" mode="in-out">
            <div
                v-if="showButtons"
                class="answer--section col-3"
                :class="setPosition()"
            >
                <div class="button">
                    <input
                        :id="'q15-' + answerName + '-1'"
                        v-model="selectedAnswers"
                        class="answer--checkbox"
                        type="radio"
                        :value="[index.toString(), '0']"
                    />
                    <label
                        :for="'q15-' + answerName + '-1'"
                        class="answer--answer answer--modal-answer"
                        @click="selectedAns([index.toString(), '0'])"
                    >
                        <p class="text-answer text-answer-center">
                            ほぼ毎日
                        </p>
                    </label>
                </div>
                <div class="button">
                    <input
                        :id="'q15-' + answerName + '-2'"
                        v-model="selectedAnswers"
                        class="answer--checkbox"
                        type="radio"
                        :value="[index.toString(), '1']"
                    />
                    <label
                        :for="'q15-' + answerName + '-2'"
                        class="answer--answer answer--modal-answer"
                        @click="selectedAns([index.toString(), '1'])"
                    >
                        <p class="text-answer text-answer-center">
                            週２、３回
                        </p>
                    </label>
                </div>
                <div class="button">
                    <input
                        :id="'q15-' + answerName + '-3'"
                        v-model="selectedAnswers"
                        class="answer--checkbox"
                        type="radio"
                        :value="[index.toString(), '2']"
                    />
                    <label
                        :for="'q15-' + answerName + '-3'"
                        class="answer--answer answer--modal-answer"
                        @click="selectedAns([index.toString(), '2'])"
                    >
                        <p class="text-answer text-answer-center">
                            月１回ほど
                        </p>
                    </label>
                </div>
            </div>
        </transition>
    </div>
</template>
