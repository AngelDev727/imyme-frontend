import 'jest-dom/extend-expect'
import {render, wait, fireEvent} from 'vue-testing-library'
import UserDetailsForm from '@app/components/UserDetailsForm'
import Mypage from '@app/views/Mypage'
import Checkout from '@app/views/Checkout'
import store from '../store'

const routes = [
    {path: '/checkout', name: 'checkout', component: Checkout},
    {path: '/mypage', name: 'mypage', component: Mypage},
]

test('should render the user details in the delivery form', async () => {
    const {getByPlaceholderText} = render(UserDetailsForm, {
        store,
    })
    await wait(() => expect(getByPlaceholderText('姓').value).toBeTruthy())
    const inputNode = getByPlaceholderText('姓')
    expect(inputNode.value).toBe('User')
})

test('should call review order function', async () => {
    const {getByPlaceholderText, getByTestId} = render(UserDetailsForm, {
        store,
        routes,
    })
    await wait(() => expect(getByPlaceholderText('姓').value).toBeTruthy())
    await fireEvent.click(getByTestId('review-order'))
})
