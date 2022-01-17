import axios from 'axios'
import {getAccessToken} from '@shared/auth'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const {VUE_APP_API} = process.env || null
const {VUE_APP_SHOPIFY_APP_URL} =
    process.env || 'https://imyme-cosme.myshopify.com'
const {VUE_APP_SHOPIFY_STOREFRONT_API_KEY} = process.env || null

export function shopify(query) {
    try {
        return fetch(`${VUE_APP_SHOPIFY_APP_URL}/api/2020-04/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': VUE_APP_SHOPIFY_STOREFRONT_API_KEY,
            },
            body: JSON.stringify({query}),
        })
            .then(response => {
                return response.json()
            })
            .then(resp => {
                const {data, errors} = resp
                if (errors) {
                    return Promise.reject(errors)
                } else {
                    return data
                }
            })
    } catch (error) {
        return Promise.reject(error)
    }
}

const api = axios.create({
    baseURL: VUE_APP_API ? `${VUE_APP_API}/api` : `/api`,
})

api.interceptors.request.use(
    function(config) {
        const token = getAccessToken()
        if (token) config.headers.common.Authorization = token
        return config
    },
    function(error) {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    function({data}) {
        return data
    },
    function(error) {
        return Promise.reject(error)
    },
)

export default api
