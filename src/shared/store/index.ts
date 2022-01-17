import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { application } from './modules/application/index'
import { auth } from './modules/auth/index'
import { checkout } from './modules/checkout/index'
import { products } from './modules/products/index'
import { social } from './modules/social/index'
import { survey } from './modules/survey/index'
import { user } from './modules/user/index'
import { subscription } from './modules/subscription/index'
import { tablet } from './modules/tablet/index'
import { actions } from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store: StoreOptions<RootState> = {
    state: {
        version: '0.0.1',
    },
    modules: {
        application,
        auth,
        checkout,
        products,
        social,
        survey,
        user,
        tablet,
        subscription,
    },
    strict: debug,
    actions
}

export default new Vuex.Store<RootState>(store)
