import 'jest-dom/extend-expect'
import {render} from 'vue-testing-library'
import HeroSection from '@app/components/HeroSection'

test('should render HeroSection', () => {
    const {queryByTestId} = render(HeroSection)
    expect(queryByTestId('hero--text')).toHaveTextContent('あなたに一番合う')
})
