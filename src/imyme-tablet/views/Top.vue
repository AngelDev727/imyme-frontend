<template>
    <div class="home last-padding">
        <HeroSection />
        <div class="flex-row flex-se mt-0 pt-0 fixed-bottom">
            <router-link
                class="btn btn-secondary btn-cta mx-5 mt-1 mb-3"
                :to="{ name: 'login' }"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-matching" />
                </svg>
                <span
                    class="matching-button m-auto text-center"
                    data-testid="matching-start-button"
                >
                    <div>
                        matching
                        <br />start!
                    </div>
                </span>
            </router-link>
        </div>
        <HowToSection />
        <TopSections />
    </div>
</template>

<script>
import HeroSection from '@tablet/components/HeroSection'
import MatchingAndFreshness from '@shared/components/Top/MatchingAndFreshness'
import TopSections from '@shared/components/Top/TopSections'
import HowToSection from '@tablet/components/HowToSection'
import {isLoggedIn} from '@shared/auth'

export default {
    name: 'Top',

    components: {
        HeroSection,
        TopSections,
        HowToSection,
    },

    computed: {
        loggedIn() {
            return isLoggedIn()
        },
    },

    created() {
        if (sessionStorage.getItem('surveyAnswers')) {
            this.$store.commit(
                'survey/SET_SURVEY',
                JSON.parse(sessionStorage.getItem('surveyAnswers')),
            )
        }
        if (sessionStorage.getItem('answerId')) {
            this.$store.commit(
                'survey/SET_ANSWER_ID',
                JSON.parse(sessionStorage.getItem('answerId')),
            )
        }
        if (sessionStorage.getItem('checkout')) {
            const checkout = JSON.parse(sessionStorage.getItem('checkout'))
            const {edges} = checkout.lineItems

            let lineItems = edges.map(item => {
                return {
                    variantId: `${item.node.variant.id}`,
                    quantity: '1',
                }
            })
        }
        if (this.loggedIn) {
            this.$store.dispatch('user/getUser').then(response => {
                const {id} = response
                this.$store
                    .dispatch('survey/getAnswerId', id)
                    .then(answerId => {
                        this.$store
                            .dispatch('survey/getResultsWithAnswerId', answerId)
                            .catch(error => {
                                this.$store.dispatch(
                                    'survey/attachAnswerIdToUser',
                                    answerId,
                                )
                            })
                    })
            })
        } else {
            this.$store.dispatch('user/getUser')
        }
    },

    methods: {
        toTop(event) {
            const el = document.scrollingElement || document.documentElement
            el.scrollTop = 0
        },
    },
}
</script>
