import 'jest-dom/extend-expect'
import {render, fireEvent, wait} from 'vue-testing-library'
import NavBar from '@app/components/NavBar'
import interpolateColor from '@app/interpolateColor'
import collapse from '@app/collapse'
import store from '../store'

test('should render the bar when menu is closed and cross after clicking', async () => {
    const {queryByTestId} = render(
        NavBar,
        {
            store,
            stubs: ['router-link', 'transition'],
        },
        vue => {
            vue.use(interpolateColor)
            vue.use(collapse)
        },
    )
    const button = queryByTestId('toggle-button')
    let icon = queryByTestId('toggle-icon')
    expect(icon.className).toBe('collapse-icon menu')
    await fireEvent.click(button)
    icon = queryByTestId('toggle-icon')
    expect(icon.className).toBe('collapse-icon menu cross')
})

test('should not render the links when menu is closed and render them after clicking the toggle button', async () => {
    const {queryByTestId, getByText, debug} = render(
        NavBar,
        {
            store,
            stubs: ['router-link', 'transition'],
        },
        vue => {
            vue.use(interpolateColor)
            vue.use(collapse)
        },
    )
    const button = queryByTestId('toggle-button')
    const menu = queryByTestId('nav-list')
    expect(menu).not.toBeInTheDocument()
    await fireEvent.click(button)
    await wait(() => expect(queryByTestId('nav-list')).toBeTruthy())
    expect(queryByTestId('nav-list')).toBeVisible()
})
