import 'jest-dom/extend-expect'
import {render} from 'vue-testing-library'
import ProductSection from '@app/components/Product/ProductSection'
import store from '../store'

test('should render the product section widget', () => {
    const {getByText, debug} = render(ProductSection, {
        store,
        stubs: ['Product'],
    })
    expect(getByText(/あなたにぴったりのローション/i)).toBeTruthy()
})
