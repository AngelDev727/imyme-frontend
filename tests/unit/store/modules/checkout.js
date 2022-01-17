export default {
    state: {
        checkout: null,
        rechargeCheckout: false,
    },
    mutations: {
        SET_CHECKOUT(state, data) {
            state.checkout = data
        },
        SET_RECHARGE_CHECKOUT(state, data) {
            state.rechargeCheckout = data
        },
    },
    actions: {
        getProductByRemoteId: () =>
            Promise.resolve({
                acneEval: '2',
                createdAt: '2018-11-19T11:24:43Z',
                essences: [
                    {
                        allergy_id: '58a9ef65-4b77-4700-a6ff-57be2820ace0',
                        id: 7,
                        level: 'none',
                        name: 'ダマスクローズ水（鹿児島産）',
                        overview: '',
                        quantity: 300,
                    },
                    {
                        allergy_id: 'e4bc366f-367e-4cfa-abb7-033496484387',
                        id: 8,
                        image:
                            'https://imymebackendstorage.blob.core.windows.net/essences-dev/7b06bb3c-989f-4821-ad29-169fd2cd4b85',
                        level: 'none',
                        name: 'aloe',
                        overview: 'testtt',
                        quantity: 600,
                    },
                    {
                        allergy_id: 'e4bc366f-367e-4cfa-abb7-033496484387',
                        id: 9,
                        image:
                            'https://imymebackendstorage.blob.core.windows.net/essences-dev/8d4e35dd-10cf-4ba4-992e-aa334beb05c5',
                        level: 'none',
                        name: 'water',
                        overview: '',
                        quantity: 600,
                    },
                    {
                        allergy_id: 'e4bc366f-367e-4cfa-abb7-033496484387',
                        id: 10,
                        level: 'none',
                        name: 'alcohol',
                        overview: "don't drink this",
                        quantity: 600,
                    },
                    {
                        allergy_id: 'e4bc366f-367e-4cfa-abb7-033496484387',
                        id: 11,
                        level: 'none',
                        name: '月桃葉水（沖縄産）',
                        overview:
                            '月桃はポリフェノールを多く含み、それは赤ワインの約30倍と言われます。ポリフェノールの抗酸化作用により、シミやくすみを抑制し、肌の加齢現象を防ぐ効果が期待できます。',
                        quantity: 600,
                    },
                    {
                        allergy_id: 'e4bc366f-367e-4cfa-abb7-033496484387',
                        id: 12,
                        level: 'none',
                        name: 'パルミチン酸アスコルビルリン酸3Na',
                        overview:
                            '医療現場でも使用される新型ビタミンC誘導体を配合しました。この新型ビタミンC誘導体を取り入れたのは、年齢を問わず肌の老化を防ぐ確かな効果があると考えたからです。',
                        quantity: 300,
                    },
                ],
                id: '54733b69-696c-4489-86d0-05150a5dc3b2',
                name: 'LOTION 0551',
                overview:
                    'ダマスクローズ水や沖縄月桃をベースに和漢生薬等をブレンドし、水さえも一切加えずに作った100%自然成分の化粧水。\n厳選した自然素材にプラスして、植物性セラミド、ハチミツを配合し保湿効果を持たせています。\nまた新型ビタミンC誘導体（APPS）を配合し、本来持っていた肌の力を引き出し、健やかな肌に導きます。',
                provision: 'factory',
                remoteId: 'gid://shopify/Product/1498565116016',
                sensitivities: [
                    {id: 'db6faf09-66a1-40a4-a513-b694e52e305d', name: '低い'},
                ],
                shopify_id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE0OTg1NjUxMTYwMTY=',
                skinTypes: [
                    {
                        id: '7c52cfdb-93d0-40fe-ae08-227740a9b7a4',
                        name: '乾燥肌',
                    },
                    {
                        id: 'dd798739-dbe8-4a78-8e67-c51edaad61f4',
                        name: '乾燥性脂性肌',
                    },
                ],
                spotEval: '5',
                type: 'skin lotion',
                updatedAt: '2018-11-19T20:24:43Z',
                userId: '46003f5a-fa87-4447-945b-0dddb57c0b7c',
                wrinkleEval: '3',
                shopify_id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzE0OTg1NjUxMTYwMTY=',
                images: {
                    edges: [
                        {
                            node: {
                                originalSrc:
                                    'https://cdn.shopify.com/s/files/1/0037/3253/7456/products/product-images_lotion_a98ab407-236b-43af-8468-8310fc758e8b.png?v=1541466220',
                            },
                        },
                    ],
                },
                priceRange: {minVariantPrice: {amount: '4980.0'}},
                title: 'LOTION 0551',
                variants: {
                    edges: [
                        {
                            node: {
                                id:
                                    'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xMzkzODMyMDczNjM2OA==',
                            },
                        },
                    ],
                },
                description:
                    'ダマスクローズ水や沖縄月桃をベースに和漢生薬等をブレンドし、水さえも一切加えずに作った100%自然成分の化粧水。厳選した自然素材にプラスして、植物性セラミド、ハチミツを配合し保湿効果を持たせています。また新型ビタミンC誘導体（APPS）を配合し、本来持っていた肌の力を引き出し、健やかな肌に導きます。',
            }),
        getRecipe: () =>
            Promise.resolve({
                acneEval: '2',
                createdAt: '2018-11-19T11:24:43Z',
                id: '54733b69-696c-4489-86d0-05150a5dc3b2',
                name: 'LOTION 0551',
                overview:
                    'ダマスクローズ水や沖縄月桃をベースに和漢生薬等をブレンドし、水さえも一切加えずに作った100%自然成分の化粧水。↵厳選した自然素材にプラスして、植物性セラミド、ハチミツを配合し保湿効果を持たせています。↵また新型ビタミンC誘導体（APPS）を配合し、本来持っていた肌の力を引き出し、健やかな肌に導きます。',
                provision: 'factory',
                remoteId: 'gid://shopify/Product/1498565116016',
                spotEval: '5',
                type: 'skin lotion',
                updatedAt: '2018-11-19T20:24:43Z',
                userId: '46003f5a-fa87-4447-945b-0dddb57c0b7c',
                wrinkleEval: '3',
            }),
        createCheckout: ({commit}) => {
            commit('SET_CHECKOUT', {
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
                            {
                                node: {
                                    title: 'LOTION 0451',
                                    quantity: 1,
                                    id:
                                        'Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzY0OWI0MjhmYmMwMWY3MjZiNjU1ZDNkZGZiYTZiYzk4P2NoZWNrb3V0PTNlMzhkNTMwODY5NzdjZDMzMzNhZTc2OGZhYjE2NTMz',
                                    variant: {
                                        image: {
                                            originalSrc:
                                                'https://cdn.shopify.com/s/files/1/0037/3253/7456/products/product-images_lotion_a98ab407-236b-43af-8468-8310fc758e8b.png?v=1541466220',
                                        },
                                        price: '3333',
                                    },
                                },
                            },
                        ],
                    },
                },
            })
        },
    },
}
