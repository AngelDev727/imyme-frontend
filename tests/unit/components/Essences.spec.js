import 'jest-dom/extend-expect'
import {render, fireEvent} from 'vue-testing-library'
import Essences from '@app/components/Essences'
import collapse from '@app/collapse'

const store = {
    state: {
        essences: [
            {
                allergy_id: 'e4bc366f-367e-4cfa-abb7-033496484387',
                createdAt: '2018-07-30T14:21:15Z',
                id: 9,
                image:
                    'https://imymebackendstorage.blob.core.windows.net/essences-dev/8d4e35dd-10cf-4ba4-992e-aa334beb05c5',
                name: 'water',
                overview: 'water from a good source',
                updatedAt: '2018-07-30T14:21:15Z',
            },
        ],
    },
}

test('should not render when the dropdown is closed', () => {
    const {queryByTestId} = render(
        Essences,
        {
            store,
            stubs: ['router-link', 'transition'],
        },
        vue => vue.use(collapse),
    )
    expect(queryByTestId('toggle-button-arrow')).toBeTruthy()
    expect(queryByTestId('toggle-button-cross')).toBeNull()
    expect(queryByTestId('essence-15')).toBeNull()
})

test('should render the Essences after opening the dropdown', async () => {
    const {queryByTestId, debug} = render(
        Essences,
        {
            store,
            stubs: ['router-link', 'transition'],
        },
        vue => vue.use(collapse),
    )
    await fireEvent.click(queryByTestId('toggle-button-arrow'))
    expect(queryByTestId('essence-15')).toHaveTextContent('Damask Rose Water')
    expect(queryByTestId('toggle-button-arrow')).toBeNull()
    expect(queryByTestId('toggle-button-cross')).toBeTruthy()
})
