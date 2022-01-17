import {build, fake} from 'test-data-bot'

const userBuilder = build('User').fields({
    email: fake(f => `imyme_${f.random.number({min: 0, max: 99999})}@test.com`),
    password: fake(f => f.internet.password()),
})

export {userBuilder}
