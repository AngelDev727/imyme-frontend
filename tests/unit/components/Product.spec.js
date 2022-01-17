import 'jest-dom/extend-expect'
import {render, fireEvent, wait} from 'vue-testing-library'
import Product from '@app/components/Product/Product'
import OrderForm from '@app/views/OrderForm'
import CartOverview from '@app/views/CartOverview'
import collapse from '@app/collapse'
import store from '../store'

const routes = [
    {path: '/order', name: 'order', component: OrderForm},
    {path: '/cart', name: 'cart', component: CartOverview},
]

test('should render the product information', async () => {
    const {getByText, queryByText, getByTestId, debug} = render(
        Product,
        {
            stubs: ['transition'],
            store,
            props: {
                product: {
                    id: '6462b81c-0559-410f-b22a-515aa21b66ec',
                    matching_rate: 65,
                    name: 'キメラボ アジャスタローション ＜化粧水＞ 120ML',
                    overview: `人間や動物は、もともと、薬などに頼らず自然に回復する力を持っています。

                        しかし、肌トラブルを持つ多くの方は、「スキンケア」という行為を通じて、じつはたくさんの化学物質を肌に塗りこんでしまい、肌の自然な力を弱めています。

                        はたして、そのような「スキンケア」は、本当のskin care（肌のお手入れ）と言えるのでしょうか？

                        美しい肌を作りたいと願う私たちのゴールは、みなさまの肌の、自然な回復力を高め、最終的には『「スキンケア」をしない健康な肌』を作っていただくことです。

                        まずは、私たちの考える基礎化粧水から始めてみてください。`,
                    price: '1.55',
                },
            },
        },
        vue => vue.use(collapse),
    )
    await wait(() => expect(getByTestId('product-container')).toBeTruthy())
    expect(getByText(/LOTION 0551/i)).toBeTruthy()
    expect(queryByText(/1.55/i)).toBeNull()
})

test('should expand when clicking the image', async () => {
    const {getByTestId, getByText, debug} = render(
        Product,
        {
            stubs: ['transition'],
            store,
            routes,
            props: {
                product: {
                    id: '54733b69-696c-4489-86d0-05150a5dc3b2',
                    matching_rate: 99,
                    name: 'LOTION 0551',
                    overview: null,
                    price: '0.00',
                },
            },
        },
        vue => vue.use(collapse),
    )

    await wait(() => expect(getByTestId('product-container')).toBeTruthy())
    await fireEvent.click(getByTestId('product-container'))
    expect(
        getByText(
            /ダマスクローズ水や沖縄月桃をベースに和漢生薬等をブレンドし、水さえも一切加えずに作った100%自然成分の化粧水。厳選した自然素材にプラスして、植物性セラミド、ハチミツを配合し保湿効果を持たせています。また新型ビタミンC誘導体（APPS）を配合し、本来持っていた肌の力を引き出し、健やかな肌に導きます。/i,
        ),
    ).toBeTruthy()
})

test('should create a cart when clicking add to cart button', async () => {
    const {getByText, getByTestId, debug} = render(
        Product,
        {
            stubs: ['transition'],
            store,
            routes,
            props: {
                product: {
                    id: '54733b69-696c-4489-86d0-05150a5dc3b2',
                    matching_rate: 99,
                    name: 'LOTION 0551',
                    overview: null,
                    price: '0.00',
                },
            },
        },
        vue => vue.use(collapse),
    )

    await wait(() => expect(getByTestId('product-container')).toBeTruthy())
    await fireEvent.click(getByTestId('product-container'))
    await fireEvent.click(getByText(/カートに入れる/i))
})
