import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/shared/store'
import collapse from '@/shared/collapse'
import '@app/assets/styles/css/main.css'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

const sentryEnv: string | undefined = process.env.VUE_APP_SENTRY_ENVIRONMENT
const commitSha: string | undefined = process.env.VUE_APP_COMMIT_SHA

if (sentryEnv) {
    Sentry.init({
        release: 'advice@' + commitSha,
        dsn: 'https://a7a42d11d7284140a4697b65e60f8811@sentry.io/1547904',
        integrations: [new Integrations.Vue({Vue, attachProps: true})],
        debug: true,
        environment: sentryEnv,
    })
}

Vue.config.productionTip = false
Vue.use(collapse)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
