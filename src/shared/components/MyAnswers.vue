<template>
    <section class="p-1 mb-2">
        <h3 class="pt-1 pb-2" @click="toggleCollapse">
            {{ answers.createdAt | formatDate }} 診断回答
        </h3>
        <transition
            duration="5000"
            :css="false"
            @enter="$enter"
            @after-enter="$afterEnter"
            @leave="$leave"
        >
            <div v-show="showQuestions" class="collapse-section">
                <FormattedAnswers
                    v-if="answers"
                    class="m-0"
                    :can-edit="canEdit"
                    :answers="answers"
                />
                <div v-else class="flex-row flex-center my-2">
                    <button
                        class="btn w-50"
                        :to="{
                            name: 'survey',
                            params: {question: survey.selection.length + 1},
                        }"
                    >
                        <svg class="icon-stroke icon-btn">
                            <use xlink:href="#icon-matching" />
                        </svg>
                        <span class="m-auto">
                            MATCHING
                        </span>
                    </button>
                </div>
                <router-link
                    :to="{name: 'survey', params: {question: 'summary'}}"
                    tag="button"
                    class="btn btn-blue w-70 mx-auto m-1"
                >
                    <span class="m-auto">診断編集へ</span>
                </router-link>
            </div>
        </transition>

        <div :class="showQuestions ? null : 'bg-body'">
            <div
                id="questionare-icon"
                class="text-red pb-1 collapse-icon arrow mt-1"
                :class="{cross: showQuestions}"
                @click="toggleCollapse"
            >
                <div class="bar" />
                <div class="bar" />
                <div class="bar" />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import FormattedAnswers from '@/shared/components/FormattedAnswers.vue'
import dayjs from 'dayjs'
import {Vue, Component, Prop} from 'vue-property-decorator'

interface Answers {
    selection: any
    createdAt: string | null
}

@Component({
    components: {
        FormattedAnswers,
    },

    filters: {
        formatDate(date) {
            if (date) {
                return dayjs(date).format('YYYY.MM.DD')
            } else {
                return dayjs().format('YYYY.MM.DD')
            }
        },
    },
})
export default class MyAnswers extends Vue {
    public name: string = 'MyAnswers'

    @Prop({type: Boolean, default: true}) canEdit!: boolean
    @Prop({type: Object, default: null}) data!: Answers | null
    @Prop({type: Boolean, default: false}) subcategory!: boolean

    showQuestions: boolean = false
    answers: Answers = {
        selection: this.data ? this.data.selection : null,
        createdAt: this.data ? this.data.createdAt : null,
    }

    toggleCollapse() {
        this.showQuestions = !this.showQuestions
    }
}
</script>
