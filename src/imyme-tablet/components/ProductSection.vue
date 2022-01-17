<script>
import Product from '@shared/components/Product'
import ProductScores from '@tablet/components/ProductScores'

export default {
    name: 'ProductSection',

    components: {
        Product,
        ProductScores,
    },

    props: {
        product: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            productInfo: {},
        }
    },

    mounted() {
        if (this.product.id) {
            this.$store
                .dispatch('tablet/getRecipe', this.product.id)
                .then(response => {
                    this.productInfo = response
                })
        }
    },

    methods: {
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
    <div>
        <section class="p-1 mb-0">
            <h5 class="pb-1 text-center text-subheading ls-2">あなたにぴったりのセラム</h5>
            <Product
                v-if="productInfo.id"
                :product="filterProductData(productInfo)"
                :center-content="true"
            >
                <div slot="description">{{ productInfo.overview }}</div>
                <ProductScores
                    slot="scores"
                    class="w-100"
                    :scores="{
                        エイジング: productInfo.agingEval,
                        毛穴: productInfo.poreEval,
                        保湿: productInfo.moistureEval,
                        ニキビ: productInfo.acneEval,
                    }"
                />
            </Product>
        </section>
    </div>
</template>
