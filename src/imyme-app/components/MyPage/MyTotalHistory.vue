<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import HistoryObject from '@app/components/MyPage/HistoryObject.vue'
import CTAButtons from '@shared/components/Top/CTAButtons.vue'
import {State} from 'vuex-class'
import {SurveyObject} from '@/shared/store/modules/survey/types'

@Component({
    components: {
        HistoryObject,
        CTAButtons,
    },
})
export default class MyTotalHistory extends Vue {
    public name: string = 'MyTotalHistory'

    @State(state => state.survey.answerHistory)
    answerHistory!: Array<SurveyObject>
}
</script>

<template>
    <div v-if="answerHistory.length > 0">
        <HistoryObject
            v-for="answer in answerHistory"
            :key="answer.id"
            :answer="answer"
        />
    </div>
    <div v-else class="cart">
        <CTAButtons />
    </div>
</template>
