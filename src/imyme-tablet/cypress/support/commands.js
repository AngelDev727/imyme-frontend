import {addMatchImageSnapshotCommand} from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

Cypress.Commands.add('createUserShopify', user => {
    let query = `
    mutation {
        customerCreate(input: {
            email: "${user.email}",
            password: "${user.password}"
        }) {
            userErrors {
                field
                message
            }
            customer {
                id
            }
        }
    }`
    return cy
        .request({
            url: 'https://imyme-cosme.myshopify.com/api/graphql',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': Cypress.env(
                    'VUE_APP_SHOPIFY_STOREFRONT_API_KEY',
                ),
            },
            body: JSON.stringify({query}),
        })
        .then(response => {
            const {data} = response.body
            const {customer, userErrors} = data.customerCreate
            if (userErrors.length === 0) {
                return customer
            }
        })
})

Cypress.Commands.add('createUserImyme', customer => {
    return cy
        .request({
            url: `https://imyme-dev.japaneast.cloudapp.azure.com/api/customers`,
            method: 'POST',
            body: {remoteId: customer.id},
        })
        .then(response => response)
})

// Cypress.Commands.add('signIn', user => {
//     let creds = {
//         email: 'test_5@email.com',
//         password: '123456',
//     }
//     const {data, errors} = response.body
//     const {customer, userErrors} = data.customerCreate
//     if (userErrors.length === 0) {
//         return cy
//             .request({
//                 url: `https://imyme-dev.japaneast.cloudapp.azure.com/api/customers/sign-in`,
//                 method: 'POST',
//                 body: {remoteId: customer.id},
//             })
//             .then(r => {
//                 console.log(r.body)
//                 const {
//                     customerAccessToken,
//                     userErrors,
//                 } = r.body.data.customerAccessTokenCreate
//                 if (userErrors.length > 0) {
//                     return Promise.reject(userErrors)
//                 } else {
//                     return Promise.resolve()
//                 }
//             })
//     } else {
//         return Promise.reject()
//     }
// })
