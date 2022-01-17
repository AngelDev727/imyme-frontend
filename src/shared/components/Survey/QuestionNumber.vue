<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class QuestionNumber extends Vue {
    public name: string = 'QuestionNumber'

    @Prop({type: [Number, String], default: 1}) currentQuestion!:
        | string
        | number
    @Prop({type: Number, default: 15}) questionCount!: number
}
</script>

<template>
    <div class="question-number px-2" style="font-weight:400">
        <div v-for="q in questionCount" :id="`qn${q}`" :key="`q-${q}`">
            <router-link
                v-if="q === +currentQuestion"
                :to="{name: 'survey', params: {question: q}}"
                class="number-fill number current"
            >
                <span class="m-auto">
                    Q {{ currentQuestion }} / {{ questionCount }}
                </span>
            </router-link>
            <router-link
                v-else
                :to="{name: 'survey', params: {question: q}}"
                class="number-fill number"
            />
        </div>
    </div>
</template>
