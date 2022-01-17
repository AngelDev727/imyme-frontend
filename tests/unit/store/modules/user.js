export default {
    state: {
        user: null,
        checkout: {
            id:
                'Z2lkOi8vc2hvcGlmeS9DaGVja291dC8zZTM4ZDUzMDg2OTc3Y2QzMzMzYWU3NjhmYWIxNjUzMz9rZXk9N2M1M2U2Mzg4YzE3YWM2ZDgzN2YzYWQxY2JiZDhiZTk=',
            webUrl:
                'https://imyme-cosme.myshopify.com/3732537456/checkouts/3e38d53086977cd3333ae768fab16533?key=7c53e6388c17ac6d837f3ad1cbbd8be9',
            lineItems: {
                edges: [
                    {
                        node: {
                            title: 'LOTION 0551',
                            quantity: 1,
                            id:
                                'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzY0OWI0MjhmYmMwMWY3MjZiNjU1ZDNkZGZiYTZiYzk4P2NoZWNrb3V0PTNlMzhkNTMwODY5NzdjZDMzMzNhZTc2OGZhYjE2NTMz',
                            variant: {
                                image: {
                                    originalSrc:
                                        'https://cdn.shopify.com/s/files/1/0037/3253/7456/products/product-images_lotion_a98ab407-236b-43af-8468-8310fc758e8b.png?v=1541466220',
                                },
                                price: '4980',
                            },
                        },
                    },
                ],
            },
        },
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data
        },
    },
    actions: {
        getUser: ({commit}) =>
            commit('SET_USER', {
                id: 'Z2lkOi8vc2hvcGlmeS9DdXN0b21lci83NDI3OTAzNjUyOTY=',
                email: 'test@imyme.io',
                displayName: 'User Test',
                firstName: 'Test',
                lastName: 'User',
                phone: '+81312348888',
                defaultAddress: {
                    address1: '五反田',
                    address2: 'dsffdsfsfdf',
                    city: '品川区',
                    company: null,
                    country: 'Japan',
                    countryCodeV2: 'JP',
                    firstName: 'Test',
                    lastName: 'User',
                    id:
                        'Z2lkOi8vc2hvcGlmeS9NYWlsaW5nQWRkcmVzcy84MTk4MTM1MTUzNzY/bW9kZWxfbmFtZT1DdXN0b21lckFkZHJlc3MmY3VzdG9tZXJfYWNjZXNzX3Rva2VuPV9DUkViYUtnSURBaUtJSk1Gc24wbTFDekVhZUdnbzFhbnNBUlNmcDY2WU1QTW9ncUFuNndoY0QzcXM4SVhRdkE5WGFsa0JtLUxvSXpybGpmS3NYZHBSenl4MGh6ZXZhYzRCRDMtMTFqOUpWRW9sMlFfVHBLSXFYdUxCalJhR3lseGRCRnV0OTR0Y20zVnJQd3ExLTVPazhLVDQ5RnNCYkYtODMtbkdzV2I1enlXcGFYeDlxVU4wa3g1UnpHTkt0dVJrZlQya0JlV25qZmNUUC1DTVJmc2NnU056Y0I1NVphS2x5MXdOc3ZnUEVDd2QwZFZmX3BlZjJQcHBsd2tMYk4=',
                    name: 'Test User',
                    province: 'Tōkyō',
                    provinceCode: 'JP-13',
                    zip: '171-0021',
                },
            }),
        addShippingAddress: () => {},
        updateUser: () => Promise.resolve(),
        updateUserAddress: () => Promise.resolve(),
    },
}
