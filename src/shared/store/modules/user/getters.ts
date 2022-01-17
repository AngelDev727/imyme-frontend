import { GetterTree } from 'vuex'
import { UserState } from './types'
import { RootState } from '../../types'

export const getters: GetterTree<UserState, RootState> = {
    userName(state) {
        if (state.user && state.user.firstName) {
            return `${state.user.firstName}さん`
        } else {
            return `あなた`
        }
    },
}
