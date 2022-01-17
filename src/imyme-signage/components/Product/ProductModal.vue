<template>
    <div>
        <div v-if="showModal" class="essence-backdrop" @click.self="closeModal"/>
        <transition name="pop" mode="out-in">
            <div v-if="showModal" class="flow-modal px-2 py-2 bg-white">
                <div class="flow-cross collapse-icon cross" @click="closeModal">
                    <div class="bar"/>
                    <div class="bar"/>
                    <div class="bar"/>
                </div>
                <div class="m-0 bg-body top-section-transitions-3">
                    <div id="product-modal"></div>
                    <EssenceModal/>
                    <ProductSection/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import EssenceModal from '@signage/components/Product/EssenceModal.vue'
  import ProductSection from '@signage/components/Product/ProductSection.vue'

  @Component({
    components: {
      EssenceModal,
      ProductSection,
    },
    computed: {
      showModal() {
        return this.$store.state.products.productModal;
      },
    },
  })

  export default class ProductModal extends Vue {
    closeModal() {
      this.$store.state.products.productModal = null;
    }
  }
</script>


