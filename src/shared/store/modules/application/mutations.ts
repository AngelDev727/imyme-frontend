import {MutationTree} from 'vuex'
import {ApplicationState} from './types'

export const mutations: MutationTree<ApplicationState> = {
    SET_ERROR_MESSAGE(state, data) {
        state.error = data
    },

    SET_LOADING_WITH_PROMISE(state, data) {
        state.promises = [...state.promises, ...data]
    },

    RESET_LOADING_WITH_PROMISE(state) {
        state.promises = []
    },
}
