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

Cypress.Commands.add('getUserAnswers', () => {
    return cy
        .request({
            url: `https://imyme-dev.japaneast.cloudapp.azure.com/api/answers/${sessionStorage
                .getItem('answerId')
                .replace(/"/g, '')}`,
            method: 'GET',
            headers: {
                Authorization: localStorage
                    .getItem('imyme-token')
                    .replace(/"/g, ''),
            },
        })
        .then(response => response)
})

Cypress.Commands.add('signIn', user => {
    return cy
        .request({
            url: `https://imyme-dev.japaneast.cloudapp.azure.com/api/customers/sign-in`,
            method: 'POST',
            body: {
                email: user.email,
                password: user.password,
            },
        })
        .then(({body}) => {
            console.log(body)
            localStorage.setItem(
                'imyme-token',
                body.customerAccessTokenCreate.customerAccessToken.accessToken,
            )
            return Promise.resolve()
        })
})

Cypress.Commands.add('addDefaultAddress', () => {
    let address = `{
        lastName: "User",
        firstName: "Test",
        address1: "東通",
        zip: "0100003",
        city: "秋田市",
        province: "Akita",
        country: "Japan"
    }`

    let query = `
    mutation {
        customerAddressCreate(customerAccessToken: "${localStorage
            .getItem('imyme-token')
            .replace(/"/g, '')}", address: ${address} ) {
            userErrors {
                field
                message
            }
            customerAddress {
                address1
                address2
                city
                company
                country
                countryCodeV2
                firstName
                lastName
                id
                name
                province
                provinceCode
                zip
                phone
            }
        }
    }
    `
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
            return Promise.resolve()
        })
})

Cypress.Commands.add('deleteAllAddresses', () => {
    let query = `
    {
        customer(customerAccessToken: "${localStorage
            .getItem('imyme-token')
            .replace(/"/g, '')}") {
            id
            email
            displayName
            firstName
            lastName
            phone
            defaultAddress {
                address1
                address2
                city
                company
                country
                countryCodeV2
                firstName
                lastName
                id
                name
                province
                provinceCode
                phone
                zip
            }
            addresses(first:100) {
                edges{
                    node{
                        address1
                        address2
                        city
                        company
                        country
                        countryCodeV2
                        firstName
                        lastName
                        id
                        name
                        province
                        provinceCode
                        phone
                        zip
                    }
                }
            }
        }
    }
    `
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
            const {
                edges: addresses = [],
            } = response.body.data.customer.addresses
            addresses.forEach(({node: address}) => {
                cy.deleteAddress(address.id)
            })
            return Promise.resolve()
        })
})

Cypress.Commands.add('deleteAddress', addressId => {
    console.log(addressId)
    const query = `mutation {
        customerAddressDelete(id: "${addressId}", customerAccessToken: "${localStorage
        .getItem('imyme-token')
        .replace(/"/g, '')}") {
            customerUserErrors {
                code
                field
                message
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
            console.log(response)
        })
})

// Cypress.Commands.add('createCart', customer => {
//     return cy
//         .request({
//             url: 'https://imyme-cosme.myshopify.com/api/graphql',
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Shopify-Storefront-Access-Token': Cypress.env(
//                     'VUE_APP_SHOPIFY_STOREFRONT_API_KEY',
//                 ),
//             },
//             body: JSON.stringify({query}),
//         })
//         .then(response => response)
// })
