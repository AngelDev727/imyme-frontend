import 'jest-dom/extend-expect'
import {render} from 'vue-testing-library'
import MySkinType from '@app/components/MyPage/MySkinType'

test('should render the skin type widget', () => {
    const {getByText, queryAllByTestId} = render(MySkinType, {
        props: {
            skin: {
                type: '脂性肌',
                sensitivity: '低い',
                spot: 6,
                acne: 8,
                wrinkle: 8,
            },
        },
    })
    expect(getByText(/肌タイプ/i)).toBeTruthy()
    expect(queryAllByTestId('spot-active-circle')).toHaveLength(6)
    expect(queryAllByTestId('spot-small-circle')).toHaveLength(4)
})

test('should update the number active and small circle icons', () => {
    const {getByText, queryAllByTestId} = render(MySkinType, {
        props: {
            skin: {
                type: '脂性肌',
                sensitivity: '低い',
                spot: 4,
                acne: 8,
                wrinkle: 8,
            },
        },
    })
    expect(getByText(/肌タイプ/i)).toBeTruthy()
    expect(queryAllByTestId('spot-active-circle')).toHaveLength(4)
    expect(queryAllByTestId('spot-small-circle')).toHaveLength(6)
})
