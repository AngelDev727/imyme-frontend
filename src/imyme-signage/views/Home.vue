<template>
  <div id="home" class="sticky-bg">
    <SerumColumn />
    <ProductModal />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ProductModal from '@signage/components/Product/ProductModal.vue';
  import SerumColumn from '@signage/components/SerumColumn.vue';

  @Component({
    components: {
      ProductModal,
      SerumColumn,
    },
  })

  export default class Home extends Vue {}
</script>
