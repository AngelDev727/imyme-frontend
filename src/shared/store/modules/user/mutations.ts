import { MutationTree } from 'vuex'
import { UserState } from './types'

export const mutations: MutationTree<UserState> = {
    RESET(state) {
        state.user = null
    },
    SET_USER(state, data) {
        state.user = data
    },
}
