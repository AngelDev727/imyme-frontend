import 'jest-dom/extend-expect'
import {render} from 'vue-testing-library'
import MyLifeBalance from '@app/components/MyPage/MyLifeBalance'

test('should render the life balance widget', () => {
    const {getByText} = render(MyLifeBalance, {
        stubs: ['RadarChart'],
        props: {
            lifeBalance: {
                stress: 4,
                mental: 4,
                excercise: 3,
                diet: 3,
                sleep: 4,
            },
        },
    })
    expect(getByText(/トータルライフバランス/i)).toBeTruthy()
})
