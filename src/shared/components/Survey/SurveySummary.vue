<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State, Action} from 'vuex-class'
import {SurveyObject} from '@/shared/store/modules/survey/types'
import {User} from '@/shared/store/modules/user/types'
import {isLoggedIn} from '@/shared/auth'
import FormattedAnswers from '@shared/components/FormattedAnswers.vue'
import dayjs from 'dayjs'

@Component({
    components: {
        FormattedAnswers,
    },
})
export default class SurveySummary extends Vue {
    public name: string = 'SurveySummary'

    @State(state => state.user.user) user!: User
    @Action('user/updateUser') updateUser
    @State(state => state.survey.survey_obj) surveyObject!: SurveyObject
    @Action('survey/setAnswers') setAnswers
    @Action('checkout/getUserSubscriptionsRecharge') getUserSubscriptionsRecharge
    @Action('checkout/getSubscriptionsCod') getSubscriptionsCod

    get createdAt() {
        if (dayjs(this.surveyObject.createdAt).isValid()) {
            dayjs(this.surveyObject.createdAt).format('YYYY.MM.DD')
        }
        return dayjs().format('YYYY.MM.DD')
    }
    get surveyErrors() {
        return (
            Object.keys(this.surveyObject.selection).filter(key => {
                if (this.surveyObject.selection[key].length == 0) {
                    return `error in ${key}`
                }
            }).length > 0
        )
    }

    async submitAnswers() {
        const answers = await this.setAnswers({
            customerId: this.user ? this.user.id : null,
            answers: this.surveyObject.selection,
        })
        sessionStorage.setItem('results', JSON.stringify(answers))

        if (isLoggedIn()) {
            const userId = this.user ? this.user.id : null
            await this.getUserSubscriptionsRecharge(userId)
            await this.getSubscriptionsCod(userId)
        }
    }
    updateFirstName(Name) {
        const userUpdate = `{
                    firstName: "${Name}"
                }`
        return this.updateUser(userUpdate)
    }
}
</script>

<template>
    <div class="mx-2 mb-5">
        <div>
            <h2>
                <span class="bg-body underline">{{ createdAt }}</span>
                診断回答
            </h2>
            <div class="text-center text-regular my-1">
                回答を選んでやり直せます
            </div>
        </div>
        <FormattedAnswers />
        <div class="flex-row flex-center">
            <button
                class="btn btn-secondary m-0 w-70"
                :disabled="
                    surveyErrors ||
                        Object.keys(surveyObject.selection).length != 15
                "
                @click="submitAnswers()"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-check" />
                </svg>
                <span class="m-auto text-summary-button">
                    これでマッチングする
                </span>
            </button>
        </div>
    </div>
</template>
