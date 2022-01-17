import { ActionTree } from 'vuex'
import { ProductsState } from './types'
import { state } from './index'
import { RootState } from '../../types'
import api, { shopify } from '@/shared/api'

export const actions: ActionTree<ProductsState, RootState> = {
    getItems({ commit }) {
        const query = `
        {
            shop {
                products(first: 100) {
                    edges {
                        node {
                            id
                            title
                            priceRange {
                                minVariantPrice {
                                    amount
                                }
                            }
                            images(first:5) {
                               edges {
                                   node {
                                    originalSrc
                                   }
                               }
                            }
                            variants(first:5) {
                                edges {
                                    node {
                                        id
                                    }
                                }
                            }
                            productType
                            description
                        }
                    }
                }
            }
        }
        `

        return shopify(query)
            .then(response => {
                const { edges: articles } = response.shop.products
                commit('SET_PRODUCTS', articles)
                return Promise.resolve()
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/getItems',
                        error: error,
                    },
                    { root: true },
                )
                return Promise.reject(error)
            })
    },

    getItemByHandle({ commit }, props) {
        const { handle } = props

        const query = `
        {
            shop{
                productByHandle(handle:"${handle}"){
                    images(first:1){
                        edges{
                            node{
                                originalSrc
                            }
                        }
                    }
                }
            }
        }
        `
        return shopify(query)
            .then(response => {
                return Promise.resolve(
                    response.shop.productByHandle.images.edges[0].node,
                )
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/getItemByHandle',
                        error: error,
                    },
                    { root: true },
                )
                return Promise.reject(error)
            })
    },

    getProductByRemoteId({ commit }, remoteId) {
        const base64Id = new Buffer(remoteId).toString('base64')

        const query = `
        {
            node(id: "${base64Id}") {
                id
                ... on Product {
                    title
                    id
                    priceRange {
                        minVariantPrice {
                            amount
                        }
                    }
                    images(first:5) {
                       edges {
                           node {
                            originalSrc
                           }
                       }
                    }
                    variants(first:100) {
                        edges {
                            node {
                                id
                                title
                                availableForSale
                            }
                        }
                    }
                    productType
                    description
                    totalInventory
                }
            }
        }
        `

        return shopify(query).then(response => {
            return Promise.resolve(response.node)
        })
    },

    getProductPrice({ commit }, remoteId) {
        const base64Id = new Buffer(remoteId).toString('base64')
        const query = `
        {
            node(id: "${base64Id}") {
                id
                ... on Product {
                    priceRange {
                        minVariantPrice {
                            amount
                        }
                    }
                }
            }
        }
        `

        return shopify(query).then(response => {
            return Promise.resolve(response.node)
        })
    },

    getVariantPrice({ commit }, remoteId) {
        const base64Id = new Buffer(remoteId).toString('base64')
        const query = `
        {
            node(id: "${base64Id}") {
                id
                ... on ProductVariant {
                    priceV2 {amount}
                }
            }
        }
        `

        return shopify(query).then(response => {
            return Promise.resolve(response.node)
        })
    },

    getEssenceById({ commit }, essenceId) {
        return api
            .get(`/essences/${essenceId}`)
            .then(response => {
                commit('SET_ESSENCE', response)
                return Promise.resolve(response)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },

    getRecipes({ commit }, id) {
        const productId = id.replace('gid://shopify/Product/', '')
        return api
            .get(`/recipes/remote-id/${productId}`)
            .then((response) => {
                return Promise.resolve(response)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },

    resetEssence({ commit }) {
        commit('RESET_ESSENCE')
    },

    async getProductInfo({ commit, dispatch }, productId) {
        let productInfo: any = {}
        try {
            const recipe = await dispatch('tablet/getRecipe', productId, {
                root: true,
            })
            productInfo = recipe
            if (recipe.remoteId) {
                const {
                    id,
                    images,
                    priceRange,
                    title,
                    variants,
                    description,
                    totalInventory,
                } = await dispatch('getProductByRemoteId', recipe.remoteId)
                productInfo = {
                    ...productInfo,
                    shopify_id: id,
                    images,
                    priceRange,
                    title,
                    variants,
                    description,
                    totalInventory,
                }

                sessionStorage.setItem(productId, JSON.stringify(productInfo))

                return Promise.resolve(productInfo)
            }
        } catch (error) {
            return Promise.reject(error)
        }
    },
}
