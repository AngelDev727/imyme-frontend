<template>
    <section class="flex-row flex-se mt-0 pt-0">
        <router-link
            v-if="!loggedIn || !answerId || answerId === 'null'"
            class="btn btn-secondary btn-cta mx-3 mt-1 mb-3"
            :to="{name: 'survey', params: {question: nextQuestion}}"
        >
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-matching" />
            </svg>
            <span
                class="matching-button m-auto"
                data-testid="matching-start-button"
            >
                <span class="matching-button--text-small">
                    ぴったりのスキンケアを<br />無料カウンセリングする
                </span>
            </span>
        </router-link>
        <router-link
            v-else
            class="btn btn-secondary btn-cta mx-3 mt-1 mb-3"
            :to="{name: 'mypage'}"
        >
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-my-page" />
            </svg>
            <span
                class="matching-button m-auto"
                data-testid="matching-start-button"
            >
                <span>back</span>
                <span class="matching-button--text-small">
                    前のページに戻る
                </span>
            </span>
        </router-link>
    </section>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Getter} from 'vuex-class'
import {isLoggedIn} from '@/shared/auth'

@Component
export default class BackButtons extends Vue {
    public name: string = 'BackButtons'

    @Getter('survey/nextQuestion') nextQuestion

    get loggedIn() {
        return isLoggedIn()
    }
    get answerId() {
        return this.$store.state.survey.answerId
    }
}
</script>
