<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import questionDictionary from '@/shared/questionDictionary'
import FaceFill from '@shared/components/AnimatedIcons/Faces/FaceFill.vue'
import Face from '@shared/components/AnimatedIcons/Faces/Face.vue'
import JawFill from '@shared/components/AnimatedIcons/Faces/JawFill.vue'
import EyesMouthFill from '@shared/components/AnimatedIcons/Faces/EyesMouthFill.vue'
import TempleFill from '@shared/components/AnimatedIcons/Faces/TempleFill.vue'

@Component({
    components: {
        FaceFill,
        Face,
        JawFill,
        EyesMouthFill,
        TempleFill,
    },
})
export default class ModalAnswerQ2 extends Vue {
    public name: string = 'ModalAnswerQ2'

    @Prop({required: true, type: String}) answerName!: string
    @Prop({required: true, type: String}) image!: string
    @Prop({required: true, type: Boolean}) clear!: boolean
    @Prop({default: 0, type: Number}) index!: number
    @Prop({default: () => [], type: Array}) parentAnswers!: any[]
    showButtons: boolean = false
    selectedAnswers: any[] = []
    modalTop: number = 0

    get selectedClass() {
        if (this.index !== 4) {
            return {
                tooltip: this.showButtons,
                'answer--modal-answer__selected':
                    this.selectedAnswers.length > 1,
            }
        } else {
            if (this.parentAnswers.length > 0) {
                return {
                    tooltip: this.showButtons,
                    'answer--modal-answer__selected':
                        this.parentAnswers[0][0] === '4',
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
            return questionDictionary.q2.subAnswers[this.selectedAnswers[1]]
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
        if (this.selectedAnswers[1] === answer[1]) {
            this.clearAnswers()
            return
        } else {
            this.selectedAnswers = answer
        }
        //regardless we need to pass the answer to the parent so it can add/remove it from its checked answers array
        this.$emit('add-to-answers', answer)
    }

    showModal() {
        if (this.index !== 4) {
            this.showButtons = !this.showButtons
            this.$emit('show-backdrop', this.showButtons)
            this.modalTop =
                (this.$el as HTMLElement).offsetTop +
                (this.$el as HTMLElement).offsetHeight
        } else {
            if (this.parentAnswers[0] == '4') {
                this.selectedAnswers = []
                this.$emit('reset-answers')
                return
            }
            this.selectedAnswers = ['4']
            this.$emit('clear-answers')
        }
    }

    setPosition() {
        if (this.index === 0) {
            return 'left'
        } else if (this.index === 2) {
            return 'right'
        } else {
            return 'center'
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
                        :id="'q1-' + answerName + '-1'"
                        v-model="selectedAnswers"
                        class="answer--checkbox"
                        type="radio"
                        :value="[index.toString(), '0']"
                    />
                    <label
                        :for="'q1-' + answerName + '-1'"
                        class="answer--answer answer--modal-answer"
                        @click="selectedAns([index.toString(), '0'])"
                    >
                        <p class="text-answer text-answer-center">
                            つっぱる
                        </p>
                    </label>
                </div>
                <div class="button">
                    <input
                        :id="'q2-' + answerName + '-2'"
                        v-model="selectedAnswers"
                        class="answer--checkbox"
                        type="radio"
                        :value="[index.toString(), '1']"
                    />
                    <label
                        :for="'q2-' + answerName + '-2'"
                        class="answer--answer answer--modal-answer"
                        @click="selectedAns([index.toString(), '1'])"
                    >
                        <p class="text-answer text-answer-center">
                            少しカサつく
                        </p>
                    </label>
                </div>
            </div>
        </transition>
    </div>
</template>
