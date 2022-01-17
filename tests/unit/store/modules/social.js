export default {
    state: {
        products: null,
        results: {
            recommends: {
                skin_lotion: [
                    {
                        id: '54733b69-696c-4489-86d0-05150a5dc3b2',
                        matching_rate: 99,
                        name: 'LOTION 0551',
                        overview: null,
                        price: '0.00',
                    },
                ],
            },
        },
    },
    actions: {
        getItems: ({commit}) => commit('SET_PRODUCTS', {}),
    },
    mutations: {
        SET_PRODUCTS: (state, data) => {
            state.products = data
        },
    },
}
