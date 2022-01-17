import {ActionTree} from 'vuex'
import {ApplicationState} from './types'
import {state} from './index'
import {RootState} from '../../types'
import api from '@/shared/api'

const timeoutDuration: number = 300

export const actions: ActionTree<ApplicationState, RootState> = {
    loadingPromiseAdd({commit}, promises) {
        commit('SET_LOADING_WITH_PROMISE', promises)
    },
    loadingPromiseStart({commit}) {
        Promise.all(state.promises)
            .then(() => {
                setTimeout(() => {
                    commit('RESET_LOADING_WITH_PROMISE')
                }, timeoutDuration)
            })
            .catch(error => {
                const message = error.message
                    ? error.message
                    : 'Something went wrong, try again later'

                setTimeout(() => {
                    commit('RESET_LOADING_WITH_PROMISE')
                    commit('SET_ERROR_MESSAGE', error)
                }, timeoutDuration)
            })
    },
    async getMaintenanceStatus() {
        return await api
            .get('/maintenanceStatus')
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(() => {
                return Promise.resolve()
            })
    },
}
