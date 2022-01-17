import {ActionTree} from 'vuex'
import {AuthState} from './types'
import {RootState} from '../../types'
import api, {shopify} from '@/shared/api'
import {setAccessToken} from '@/shared/auth'

const setErrorMessage = 'application/SET_ERROR_MESSAGE'
export const actions: ActionTree<AuthState, RootState> = {
    signUp({commit}, creds) {
        const query = `
        mutation {
            customerCreate(input: {
                email: "${creds.email}",
                password: "${creds.password}"
            }) {
                customerUserErrors {
                    field
                    message
                }
                customer {
                    id
                }
            }
        }`
        return shopify(query)
            .then(response => {
                const {customer, customerUserErrors} = response.customerCreate
                if (customerUserErrors.length > 0) {
                    commit(
                        setErrorMessage,
                        {
                            endpoint: 'shopify/signUp',
                            error: customerUserErrors,
                        },
                        {root: true},
                    )
                    return Promise.reject(customerUserErrors)
                } else {
                    return this.dispatch('auth/createCustomer', customer)
                }
            })
            .catch(error => {
                commit(
                    setErrorMessage,
                    {
                        endpoint: 'shopify/signUp',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    addStoreAttrAction({commit}, data) {
        return api.post('/user/store/v1', data)
    },

    createCustomer({commit}, customer) {
        //This function is for creating the customer on xshell backend
        return api
            .post('/customers', {
                remoteId: customer.id,
            })
            .then(response => {
                return Promise.resolve(customer)
            })
            .catch(error => {
                return Promise.resolve(customer)
            })
    },

    signIn({commit}, creds) {
        return api
            .post('/customers/sign-in', {
                email: creds.email,
                password: creds.password,
            })
            .then((response: any) => {
                const {
                    customerAccessToken,
                    userErrors,
                } = response.customerAccessTokenCreate
                if (userErrors.length > 0) {
                    commit(
                        setErrorMessage,
                        {
                            endpoint: '/customers/sign-in',
                            error: userErrors,
                        },
                        {root: true},
                    )
                    return Promise.reject(userErrors[0].message)
                } else {
                    setAccessToken(customerAccessToken.accessToken)
                    return Promise.resolve()
                }
            })
            .catch(error => {
                commit(
                    setErrorMessage,
                    {
                        endpoint: '/customers/sign-in',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject()
            })
    },

    sendPasswordRecovery({commit}, creds) {
        const query = `
        mutation {
            customerRecover(email: "${creds.email}") {
                customerUserErrors {
                    field
                    message
                }
            }
        }
        `
        return shopify(query)
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                commit(
                    setErrorMessage,
                    {
                        endpoint: 'shopify/sendPasswordRecovery',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    setNewPassword({commit}, props) {
        const base64Id = new Buffer(
            `gid://shopify/Customer/${props.userId}`,
        ).toString('base64')

        const query = `
        mutation {
            customerReset(id: "${base64Id}", input: {
                resetToken: "${props.resetToken}",
                password: "${props.password}"
            }) {
                customerAccessToken {
                    accessToken
                    expiresAt
                }
                customerUserErrors {
                    field
                    message
                }
            }
        }
        `
        return shopify(query).then(response => {
            const {
                customerAccessToken,
                customerUserErrors,
            } = response.customerReset
            if (customerUserErrors.length > 0) {
                commit(
                    setErrorMessage,
                    {
                        endpoint: 'shopify/setNewPassword',
                        error: customerUserErrors,
                    },
                    {root: true},
                )
                return Promise.reject(customerUserErrors)
            } else {
                return Promise.resolve()
            }
        })
    },
}
