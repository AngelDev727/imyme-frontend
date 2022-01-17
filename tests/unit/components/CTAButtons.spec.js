import 'jest-dom/extend-expect'
import {render} from 'vue-testing-library'
import CTAButtons from '@app/components/CTAButtons'
import store from '../store'

test('should render the Matching Start button', () => {
    const {queryByTestId} = render(CTAButtons, {
        computed: {
            loggedIn: () => true,
            answerId: () => 20,
        },
        stubs: ['router-link'],
        store,
    })
    expect(queryByTestId('matching-start-button')).toHaveTextContent(
        'matching start!',
    )
})
