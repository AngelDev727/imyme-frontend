import Vue from 'vue';
import VueLazyload from 'vue-lazyload'
import App from './App.vue';
import router from './router';
import store from '@/shared/store'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

import '@signage/assets/styles/css/main.css'

Vue.config.productionTip = false;

const sentryEnv: string | undefined = process.env.VUE_APP_SENTRY_ENVIRONMENT
const commitSha: string | undefined = process.env.VUE_APP_COMMIT_SHA

if (sentryEnv) {
  Sentry.init({
    release: 'signage@' + commitSha,
    dsn: 'https://fc3eb143a91e412ebbd99ffe9152e0b4@sentry.io/1730881',
    integrations: [new Integrations.Vue({Vue, attachProps: true})],
    debug: true,
    environment: sentryEnv,
  })
}

Vue.use(VueLazyload, {
  preLoad: 1.1,
  attempt: 1,
  lazyComponent: true,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
