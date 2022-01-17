import {Module} from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
import {ApplicationState} from './types'
import {RootState} from '../../types'

export const state: ApplicationState = {
    error: null,
    promises: [],
}

const namespaced: boolean = true

export const application: Module<ApplicationState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}
