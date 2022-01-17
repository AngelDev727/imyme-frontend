<template>
    <div class="results max-page-w">
        <ProductSection />
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State, Action} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'
import ProductSection from '@app/components/Product/ProductSection.vue'
import {isLoggedIn} from '@/shared/auth'

@Component({
    components: {
        ProductSection,
    },
})
export default class Results extends Vue {
    public name: string = 'Results'

    @State('survey') surveyState!: SurveyState
    @Action('user/setSignageValidate') setSignageValidate

    get loggedIn() {
        return isLoggedIn()
    }

    async created() {
        if (!this.loggedIn) {
            const storageAnswerId = sessionStorage.getItem('answerId')
            if (!storageAnswerId) {
                this.$router.push({
                    name: 'top',
                    params: {override: true.toString()},
                })
            }
        }
        this.signageValidate()
    }

    signageValidate() {
        const storeCode = sessionStorage.getItem('storeCode')
        if (storeCode && this.surveyState.results) {
            // const oneTimeToken = undefined
            const productId = this.surveyState.results.recommends.serum[0].id
            const productName = this.surveyState.results.recommends.serum[0]
                .name
            const userName = this.surveyState.survey_obj.selection.q15
                ? this.surveyState.survey_obj.selection.q15[1]
                : 'undefined'
            const collectionName = storeCode
            //disable recaptcha for now but record on firebase
            // this.$recaptcha('homepage').then(token => {
            this.setSignageValidate({
                collectionName,
                // oneTimeToken,
                storeCode,
                // recaptchaToken: null,
                productId,
                productName,
                userName,
            }).then(() => {
                //we may need storecode again to record with the actual sale of the item
                sessionStorage.setItem('storeCodeRef', storeCode)
                //but we don't want to run Validation again
                sessionStorage.removeItem('storeCode')
            })
            // })
        }
    }
}
</script>
