import Vue from 'vue'
import Router from 'vue-router'
import Start from './views/Start'
import Top from './views/Top'
import Creating from './views/Creating'

const Survey = () => import('@shared/views/Survey.vue')
const Results = () => import('./views/Results.vue')
const ProductInfo = () => import('./views/ProductInfo.vue')
const ProductCustomize = () => import('./views/ProductCustomize.vue')
const LoginPage = () => import('./views/LoginPage.vue')
const Completion = () => import('./views/Completion.vue')
const Maintenance = () => import('./views/Maintenance.vue')

import {isLoggedIn} from '@shared/auth'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'start',
            component: Start,
        },
        {
            path: '/home',
            name: 'home',
            component: Top,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        },
        {
            path: '/survey/:question',
            name: 'survey',
            component: Survey,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        {
            path: '/survey/summary',
            name: 'surveySummary',
            component: Survey,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        {
            path: '/results',
            name: 'results',
            component: Results,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        {
            path: '/product/:id/customize',
            name: 'product-customize',
            component: ProductCustomize,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        {
            path: '/product/:id',
            name: 'product-info',
            component: ProductInfo,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        {
            path: '/creating/:id',
            name: 'creating',
            component: Creating,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        {
            path: '/completion',
            name: 'completion',
            component: Completion,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        {
            path: '/maintenance',
            name: 'maintenance',
            component: Maintenance,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
    ],
})
