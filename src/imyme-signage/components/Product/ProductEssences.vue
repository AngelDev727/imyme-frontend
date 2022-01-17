<template>
    <div>
        <div v-if="product && product.essences" class="essence-section">
            <Essence
                v-for="essence in product.essences.slice(0, 7)"
                :key="essence.id"
                :essence-id="essence.id"
                :essence-image="essence.image || false"
                class="essence-product-page"
            />
        </div>
    </div>
</template>

<script type="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Essence from '@shared/components/Essence.vue'
  import essenceDictionary from '@shared/essenceDictionary'

  @Component({
    components: {
        Essence,
    },
    props: {
        product: {
            type: Object,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            showEssenceSection: false,
        }
    },
    methods: {
        toggleEssenceDetails() {
            this.$data.showEssenceSection = !this.$data.showEssenceSection
        },
        essenceImage(id) {
            return essenceDictionary[id]
        },
    },
  })

  export default class ProductEssences extends Vue {}
</script>
