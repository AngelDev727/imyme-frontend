<script>
import Product from '@shared/components/Product'
import ProductScores from '@tablet/components/ProductScores'
import ProductTuning from '@tablet/components/ProductTuning'

export default {
    name: 'ProductInfo',

    components: {
        Product,
        ProductScores,
        ProductTuning,
    },

    computed: {
        recipe() {
            return this.$store.state.tablet.recipe
        },
        essences() {
            return this.$store.state.tablet.tuning
        },
        user() {
            return this.$store.state.user.user
        },
        customer() {
            return this.$store.state.tablet.customerDetails
        },
        childRecipeId() {
            return this.$store.state.tablet.childRecipeId
        },
    },

    methods: {
        getCustomerByRemoteId({commit}, remoteId) {
            //This function is for creating the customer on xshell backend
            return api.get(`/customers?remoteId=${remoteId}`).then(response => {
                commit('tablet/SET_CUSTOMER', response)
                return Promise.resolve(response)
            })
        },

        createOrder() {
            this.$store
                .dispatch('tablet/createOrder', {
                    customerId: this.customer.id,
                    recipeId: this.childRecipeId,
                })
                .then(response => {
                    this.$router.push({
                        name: 'creating',
                        params: {id: response.id},
                    })
                })
        },

        filterProductData(product) {
            return {
                type: product.type || '',
                title: product.name || '',
                price: null,
                image: product.image || '',
                drop: product.logo || '',
            }
        },
    },
}
</script>

<template>
    <div v-if="essences" class="py-5">
        <h4 class="pt-1 mb-0 text-center">確認画面</h4>
        <section class="mb-0 p-1 pb-0">
            <Product v-if="recipe" :product="filterProductData(recipe)" :center-content="true">
                <div slot="description">{{ recipe.overview }}</div>
                <ProductScores
                    slot="scores"
                    class="w-100"
                    :scores="{
                        エイジング: recipe.agingEval,
                        毛穴: recipe.poreEval,
                        保湿: recipe.moistureEval,
                        ニキビ: recipe.acneEval,
                    }"
                />
            </Product>
        </section>
        <ProductTuning class="mt-0 p-1 pt-0" :essences="essences" :edit-mode="false" />
        <button class="btn btn-secondary m-auto w-center-50" @click="createOrder">
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-forward" />
            </svg>
            <span class="m-auto">OK</span>
        </button>
    </div>
</template>
