import {ActionTree} from 'vuex'
import {UserState} from './types'
import {state} from './index'
import {RootState} from '../../types'
import {shopify} from '@/shared/api'
import {getAccessToken} from '@/shared/auth'
import api from '@/shared/api'

export const actions: ActionTree<UserState, RootState> = {
    getUser({commit}) {
        const token = getAccessToken()
        const query = `
        {
            customer(customerAccessToken: "${token}") {
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
        return shopify(query)
            .then(response => {
                const {customer} = response
                commit('SET_USER', customer)
                return Promise.resolve(customer)
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/getUser',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    updateUser({commit}, user) {
        const token = getAccessToken()
        const query = `
            mutation {
                customerUpdate(customerAccessToken: "${token}", customer: ${user}) {
                    customerUserErrors {
                        field
                        message
                    } customer {
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
                            zip
                            phone
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
            }
        `

        return shopify(query)
            .then(response => {
                const {customer, customerUserErrors} = response.customerUpdate
                if (customerUserErrors.length > 0) {
                    commit(
                        'application/SET_ERROR_MESSAGE',
                        {
                            endpoint: 'shopify/updateUser',
                            error: customerUserErrors,
                        },
                        {root: true},
                    )
                    return Promise.reject(customerUserErrors[0].message)
                } else {
                    commit('SET_USER', customer)
                    return Promise.resolve()
                }
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/updateUser',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    createUserAddress({commit}, address) {
        const token = getAccessToken()
        const query = `
        mutation {
            customerAddressCreate(
                customerAccessToken: "${token}",
                address: ${address.address}
            ) {
                customerUserErrors {
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
        return shopify(query)
            .then(response => {
                const {customerUserErrors} = response.customerAddressCreate
                if (customerUserErrors.length > 0) {
                    commit(
                        'application/SET_ERROR_MESSAGE',
                        {
                            endpoint: 'shopify/createUserAddress',
                            error: customerUserErrors,
                        },
                        {root: true},
                    )
                    return Promise.reject(customerUserErrors[0].message)
                } else {
                    return Promise.resolve(response)
                }
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/createUserAddress',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    updateUserAddress({commit}, address) {
        const token = getAccessToken()
        const query = `
            mutation {
                customerAddressUpdate(
                    customerAccessToken: "${token}",
                    id: "${address.id}",
                    address: ${address.address}
                ) {
                    customerUserErrors {
                        field
                        message
                    }
                    customerAddress {
                        id
                    }
                }
            }
        `

        return shopify(query)
            .then(response => {
                const {
                    customerAddress,
                    customerUserErrors,
                } = response.customerAddressUpdate
                if (customerUserErrors.length > 0) {
                    commit('application/SET_ERROR_MESSAGE', {
                        endpoint: 'shopify/updateUserAddress',
                        error: customerUserErrors,
                    })
                    return Promise.reject(customerUserErrors)
                } else {
                    return Promise.resolve()
                }
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/updateUserAddress',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    deleteAddress({commit}, id) {
        const token = getAccessToken()
        const query = `mutation {
            customerAddressDelete(id: "${id}", customerAccessToken: "${token}") {
                customerUserErrors {
                    code
                    field
                    message
                }
            }
        }`

        return shopify(query)
            .then(() => {
                return Promise.resolve()
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/deleteAddress',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },
    setSignageValidate({commit}, props) {
        const {
            collectionName,
            // oneTimeToken,
            storeCode,
            // recaptchaToken,
            productId,
            productName,
            userName,
        } = props
        return api
            .post('/recommends', {
                collectionName,
                // oneTimeToken,
                storeCode,
                // recaptchaToken,
                productId,
                productName,
                userName,
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },

    updateUserNickname({commit}, userInfo) {
        const {remoteId, nickname} = userInfo
        return api
            .patch('/customers', {
                remoteId: remoteId,
                name: nickname,
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: '/customers',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },
}
