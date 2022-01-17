import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import VueGtm from 'vue-gtm'
import App from './App.vue'
import router from './router'
import store from '@shared/store'
import collapse from '@shared/collapse'
import 'leaflet/dist/leaflet.css'

import '@tablet/assets/styles/css/main.css'
import '@tablet/assets/styles/css/tablet.css'

Vue.config.productionTip = false
Vue.use(collapse)

Vue.use(VueLazyload, {
    preLoad: 1.1,
    attempt: 1,
    lazyComponent: true,
})

Vue.use(VueGtm, {
    id: 'GTM-5RXCZZ3', // Your GTM ID
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: false, // Whether or not display console logs debugs (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
})

Vue.directive('scroll', {
    inserted: function(el, binding) {
        let f = function(evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    },
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
