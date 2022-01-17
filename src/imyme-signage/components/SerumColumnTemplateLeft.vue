<template>
    <div :class=columnClass>
        <div :class="`home-loop${i}`" :style="animationStop" v-for="i in 2">
            <a class="home-cell" v-for="(product, i) in products">
                <div v-if="i === 0 && existsNewProduct" class="flex-row flex-ai home-cell-frame" @click="showProductModal(product.productId)">
                    <transition v-if="isLoadingColumn" name="fade" mode="in-out">
                        <div class="bg-body animation--section animation--section__column">
                            <svg
                                    class="icon-stroke animation animation--splash"
                                    :style="'animation-duration:1500ms'"
                            >
                                <use xlink:href="#icon-logo"/>
                            </svg>
                        </div>
                    </transition>
                    <div v-if="isFlash" class="home-cell-cover"></div>
                    <transition name="fade2" mode="in-out">
                        <div v-if="!isLoadingColumn" class="add-product-animation flex-row flex-ai home-cell-frame">
                            <div class="home-cell-icon">
                                <img class="mb-1" :src="getIconImagePath(product.productName)"/>
                                <p>{{ product.productName }}</p>
                                <p class="product-user-name">{{ product.userName }}</p>
                            </div>
                            <div class="home-cell-bottle">
                                <img :src="getBottleImagePath(product.productName)"/>
                            </div>
                            <img class="touch-icon" src="@signage/assets/images/icon/touch-icon.png" width="40px">
                        </div>
                    </transition>
                </div>
                <div v-else class="flex-row flex-ai home-cell-frame" @click="showProductModal(product.productId)">
                    <div class="home-cell-icon">
                        <img class="mb-1" :src="getIconImagePath(product.productName)"/>
                        <p>{{ product.productName }}</p>
                        <p class="product-user-name">{{ product.userName }}</p>
                    </div>
                    <div class="home-cell-bottle">
                        <img :src="getBottleImagePath(product.productName)"/>
                    </div>
                    <img class="touch-icon" src="@signage/assets/images/icon/touch-icon.png" width="40px">
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    const waitAnimationProduct = 2500;
    const waitFlash = 5000;
    const waitAnimationColumn = 9500;

    @Component({
        data() {
            return {
                isLoadingColumn: true,
                isFlash: false,
                animationStop: '',
            }
        },
        props: {
            columnClass: {
                type: String,
                required: true,
            },
            products: {
                type: Array,
                required: true,
            },
            existsNewProduct: {
                type: Boolean,
                required: false,
            },
        },
    })

    export default class SerumColumnTemplateLeft extends Vue {
        showProductModal(id: string): void {
            this.$store.state.products.productModal = id;
        }

        getIconImagePath(name: string): string {
            return require("@signage/assets/images/products/icon/imyme_vender_icon_serum_" + name + ".jpg");
        }

        getBottleImagePath(name: string): string {
            return require("@signage/assets/images/products/bottle/imyme_vender_product_serum_" + name + ".jpg");
        }

        public mounted() {
            if (this.$props.existsNewProduct) {
                this.$data.animationStop = {"animation-play-state": "paused"};
                setTimeout(() => this.$data.isLoadingColumn = false, waitAnimationProduct);
                setTimeout(() => this.$data.isFlash = true, waitFlash);
                setTimeout(() => {
                    this.$data.animationStop = '';
                    this.$data.isFlash = false;
                }, waitAnimationColumn);
            }
        }
    }
</script>
