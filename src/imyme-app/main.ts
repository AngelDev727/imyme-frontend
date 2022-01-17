import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import VueGtm from 'vue-gtm'
import App from './App.vue'
import router from './router'
import store from '@/shared/store'
import collapse from '@/shared/collapse'
import vueSmoothScroll from 'vue-smooth-scroll'

// import { VueReCaptcha } from 'vue-recaptcha-v3'
import loadPolyfills from './loadPolyfills';

import '@app/assets/styles/css/main.css'
import '@app/assets/styles/css/app.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faLine } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

console.log("process.env.COMMIT_SHA main.ts")
console.log(process.env.COMMIT_SHA)
const sentryEnv: string | undefined = process.env.VUE_APP_SENTRY_ENVIRONMENT
const commitSha: string | undefined = process.env.VUE_APP_COMMIT_SHA

if (sentryEnv) {
    Sentry.init({
        release: 'app@' + commitSha,
        dsn: 'https://a7a42d11d7284140a4697b65e60f8811@sentry.io/1547904',
        integrations: [new Integrations.Vue({Vue, attachProps: true})],
        debug: true,
        environment: sentryEnv,
    })
}

// set awesome icons
library.add(faInstagram, faLine);
library.add(faEnvelope, faUser);
library.add(faInfoCircle, faShoppingCart, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Vue.use(VueReCaptcha, { siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY })

Vue.config.productionTip = false
Vue.use(collapse)

Vue.use(VueLazyload, {
    preLoad: 1.1,
    attempt: 1,
    lazyComponent: true,
})

const {VUE_APP_GTM_ID} = process.env

Vue.use(VueGtm, {
    id: VUE_APP_GTM_ID, // Your GTM ID
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: false, // Whether or not display console logs debugs (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
})

Vue.use(vueSmoothScroll)

Vue.directive('scroll', {
    inserted: function (el, binding) {
        const f = function (evt: Event) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    },
})

loadPolyfills().then(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
})
