import {build, fake, sequence} from 'test-data-bot'

var min = 11111111
var max = 99999999
const userBuilder = build('User').fields({
    email: fake(f => `imyme_${f.random.number({min: 0, max: 99999})}@test.com`),
    password: fake(f => f.internet.password()),
    phone: Math.floor(Math.random() * (max - min + 1)) + min,
})

export {userBuilder}
