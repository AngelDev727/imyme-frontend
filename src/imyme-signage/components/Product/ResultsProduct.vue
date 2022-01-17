<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ProductEssences from '@signage/components/Product/ProductEssences.vue'

  @Component({
    components: {
      ProductEssences,
    },

    data() {
      return {
        showDetails: false,
        productInfo: {},
        productId: this.$store.state.products.productModal,
      }
    },
  })

  export default class ResultsProduct extends Vue {

    private async getProductInfo(productId): Promise<void> {
      const recipe = await this.$store.dispatch(
        'tablet/getRecipe',
        productId,
      );
      this.$data.productInfo = recipe;
      if (recipe.remoteId) {
        const {
          id,
          images,
          title,
          variants,
          description,
        } = await this.$store.dispatch(
          'products/getProductByRemoteId',
          recipe.remoteId,
        );
        this.$data.productInfo = {
          ...this.$data.productInfo,
          shopify_id: id,
          images,
          title,
          variants,
          description,
        };
        sessionStorage.setItem(
          productId,
          JSON.stringify(this.$data.productInfo),
        )
      }
    }

    public productImage(): string {
        return require("@signage/assets/images/products/bottle/imyme_vender_product_serum_" + this.$data.productInfo.name + ".jpg");
    }

    public async created() {
      if (this.$data.productId) {
        if (!sessionStorage.getItem(this.$data.productId)) {
          this.getProductInfo(this.$data.productId)
        } else {
          this.$data.productInfo = JSON.parse((sessionStorage.getItem(this.$data.productId) || ""))
        }
      }
    }

    public async mounted() {
      const {line_items} = JSON.parse((sessionStorage.getItem('checkout_snapshot') || ""))
    }
  }
</script>

<template>
    <div>
        <div class="results-product-layout-container pb-1">
            <div class="results-product text-center m-2">
                <div>
                    <img :src="productImage()" alt="product" class="results-product-image"/>
                </div>
            </div>
            <div class="results-product-header">
                <div v-if="productInfo.logo">
                    <img v-lazy="productInfo.logo" alt="product" class="results-product-logo"/>
                </div>
                <div>
                    <div class="results-product-text">
                        <span class="text-capitalize">{{productInfo.type}}</span>
                        {{ productInfo.name }}
                    </div>
                </div>
            </div>
            <div class="text-regular left p-2 mb-3 text-product-description results-product-description">
                {{ productInfo.description }}
            </div>
            <div style="position: relative">
                <h3 class="text-subheading pl-2 results-product-description-heading text-left">使用成分</h3>
                <span class="mt-2 text-red product-touch">
                    <img src="@signage/assets/images/icon/touch-icon.png" width="40px">
                    画像をタッチ！<br>成分の詳細が見られます。
                </span>
            </div>
            <div class="text-regular p-2 text-product-description results-product-description text-left">
                <ProductEssences v-if="productInfo.essences" :product="productInfo"/>
            </div>
            <div class="text-regular left pl-2 text-product-description results-product-description">
                <span v-for="(essence, index) in productInfo.essences" :key="essence.id" class="text-essence-description">
                    {{ essence.name }}
                    <span v-if="index < productInfo.essences.length">/</span>
                </span>
            </div>
        </div>
    </div>
</template>
