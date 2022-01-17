import {ActionTree} from 'vuex'
import {SocialState, ArticleText} from './types'
import {state} from './index'
import {RootState} from '../../types'
import api, {shopify} from '@/shared/api'

export const actions: ActionTree<SocialState, RootState> = {
    getBlogPosts({commit}, props) {
        const {blogHandle} = props
        const query = `
        {
            blogByHandle(handle:"${blogHandle}"){
                articles(first:10) {
                    edges {
                        node {
                            id
                            publishedAt
                            excerpt
                            image {
                                originalSrc
                            }
                            title
                            handle
                            blog{
                                handle
                            }
                        }
                    }
                }
            }
        }
        `
        return shopify(query)
            .then(response => {
                const {edges} = response.blogByHandle.articles
                return Promise.resolve(edges)
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/getBlogPosts',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    getBlogPost({commit}, props): ArticleText {
        const {blogHandle, articleHandle} = props

        const query = `
        {
            blogByHandle(handle:"${blogHandle}"){
                articleByHandle(handle:"${articleHandle}"){
                    authorV2{
                        name
                    }
                    contentHtml
                    image{
                        originalSrc
                    }
                    publishedAt
                    title
                    tags
                }
            }
        }
        `
        return shopify(query)
            .then(response => {
                const {articleByHandle} = response.blogByHandle
                return Promise.resolve(articleByHandle)
            })
            .catch(error => {
                commit(
                    'application/SET_ERROR_MESSAGE',
                    {
                        endpoint: 'shopify/getBlogPost',
                        error: error,
                    },
                    {root: true},
                )
                return Promise.reject(error)
            })
    },

    getInstagramPictures({commit}) {
        return api
            .get(`/instagram`)
            .then((response: any) => {
                const {images} = response
                commit('SET_INSTAGRAM_PICTURES', images ? images : [])
            })
            .catch(error => {
                return Promise.reject(error)
            })
    },

    sendInquiry({commit}, inquiry) {
        return api
            .post('/inquiries', {
                content: inquiry.content,
                email: inquiry.email,
                firstName: inquiry.firstName,
                lastName: inquiry.lastName,
                phone: inquiry.phone,
            })
            .then(() => {
                return Promise.resolve()
            })
    },
}
