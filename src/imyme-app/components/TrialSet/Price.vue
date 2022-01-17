<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {formatPrice, getLimitedPromotionInfo} from '@/imyme-app/utils'

@Component
export default class Price extends Vue {
    public name: string = 'Price'

    get trialSetPrice() {
        return formatPrice(getLimitedPromotionInfo('trial set').price)
    }
}
</script>

<template>
    <div class="price-wrap">
        <div class="product-name">
            4 in 1 ウォーターレス・スキンケア パーソナライズセラム
            トライアルセット【初回限定】【送料無料】【未開封のみ8日間返品可】
        </div>
        <div class="price">
            <span>送料無料</span>{{trialSetPrice}}円<span class="taxincluded">税込</span>
        </div>
        <div>
            ※初回限定価格でのご購入はお一人様1セット限りとなります。※他の商品と同時注文不可
        </div>
    </div>
</template>

<style scoped>
.price-wrap {
    text-align: center;
}
.product-name {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 1em auto;
}
.product-name:before {
    content: 'NEW';
    background: #111;
    color: #fff;
    padding: 0 0.5em;
    font-size: 1.125rem;
    margin-right: 5px;
}
.price {
    margin: 0.8rem auto;
    font-size: 24px;
    font-weight: 600;
}
.price span {
    font-size: 12px;
    font-weight: 600;
    padding: 2px 7px 1.6px;
    border: 1px solid #fa8072;
    margin-right: 10px;
    color: #fa8072;
}
.price .taxincluded {
    margin-left: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.4;
    border: none;
    color: #111;
}
@media only screen and (max-width: 768px) {
    .product-name {
        font-size: 2rem;
        margin: 1em auto;
        text-align: left;
        width: 90%;
    }
    .product-name:before {
        font-size: 1.8rem;
    }
    .price .taxincluded {
        font-size: 2rem;
    }
}
</style>
