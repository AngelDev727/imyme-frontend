import {MutationTree} from 'vuex'
import {SurveyState} from './types'

export const mutations: MutationTree<SurveyState> = {
    RESET(state) {
        state.answer = null
        state.answerId = null
        state.results = null
        state.edited = false
        state.answerHistory = []
        state.survey_obj = {
            createdAt: undefined,
            customerId: undefined,
            id: undefined,
            selection: {},
        }
    },
    SET_SURVEY(state, data) {
        state.survey_obj.selection = data
    },

    SET_ANSWER_ID(state, data) {
        state.answerId = data
    },

    SET_ANSWER(state, data) {
        state.answer = data
    },

    SET_ANSWER_HISTORY(state, data) {
        state.answerHistory = data
    },

    SET_USER_RESULTS(state, data) {
        state.results = data
    },

    SET_ANSWERS_FROM_SERVER(state, data) {
        state.survey_obj = data
    },

    ADD_TO_SURVEY(state, data) {
        const {questionNumber, answer} = data
        const mutatedSelection = {...state.survey_obj.selection}

        // only mutate the selection when there is an answer
        // this prevents answer being set to [] using back on a browser for single answer questions
        if (answer.length > 0) {
            mutatedSelection[`q${questionNumber + 1}`] = answer
        }

        state.survey_obj = {
            createdAt: state.survey_obj.createdAt,
            customerId: state.survey_obj.customerId,
            id: state.survey_obj.id,
            selection: mutatedSelection,
        }
    },

    SET_EDITED(state, data) {
        state.edited = data
    },
}
