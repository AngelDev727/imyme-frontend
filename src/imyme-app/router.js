import Vue from 'vue'
import Router from 'vue-router'
import Top from './views/Top.vue'

const Survey = () => import('@shared/views/Survey.vue')
const MyPage = () => import('./views/MyPage.vue')
const EditDetails = () => import('./views/EditDetails.vue')
const Results = () => import('./views/Results.vue')
const Product = () => import('./views/Product.vue')
const Checkout = () => import('./views/Checkout.vue')
// const UnsubscribeForm = () => import('./views/UnsubscribeForm.vue')
const Login = () => import('./views/Login')
const Signup = () => import('./views/Signup')
const PasswordReset = () => import('./views/PasswordReset')
const CartOverview = () => import('./views/CartOverview')
const SubscriptionsDescription = () =>
    import('./views/SubscriptionsDescription.vue')
const Guide = () => import('./views/Guide')
const Company = () => import('./views/Company')
const Contact = () => import('./views/Contact')
const Terms = () => import('./views/Terms')
const Privacy = () => import('./views/Privacy')
const CheckoutComplete = () => import('./components/Checkout/CheckoutComplete')
const Influencer = () => import('@app/views/Influencer')
const Feedback = () => import('@app/views/Feedback')
const Lp1 = () => import('./views/lp/Lp1.vue')
const Lp2 = () => import('./views/lp/Lp2.vue')
const F1 = () => import('./views/lp/Lp2F1.vue')
const LpTopView = () => import('./views/lp/LpTopView.vue')
const LpPowder = () => import('./views/lp/LpPowder.vue')
const SerumChange = () => import('./views/SerumChange.vue')
const ChangeSerumThanks = () =>
    import('./components/ChangeSerum/ChangeSerumThanks.vue')
const OrderHistory = () => import('@app/views/OrderHistory.vue')
const LpCampagin = () => import('./views/lp/LpCampagin.vue')
import {isLoggedIn} from '@shared/auth'
const EditPaymentMethod = () => import('./views/EditPaymentMethod.vue')
const OrderInputForm = () => import('./views/OrderInputForm')
const Ingredient = () => import('./views/Ingredient.vue')
const BrandPromise = () => import('./views/BrandPromise')
const TrialSet = () => import('./views/TrialSet')

Vue.use(Router)

export default new Router({
    mode: 'history',

    base: process.env.BASE_URL,

    async scrollBehavior(to) {
        const findEl = async (hash, x) => {
            return (
                document.querySelector(hash) ||
                new Promise(resolve => {
                    if (x > 50) {
                        return resolve()
                    }
                    setTimeout(() => {
                        resolve(findEl(hash, ++x || 1))
                    }, 1000)
                })
            )
        }
        const ADJUST_HEIGHT = 50
        const ADJUST_HEIGHT_SAFARI = 90

        if (to.hash) {
            const el = await findEl(to.hash)
            if ('scrollBehavior' in document.documentElement.style) {
                return window.scrollTo({
                    top: el.offsetTop - ADJUST_HEIGHT,
                    behavior: 'smooth',
                })
            } else {
                // For Safari / iOS
                return window.scrollTo(0, el.offsetTop - ADJUST_HEIGHT_SAFARI)
            }
        }

        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            name: 'top',
            component: Top,
            beforeEnter: (to, from, next) => {
                if (to.query.storeCode) {
                    next({
                        name: 'survey',
                        params: {
                            question: 'start',
                        },
                        query: {storeCode: to.query.storeCode},
                    })
                } else if (isLoggedIn()) {
                    const {
                        hash = null,
                        params: {override = false},
                    } = to
                    if (hash || override) {
                        next()
                    } else {
                        next({name: 'mypage'})
                    }
                } else {
                    next()
                }
            },
            meta: {
                title: '《公式》imyme（アイマイミー） | 植物＆サイエンスで肌トラブルのない素肌へ導く、ウォーターレス・スキンケア',
                description: '植物生体水90%＋サイエンス成分が肌の未来を目覚めさせる。植物&サイエンスで肌トラブルのない素肌へ導く、\
                    ウォーターレススキンケアのimyme（アイマイミー）は、肌悩みを解決する成分の発掘、開発、抽出法にこだわり、15問の問診によって、\
                    一人ひとりに合ったスキンケアを提供するブランドです。',
                keywords: 'ウォーターレススキンケア,ウォーターレスビューティ,パーソナライズスキンケア,オーダーメイドスキンケア,アイマイミー,\
                    imyme,植物生体水,大人ニキビ,にきび,化粧品,国産,通販,キメラボ株式会社',
            },
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/reset',
            name: 'password-reset',
            component: PasswordReset,
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: MyPage,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login', query: {next: 'mypage'}})
                } else {
                    next()
                }
            },
        },
        {
            path: '/edit-details',
            name: 'edit-details',
            component: EditDetails,
            props: true,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login', query: {next: 'edit-details'}})
                } else {
                    next()
                }
            },
        },
        {
            path: '/edit-payment-method',
            name: 'edit-payment-method',
            component: EditPaymentMethod,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login', query: {next: 'edit-payment-method'}})
                } else {
                    next()
                }
            },
        },
        {
            path: '/results',
            name: 'results',
            component: Results,
        },
        {
            path: '/product',
            name: 'product',
            component: Product,
        },
        {
            path: '/survey/start',
            redirect: '/survey/1',
        },
        {
            path: '/survey/:question',
            name: 'survey',
            component: Survey,
        },
        {
            path: '/survey/summary',
            name: 'surveySummary',
            component: Survey,
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartOverview,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    if (from.name === 'results') {
                        next({name: 'signup', query: {next: 'cart'}})
                    } else {
                        next({name: 'login', query: {next: 'cart'}})
                    }
                } else {
                    next()
                }
            },
        },
        {
            path: '/order/input-form',
            name: 'orderInputForm',
            component: OrderInputForm,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login'})
                } else {
                    next()
                }
            },
        },
        // Commented out because it is currently unused.
        // {
        //     path: '/subscriptions',
        //     name: 'subscriptions',
        //     component: UnsubscribeForm,
        //     beforeEnter: (to, from, next) => {
        //         if (!isLoggedIn()) {
        //             next({name: 'login', query: {next: 'unsubscribe'}})
        //         } else {
        //             next()
        //         }
        //     },
        // },
        // {
        //     path: '/unsubscribe/complete',
        //     name: 'unsubscribe-complete',
        //     component: UnsubscribeForm,
        //     beforeEnter: (to, from, next) => {
        //         if (!isLoggedIn()) {
        //             next({name: 'login', query: {next: 'unsubscribe-complete'}})
        //         } else {
        //             next()
        //         }
        //     },
        // },
        {
            path: '/checkout/complete',
            name: 'checkout-complete',
            component: CheckoutComplete,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login', query: {next: 'cart'}})
                } else {
                    next()
                }
            },
        },
        {
            path: '/subscriptions-description',
            name: 'subscriptionsDescription',
            component: SubscriptionsDescription,
        },
        {
            path: '/order-history',
            name: 'order-history',
            component: OrderHistory,
            beforeEnter: (to, from, next) => {
                if (!isLoggedIn()) {
                    next({name: 'login', query: {next: 'order-history'}})
                } else {
                    next()
                }
            },
        },
        {
            path: '/guide',
            name: 'guide',
            component: Guide,
        },
        {
            path: '/terms',
            name: 'terms',
            component: Terms,
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: Privacy,
        },
        {
            path: '/company',
            name: 'company',
            component: Company,
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
        },
        {
            path: '/influencer',
            name: 'influencer',
            component: Influencer,
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: Feedback,
        },
        {
            path: '/lp/cp',
            base: '/app/',
            name: 'lp_cp',
            component: Lp1,
        },
        {
            path: '/lp/cp_fv2',
            base: '/app/',
            name: 'cp_fv2',
            component: LpTopView,
        },
        {
            path: '/lp2/cp',
            base: '/app/',
            name: 'lp2_cp',
            component: Lp2,
        },
        {
            path: '/lp2/cp_1',
            base: '/app/',
            name: 'lp2_cp_1',
            component: Lp2,
            props: {cpId: 'cp_1'},
        },
        {
            path: '/lp2/cp_2',
            base: '/app/',
            name: 'lp2_cp_2',
            component: Lp2,
            props: {cpId: 'cp_2'},
        },
        {
            path: '/lp2/cp_3',
            base: '/app/',
            name: 'lp2_cp_3',
            component: Lp2,
            props: {cpId: 'cp_3'},
        },
        {
            path: '/lp2/cp_4',
            base: '/app/',
            name: 'lp2_cp_4',
            component: Lp2,
            props: {cpId: 'cp_4'},
        },
        {
            path: '/lp2/cp_f1',
            base: '/app/',
            name: 'lp2_cp_f1',
            component: F1,
        },
        {
            path: '/serum_change',
            name: 'serum_change',
            component: SerumChange,
        },
        {
            path: '/serum_change/serum_change_thanks',
            name: 'change_serum_confirm_thanks',
            component: ChangeSerumThanks,
        },
        {
            path: '/lp/cp2',
            base: '/app/',
            name: 'lp2',
            component: LpCampagin,
        },
        {
            path: '/maintenance',
            name: 'Maintenance',
            beforeEnter() {
                window.location = '/maintenance.html'
            },
        },
        {
            path: '/lp/bp',
            base: '/app/',
            name: 'powder',
            component: LpPowder,
        },
        {
            path: '/ingredient',
            name: 'ingredient',
            component: Ingredient,
            meta: {
                title:
                    'imymeのスキンケア成分 | 植物＆サイエンスで肌トラブルのない素肌へ導く、ウォーターレス・スキンケア imyme',
                description:
                    '植物&サイエンスで肌トラブルのない素肌へ導く、ウォーターレススキンケアのimyme（アイマイミー）は、\
                    肌悩みを解決する成分の発掘、開発、抽出法にこだわり、15問の問診によって、一人ひとりに合ったスキンケアを提供するブランドです。',
                keywords:
                    'ウォーターレススキンケア,ウォーターレスビューティ,パーソナライズスキンケア,オーダーメイドスキンケア,\
                    アイマイミー,imyme,植物生体水,大人ニキビ,にきび,化粧品,国産,通販,キメラボ株式会社',
            },
        },
        {
            path: '/brand',
            name: 'brand',
            component: BrandPromise,
            meta: {
                title:
                    '私たちの約束 | 植物＆サイエンスで肌トラブルのない素肌へ導く、ウォーターレス・スキンケア imyme',
                description:
                    '植物&サイエンスで肌トラブルのない素肌へ導く、ウォーターレススキンケアのimyme（アイマイミー）は、\
                    肌悩みを解決する成分の発掘、開発、抽出法にこだわり、15問の問診によって、一人ひとりに合ったスキンケアを提供するブランドです。',
                keywords:
                    'ウォーターレススキンケア,ウォーターレスビューティ,パーソナライズスキンケア,オーダーメイドスキンケア,\
                    アイマイミー,imyme,植物生体水,大人ニキビ,にきび,化粧品,国産,通販,キメラボ株式会社',
            },
        },
        {
            path: '/trial',
            name: 'trialset',
            component: TrialSet,
            meta: {
                title: 'imyme パーソナライズセラム：トライアルセット| 植物＆サイエンスで肌トラブルのない素肌へ導く、ウォーターレス・スキンケア imyme',
                description: '植物&サイエンスで肌トラブルのない素肌へ導く、ウォーターレススキンケアのimyme（アイマイミー）は、\
                    肌悩みを解決する成分の発掘、開発、抽出法にこだわり、15問の問診によって、一人ひとりに合ったスキンケアを提供するブランドです。',
                keywords: 'ウォーターレススキンケア,ウォーターレスビューティ,パーソナライズスキンケア,オーダーメイドスキンケア,\
                    アイマイミー,imyme,植物生体水,大人ニキビ,にきび,化粧品,国産,通販,キメラボ株式会社',
            },
        },
    ],
})
