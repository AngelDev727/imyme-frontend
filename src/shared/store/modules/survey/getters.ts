import {GetterTree} from 'vuex'
import {SurveyState} from './types'
import {RootState} from '../../types'

export const getters: GetterTree<SurveyState, RootState> = {
    nextQuestion(state) {
        const surveyLength = Object.keys(state.survey_obj.selection).length

        if (surveyLength === 0) {
            return '1'
        } else if (surveyLength < 15) {
            return (surveyLength + 1).toString()
        } else {
            return 'summary'
        }
    },
    nickName(state) {
        // TODO:Use "Optional Chaining" after upgrading the version of ts >3.7.
        // ex:state.survey_obj?.selection?.q15?.[1]
        // At that time, if an error occurs, change the target of tsconfig to "ES2018".
        if (state.survey_obj
            && 'q15' in state.survey_obj.selection
            && Array.isArray(state.survey_obj.selection.q15)
            && state.survey_obj.selection.q15[1]) {
            return `${state.survey_obj.selection.q15[1]}さん`
        } else {
            return `あなた`
        }
    },
}
