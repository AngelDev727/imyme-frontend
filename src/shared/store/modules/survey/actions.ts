import { ActionTree } from 'vuex'
import { SurveyState } from './types'
import { state } from './index'
import { RootState } from '../../types'
import api from '@/shared/api'
import questionDictionary from '@/shared/questionDictionary'
import * as Sentry from '@sentry/browser'

export const actions: ActionTree<SurveyState, RootState> = {
    setAnswers({ commit }, props) {
        const { customerId, answers } = props
        return api
            .post('/answers/v2', {
                customerId: customerId || null,
                selection: answers,
            })
            .then((response: any) => {
                const { id } = response
                commit('SET_ANSWER_ID', id)
                commit('SET_ANSWERS_FROM_SERVER', response)
                return Promise.resolve(response)
            })
            .catch(error => {
                let errMsg = 'catchAll'

                Sentry.withScope(scope => {
                    scope.setExtra('answerError', error)
                    Sentry.captureException(error)
                })
                if (error.response && error.response.status == 400) {
                    const questionErrors: string[] = []
                    console.error('Problem setting answers', answers)
                    let formattedErrorString = 'Please check answers for '
                    for (const question in questionDictionary) {
                        if (
                            error.response.data.detail.includes(
                                `request.selection.${question}[*]`,
                            )
                        ) {
                            questionErrors.push(question.toString())
                        }
                    }
                    questionErrors.forEach((error, index) => {
                        formattedErrorString =
                            formattedErrorString + error + ' '
                    })
                    errMsg = formattedErrorString
                }
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: '/answers',
                        error: error,
                    },
                    { root: true },
                )
                return Promise.reject(error)
            })
    },

    attachUserToResults({ commit }, props) {
        const { customerId, answerId } = props
        return api
            .patch(`/answers/v2/${answerId}`, {
                customerId: customerId,
            })
            .then(response => {
                return Promise.resolve(response)
            })
    },

    // this is the same action as attachAnswerIdToUser
    // only difference is no catch and no return
    createResults({ commit }, answerId) {
        // commit('SET_USER_RESULTS', null)
        api.post(`/results/v2?answerId=${answerId}`).then(response => {
            commit('SET_USER_RESULTS', response)
        })
    },

    getResultsWithAnswerId({ commit }, answerId) {
        // commit('SET_USER_RESULTS', null)
        return api
            .get(`/answers/v2/${answerId}/result`)
            .then(response => {
                commit('SET_USER_RESULTS', response)
                return Promise.resolve(response)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    },

    attachAnswerIdToUser({ commit }, answerId) {
        // commit('SET_USER_RESULTS', null)
        return api
            .post(`/results/v2?answerId=${answerId}`)
            .then(response => {
                commit('SET_USER_RESULTS', response)
                return Promise.resolve(response)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    },

    async getAnswerId({ commit }, customerId) {
        const answers: any = await api
            .get(`/answers/v2?customerId=${customerId}&limit=1`)
            .catch(error => {
                // add a check for data but what should be output instead?
                if (error.response && error.response.data)
                    commit(
                        'application/SET_ERROR_MESSAGE',
                        {
                            endpoint:
                                '/answers?customerId=${customerId}&limit=1',
                            error: error,
                        },
                        { root: true },
                    )
                return Promise.reject(error)
            })
        if (answers.length > 0) {
            const { id } = answers[0]
            commit('SET_ANSWER_ID', id)
            commit('SET_ANSWER', answers[0])
            commit('SET_ANSWERS_FROM_SERVER', answers[0])
            commit('SET_ANSWER_HISTORY', answers)
            return id
        } else {
            return null
        }
    },

    addToSurvey({ commit }, answer) {
        commit('ADD_TO_SURVEY', answer)
    },
}
