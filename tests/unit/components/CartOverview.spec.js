import 'jest-dom/extend-expect'
import {render} from 'vue-testing-library'
import CartOverview from '@app/views/CartOverview'
import store from '../store'

test('should render empty cart component when the checkout is empty', () => {
    const {getByText} = render(CartOverview, {
        stubs: ['router-link'],
        store,
    })
    expect(getByText(/no items in cart/i)).toBeTruthy()
})

test('should render the cart overview when there is an item in the cart', () => {
    const {getByText} = render(CartOverview, {
        store,
        stubs: ['router-link'],
        computed: {
            checkout: () => ({
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
            }),
        },
    })
    expect(getByText(/LOTION 0551/i)).toBeTruthy()
    expect(getByText(/¥4,980/i)).toBeTruthy()
})
