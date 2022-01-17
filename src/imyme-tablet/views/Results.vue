<template>
    <div v-if="results && bestMatch" class="my-5 pb-5">
        <h4 class="pt-1 text-center text-uppercase ls-2">{{ userName }}の分析結果</h4>
        <ProductSection :product="bestMatch" />
        <MyStats :results="results" />
        <router-link
            class="btn btn-secondary w-50 m-auto"
            :to="{name: 'product-customize', params: {id: bestMatch.id}}"
        >
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-forward" />
            </svg>
            <span class="m-auto">OK</span>
        </router-link>
    </div>
</template>

<script>
import MyStats from '@tablet/components/MyStats'
import ProductSection from '@tablet/components/ProductSection'

export default {
    name: 'Results',

    components: {
        MyStats,
        ProductSection,
    },

    data() {
        return {
            bestMatch: null,
            productInfo: {},
        }
    },

    computed: {
        results() {
            return this.$store.state.survey.results
        },
        recipe() {
            return this.$store.state.tablet.recipe
        },
        user() {
            return this.$store.state.user.user
        },
        answerId() {
            return this.$store.state.survey.answerId
        },
        userName() {
            return this.$store.getters['user/userName']
        },
    },

    watch: {
        results() {
            this.bestMatch = this.getBestMatch('serum')
        },
    },

    created() {
        if (this.user && this.user.id) {
            // have an account so try -
            // 1) get answers saved in results
            // 2) use an answerId to create results
            // 3) never finished survey so redirect and start survey
            this.$store.dispatch('application/loadingPromiseAdd', [
                this.$store
                    .dispatch('survey/getAnswerId', this.user.id)
                    .then(answerId => {
                        this.$store
                            .dispatch('survey/createResults', answerId)
                            .catch(() => {
                                this.router.push({
                                    name: 'Survey',
                                    params: {question: '1'},
                                })
                            })
                    }),
            ])
            // .catch(() => {
            //     this.$store
            //         .dispatch('survey/createResults', this.answerId)
            //         .catch(() => {
            //             this.router.push({
            //                 name: 'Survey',
            //                 params: {question: '1'},
            //             })
            //         })
        } else {
            // type url straight into search/ don't know how you ended up here
            // 1) redirect to login page
            this.$router.push({name: 'login'})
        }
    },

    methods: {
        getBestMatch(type) {
            //let bestMatch = this.results.recommends[type][0]
            let bestMatch = {
                id: 'b86287d5-d854-49ee-ac09-f09d9513ad2b',
            }

            // this.results.recommends[type].forEach(product => {
            //     if (product.matching_rate > bestMatch.matching_rate) {
            //         bestMatch = product
            //     }
            // })
            this.$store.dispatch('application/loadingPromiseAdd', [
                this.$store.dispatch('tablet/getRecipe', bestMatch.id),
            ])
            return bestMatch
        },
    },
}
</script>
