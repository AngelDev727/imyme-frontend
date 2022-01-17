export default {
    state: {
        isLoading: false,
        error: null,
    },

    mutations: {
        RESET(state) {
            state.isLoading = false
            state.error = null
        },

        SET_LOADING(state, data) {
            state.isLoading = data
        },

        SET_ERROR_MESSAGE(state, data) {
            state.error = data
        },
    },

    actions: {
        loadingFinish({commit}) {
            commit('SET_LOADING', false)
        },
        loadingStart({commit}) {
            commit('SET_LOADING', true)
        },
    },
}
