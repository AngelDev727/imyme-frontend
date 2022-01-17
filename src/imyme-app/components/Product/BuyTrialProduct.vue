<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Getter} from 'vuex-class'
import {formatPrice, getLimitedPromotionInfo} from '@/imyme-app/utils'

@Component
export default class BuyTrialProduct extends Vue {
    public name: string = 'BuyTrialProduct'

    @Getter('survey/nickName') userName

    formatPrice() {
        return formatPrice(getLimitedPromotionInfo('trial set').price)
    }
}
</script>

<template>
    <div class="results-serum-container">
        <div class="results-serum-content">
            <h3 class="px-1 pt-2 pb-0 text-subheading ls-2">
                {{ userName }}へ
            </h3>
            <div class="results-serum-description">
                しっかり2週間、<br />
                お肌と向き合える<br />
                トライアルセット
            </div>

            <div class="results-product-layout-container">
                <div class="results-product text-center ml-1 mr-1 mb-1">
                    <div class="inner">
                        <div class="inner-img">
                            <img
                                src="@app/assets/images/trialset.jpg"
                                alt="product"
                                class="results-product-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-90 m-auto">
                <div class="results-productall w-90 m-auto">
                    <div class="discount-price">
                        <div class="ta-center">
                            <span class="results-product-text">
                                ¥{{ formatPrice() }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.results-serum-container {
    margin: 0 -5%;
    background-color: #f0f3f7;
}
.results-serum-content {
    margin: auto;
    padding: 1rem;
    background-color: #fff;
}
.text-subheading {
    font-size: 1.6rem;
    line-height: 3.2rem;
    text-transform: none;
}
.results-serum-description {
    text-align: center;
    font-size: 2.2rem;
    line-height: 4.4rem;
    word-break: keep-all;
    margin: 2rem 0;
}
.inner-img .results-product-image {
    max-height: 57vh;
    object-fit: contain;
}
.results-product-text {
    line-height: 4.8vw;
    font-size: 7.2vw;
    letter-spacing: 2px;
}
.results-productall {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.2vw 0;
}
.discount-price {
    padding-top: 2.1vw;
}
.ta-center {
    text-align: center;
}

@media only screen and (min-width: 75em) {
    .results-product-layout-container {
        margin: 0 1rem;
        width: calc(100% - 2rem);
    }
    .results-product-layout-container > .results-product {
        width: 250%;
    }
}
</style>
