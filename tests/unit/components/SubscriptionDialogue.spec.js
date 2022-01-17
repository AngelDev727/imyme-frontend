import 'jest-dom/extend-expect'
import {render, fireEvent} from 'vue-testing-library'
import SubscriptionDialogue from '@app/components/SubscriptionDialogue'
import store from '../store'

test('test', async () => {
    const {queryByTestId, debug} = render(SubscriptionDialogue, {
        store,
    })

    expect(queryByTestId('subscription-true-button').checked).toBe(false)
    expect(queryByTestId('subscription-false-button').checked).toBe(true)
    await fireEvent.click(queryByTestId('subscription-true-button'))
    expect(queryByTestId('subscription-true-button').checked).toBe(true)
    expect(queryByTestId('subscription-false-button').checked).toBe(false)
    await fireEvent.click(queryByTestId('subscription-false-button'))
    expect(queryByTestId('subscription-true-button').checked).toBe(false)
    expect(queryByTestId('subscription-false-button').checked).toBe(true)
})
