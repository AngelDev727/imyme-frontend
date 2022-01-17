<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ResultsProduct from '@signage/components/Product/ResultsProduct.vue'
  import EssenceModal from '@shared/components/EssenceModal.vue'

  @Component({
    components: {
      ResultsProduct,
      EssenceModal,
    },
  })

  export default class ProductSection extends Vue {}
</script>

<template>
    <div>
        <div class="my-4 results-product-box">
            <ResultsProduct />
        </div>
        <EssenceModal />
    </div>
</template>
