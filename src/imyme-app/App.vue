<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import {State, Action, Mutation} from 'vuex-class'
import NavBar from '@app/components/NavBar.vue'
import Icons from '@shared/components/Icons.vue'
import Splash from '@shared/components/Splash.vue'
import Error from '@shared/components/Error.vue'
import PageTransition from '@shared/components/PageTransition.vue'
import {isLoggedIn} from '@/shared/auth'
import * as Sentry from '@sentry/browser'
import {SurveyState} from '@/shared/store/modules/survey/types'
import {User} from '@/shared/store/modules/user/types'
import {ApplicationState} from '@/shared/store/modules/application/types'

@Component({
    components: {
        NavBar,
        Icons,
        Splash,
        Error,
        PageTransition,
    },
})
export default class App extends Vue {
    public name: string = 'App'

    @State('survey') surveyState!: SurveyState
    @State(state => state.user.user) user!: User | null
    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @State('application') applicationState!: ApplicationState
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @Mutation('survey/SET_SURVEY') setSurvey
    @Mutation('survey/SET_ANSWER_ID') setAnswerId
    @Mutation('survey/SET_USER_RESULTS') setSurveyResults
    @Action('survey/getAnswerId') getAnswerId
    @Action('survey/getResultsWithAnswerId') getResultsWithAnswerId
    @Action('survey/attachAnswerIdToUser') attachAnswerIdToUser
    @Action('survey/attachUserToResults') attachUserToResults
    @Action('checkout/getUserSubscriptionsRecharge')
    getUserSubscriptionsRecharge
    @Action('application/loadingPromiseStart') loadingPromiseStart
    @Action('application/loadingPromiseAdd') loadingPromiseAdd
    @Action('application/getMaintenanceStatus') getMaintenanceStatus
    @Action('user/getUser') getUser
    @Action('checkout/getUserOrderHistory') getUserOrderHistory
    @Action('checkout/getSubscriptionsCod') getSubscriptionsCod

    get redirectTo() {
        return this.$route.query.next || 'top'
    }

    get loading(): any {
        return this.applicationState.promises
    }

    @Watch('surveyState.survey_obj.selection', {deep: true})
    onSurveyChanged(val) {
        if (typeof val !== 'undefined') {
            sessionStorage.setItem('surveyAnswers', JSON.stringify(val))
        }
    }
    @Watch('user')
    onUserChanged() {
        if (this.user) {
            try {
                Sentry.configureScope(scope => {
                    scope.setUser({
                        email: this.user ? this.user.email : undefined,
                    })
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            // Clear email from sentry?
            if (process.env.NODE_ENV !== 'production') console.log('no mail')
        }
    }
    // on signUp or Login
    @Watch('user.id', {immediate: true})
    async onUserIdChanged(val) {
        if (val) {
            let answerId = await this.getAnswerId(val)
            //then triggers watch for surveyState.answerId
            if (!answerId) {
                answerId = sessionStorage.getItem('answerId')
                if (answerId) {
                    const userResults = await this.attachUserToResults({
                        answerId: answerId,
                        customerId: val,
                    })

                    sessionStorage.setItem(
                        'surveyAnswers',
                        JSON.stringify(userResults.selection),
                    )
                } else {
                    // no answer user(purchased only limited items)
                    await this.getUserSubscriptionsRecharge(val)
                    await this.getUserOrderHistory(val)
                    await this.getSubscriptionsCod(val)
                }
            } else {
                await this.getUserSubscriptionsRecharge(val)
                await this.getUserOrderHistory(val)
                await this.getSubscriptionsCod(val)
            }
            if (this.$route.name == 'signup' || this.$route.name == 'login')
                this.$router.push({name: this.redirectTo.toString()})
        }
    }
    @Watch('surveyState.answerId', {immediate: true})
    async onAnswerIdChange(val) {
        this.loadingPromiseAdd([this.answerIdChange(val)])
    }
    async answerIdChange(val) {
        if (val) {
            let results
            sessionStorage.setItem('answerId', val)

            if (!isLoggedIn()) {
                results = await this.attachAnswerIdToUser(val)
            } else {
                try {
                    results = await this.getResultsWithAnswerId(val)
                } catch (error) {
                    results = await this.attachAnswerIdToUser(val)
                }
            }
            sessionStorage.setItem('answerResults', JSON.stringify(results))
            if (this.$route.name && this.$route.name.includes('survey'))
                this.$router.push({name: 'results'})
        }
    }
    @Watch('loading', {immediate: true})
    onLoadingChanged(val: any) {
        if (val.length != 0) {
            setTimeout(() => {
                this.loadingPromiseStart()
            }, 500)
        }
    }
    @Watch('rechargeObject', {deep: true})
    async onRechargeObjectChange(val) {
        if (val) {
            sessionStorage.setItem('rechargeObject', JSON.stringify(val))
        }
    }

    @Watch('$route')
    async onRouteChanged(val, old) {
        await this.checkMaintenance()

        if (old.params.isTrial) {
            let isTrial = old.params.isTrial
            if (typeof(isTrial) === 'string') {
                isTrial = Boolean(isTrial)
            }
            if (!val.params) {
                val.params = {}
            }
            val.params.isTrial = isTrial
        }

        if (val.meta) {
            this.setTitle(val.meta)
        }
        if (val.query.storeCode) {
            sessionStorage.setItem('storeCode', val.query.storeCode)
        }
        const storeCode = sessionStorage.getItem('storeCode')
        if (storeCode) {
            this.$router.replace({
                ...this.$router.currentRoute,
                query: {
                    ...val.query,
                    storeCode,
                },
            })
        }

        this.removeTag()
        if (val.name === 'checkout-complete') {
            this.insertTag('track')
        } else if (val.name === 'cp_fv2') {
            this.insertTag('lptag')
        }
    }

    setTitle (meta) {
        if ('title' in meta) {
            document.title = meta.title
        }
        const head = document.querySelector('head')
        if ('description' in meta) {
            const description = document.querySelector("meta[property='description']")
            if (description) {
                description.setAttribute('content', meta.description)
            } else if (head) {
                this.createMetaTag(head, 'description', meta.description)
            }
        }
        if ('keywords' in meta) {
            const keywords = document.querySelector("meta[property='keywords']")
            if (keywords) {
                keywords.setAttribute('content', meta.keywords)
            } else if (head) {
                this.createMetaTag(head, 'keywords', meta.keywords)
            }
        }
    }

    createMetaTag (head: Element, key: string, value: string): void {
        const metaTag = document.createElement('meta')
        metaTag.setAttribute('name', key)
        metaTag.setAttribute('content', value)
        head.appendChild(metaTag)
    }

    insertTag(tagName) {
        const importScript = document.createElement('script')
        importScript.type = 'text/javascript'
        importScript.setAttribute('src', '//ff-tg.com/itpx/' + tagName + '.js')
        document.body.appendChild(importScript)
    }

    removeTag() {
        const body: HTMLInputElement = document.body as HTMLInputElement
        const childNodes = Array.from(body.children)
        childNodes.forEach(childNode => {
            const child: HTMLImageElement = childNode as HTMLImageElement
            if (child.tagName === 'SCRIPT' && child.src.match(/\/\/ff-tg.com\/itpx/)) {
                document.body.removeChild(childNode)
            }
        })
    }

    async checkMaintenance() {
        const res_maintenance = await this.getMaintenanceStatus()
        if (
            res_maintenance &&
            res_maintenance.message === 'maintenance mode is on'
        ) {
            this.$router.push({name: 'Maintenance'})
        }
    }

    async created() {
        this.checkMaintenance()

        const user = await this.getUser()
        const res = sessionStorage.getItem('answerResults')
        const ans = sessionStorage.getItem('surveyAnswers')
        const ansId = sessionStorage.getItem('answerId')
        const rechargeObj = sessionStorage.getItem('rechargeObject')
        if(!user){
            localStorage.removeItem('imyme-token')
        }
        if (res) {
            this.setSurveyResults(JSON.parse(res))
        }
        if (ans) {
            this.setSurvey(JSON.parse(ans))
        }
        if (ansId) {
            this.setAnswerId(ansId)
        }
        if (rechargeObj) {
            this.setRechargeObject(JSON.parse(rechargeObj))
        }
        if (!('fetch' in window) || !('Promise' in window)) {
            this.setErrorMessage({message: 'unsupported browser'})
        }
    }

    mounted() {
        //makes the :active state work on iPhone and iPad
        window.onload = function() {
            if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
                document.body.addEventListener(
                    'touchstart',
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    function() {},
                    false,
                )
            }
        }
    }
}
</script>

<template>
    <div id="app">
        <Icons />
        <nav-bar />
        <Error />
        <PageTransition>
            <router-view class="showing-navbar_phone" />
        </PageTransition>
        <splash />
    </div>
</template>
