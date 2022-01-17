import {Module} from 'vuex'
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
import {SurveyState} from './types'
import {RootState} from '../../types'

export const state: SurveyState = {
    survey_obj: {
        createdAt: undefined,
        customerId: undefined,
        id: undefined,
        selection: {},
    },
    answer: null,
    answerId: null,
    results: null,
    edited: false,
    answerHistory: [],
}

const namespaced: boolean = true

export const survey: Module<SurveyState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
}
