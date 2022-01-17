import {Module} from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
import {SocialState} from './types'
import {RootState} from '../../types'

export const state: SocialState = {
    instagramPictures: [],
}

const namespaced: boolean = true

export const social: Module<SocialState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}
