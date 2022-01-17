<script>
import ProductSection from '@tablet/components/ProductSection'
import ProductTuning from '@tablet/components/ProductTuning'

export default {
    name: 'ProductCustomize',

    components: {
        ProductSection,
        ProductTuning,
    },

    data() {
        return {
            essenceModifications: [],
            isValidChild: false,
        }
    },

    computed: {
        recipe() {
            return this.$store.state.tablet.recipe
        },
        modifications() {
            if (this.$store.state.tablet.modifications) {
                return this.$store.state.tablet.modifications[1].essences.filter(
                    essence => essence.level !== 'none',
                )
            }
            return []
        },
    },

    mounted() {
        this.$store.dispatch('application/loadingPromiseAdd', [
            this.$store.dispatch(
                'tablet/getRecipeModifications',
                this.recipe.id,
            ),
        ])
    },

    methods: {
        validChild(value) {
            this.isValidChild = value
        },
    },
}
</script>

<template>
    <div class="py-5">
        <h4 class="pt-1 mb-0 text-center">TUNING</h4>
        <ProductSection :product="recipe" :edit-mode="true" />
        <!-- <section class="mb-0 my-1 p-1">
            <h3 class="mb-1">あなたにぴったりの{{ recipe.type }}</h3>
        </section>-->
        <div v-if="modifications && modifications.length > 0">
            <ProductTuning class="mt-1" :essences="modifications" @is-valid="validChild" />
            <router-link
                v-if="isValidChild"
                class="btn btn-secondary m-auto w-center-50"
                :to="{name: 'product-info', params: {id: recipe.id}}"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-forward" />
                </svg>
                <span class="m-auto">OK</span>
            </router-link>
            <div v-else class="text-center">
                <span class="product-id">
                    Sorry, this combination is not available right now. Please
                    try another combination.
                </span>
            </div>
        </div>
        <section v-else class="mb-0 my-1 p-1">
            <h3 class="mb-1">No child recipes found</h3>
        </section>
    </div>
</template>
