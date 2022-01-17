<script lang="ts">
import {Vue, Component, Ref} from 'vue-property-decorator'

@Component
export default class SurveyStart extends Vue {
    public name: string = 'SurveyExplaination'

    fade = false
    surveyIcon: string = '#icon-survey'
    @Ref('startIcon') startIcon!: HTMLElement
    skip = false

    mounted() {
        this.$nextTick(() => {
            this.surveyIcon = this.changeIcon()
            this.fade = true
        })
    }

    changeIcon() {
        if (
            this.startIcon &&
            this.startIcon.parentNode &&
            this.startIcon.parentNode.parentNode &&
            (this.startIcon.parentNode.parentNode as HTMLElement).clientWidth <
                400
        ) {
            return '#icon-survey'
        } else {
            return '#icon-tablet-survey'
        }
    }

    startSurvey() {
        this.skip = true
    }
}
</script>

<template>
    <div
        class="survey--start-wrapper"
        :class="{'survey--start-wrapper__skip': skip}"
    >
        <div class="survey--start" :class="{'survey--start__fade': fade}">
            <span class="text-large mt-auto">
                今の肌状態やお悩みについて、
            </span>
            <span class="text-large mt-2">
                いくつかの質問にお答えください。
            </span>
            <span class="text-large mt-2">
                あなたに一番合う
            </span>
            <span class="text-large mt-2">
                コスメをつくります。
            </span>
            <svg class="icon-stroke icon-xl mt-1">
                <use ref="startIcon" :xlink:href="surveyIcon" />
            </svg>
            <button
                class="btn-survey-start bt-1 mt-auto mb-auto"
                @click="startSurvey"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-forward" />
                </svg>
                <span class="m-auto">start</span>
            </button>
        </div>
    </div>
</template>
<style>
    .survey--start{
        margin-top: -3rem;
    }
</style>
