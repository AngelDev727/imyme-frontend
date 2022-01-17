<template>
    <div>
        <div v-if="product" class="product">
            <div class="product-img">
                <div
                    v-if="disableLink"
                    :class="[
                        product.length > 1
                            ? 'results-products-img'
                            : 'results-product-img',
                        {
                            'trial-set-img': product[0].type === 'trial set',
                        },
                    ]"
                >
                    <div v-for="(item, index) in product" :key="index">
                        <img :src="item.image" alt="product" />
                    </div>
                </div>
                <router-link v-else :to="link">
                    <div
                        :class="[
                            product.length > 1
                                ? 'results-products-img'
                                : 'results-product-img',
                            {
                                'trial-set-img':
                                    product[0].type === 'trial set',
                            },
                        ]"
                    >
                        <div v-for="(item, index) in product" :key="index">
                            <img :src="item.image" alt="product" />
                        </div>
                    </div>
                </router-link>
            </div>
            <div
                class="product-content"
                :class="{'product-content-center': centerContent}"
            >
                <p class="product-content-intro">
                    <span v-if="isLimitedProduct && !isPowder">
                        季節の特別なエッセンスを配合しております。<br />※限定販売の為、こちらの製品は単品販売のみとなります。
                    </span>
                    <span v-else-if="isLimitedProduct && isPowder">
                        ※限定販売の為、こちらの製品は単品販売のみとなります。
                    </span>
                    <span v-else-if="type === 'soap'">
                        肌に負担をかけずに汚れをきっちり落とす、こだわり石鹸をお届けします。
                    </span>
                    <span v-else>
                        お肌の状態から季節のエッセンスを配合し、ベストなセットをお届けします。
                    </span>
                </p>
                <div v-for="(item, index) in product" :key="index">
                    <div v-if="item.type === 'serum'">
                        <div class="product-header">
                            <div class="results-product-skincare-icon bg-white">
                                <Component :is="item.serumType" />
                            </div>

                            <div class="product-title pl-1">
                                <div class="product-id">
                                    <p>{{ item.type }}</p>
                                    <p>{{ item.title }}</p>
                                </div>
                            </div>
                            <template v-if="showPrice && product.length != 2">
                                <div
                                    v-if="showDiscount(item)"
                                    class="product-price"
                                >
                                    <div
                                        class="product-price-txt product-price-discounted"
                                    >
                                        ¥{{ formatPrice(item.price) }}
                                    </div>
                                    <div
                                        class="product-price-txt product-price-txt-red"
                                    >
                                        ¥{{ item.discountPrice }}
                                    </div>
                                </div>
                                <div
                                    v-else-if="item.price"
                                    class="product-price"
                                >
                                    <div class="product-price-txt">
                                        ¥{{ formatPrice(item.price) }}
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div v-else class="product-header">
                        <div v-if="item.drop" class="product-drop">
                            <img
                                v-lazy="drop"
                                alt="product"
                                class="product-drop-temp"
                            />
                        </div>
                        <div v-else class="product-drop">
                            <!-- todo: add svg as logo (needs work on backend)-->
                            <svg class="icon-stroke icon-sm text-regular">
                                <use xlink:href="#icon-logo" />
                            </svg>
                        </div>
                        <div class="product-title pl-1">
                            <div
                                :class="[
                                    'product-id',
                                    {
                                        'trial-set-title':
                                            item.type === 'trial set',
                                    },
                                ]"
                            >
                                <p>{{ item.type }}</p>
                                <p>{{ item.title }}</p>
                            </div>
                            <template
                                v-if="
                                    showPrice &&
                                        (item.type === 'total care set' ||
                                        item.type === 'trial set')
                                "
                            >
                                <div
                                    v-if="showDiscount(item)"
                                    class="product-price"
                                >
                                    <div
                                        class="product-price-txt product-price-discounted"
                                    >
                                        ¥{{ formatPrice(item.price) }}
                                    </div>
                                    <div
                                        class="product-price-txt product-price-txt-red"
                                    >
                                        ¥{{ formatPrice(item.discountPrice) }}
                                    </div>
                                </div>
                                <div
                                    v-else-if="item.price"
                                    class="product-price"
                                >
                                    <div class="product-price-txt">
                                        ¥{{ formatPrice(item.price) }}
                                    </div>
                                </div>
                            </template>
                        </div>
                        <template
                            v-if="
                                showPrice &&
                                    (item.type !== 'total care set' &&
                                    item.type !== 'trial set')
                            "
                        >
                            <div
                                v-if="showDiscount(item)"
                                class="product-price"
                            >
                                <div
                                    class="product-price-txt product-price-discounted"
                                >
                                    ¥{{ formatPrice(item.price) }}
                                </div>
                                <div
                                    class="product-price-txt product-price-txt-red"
                                >
                                    ¥{{ formatPrice(item.discountPrice) }}
                                </div>
                            </div>
                            <div v-else-if="item.price" class="product-price">
                                <div class="product-price-txt">
                                    ¥{{ formatPrice(item.price) }}
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div
                    v-if="
                        showPrice &&
                            serumTotalPrice.price > 0 &&
                            product.length > 1
                    "
                >
                    <hr class="mt-1" />
                    <div class="product-total-price mt-1">
                        <div
                            v-if="serumTotalPrice.discounted > 0"
                            class="product-price-txt product-price-discounted"
                        >
                            ¥{{ formatPrice(serumTotalPrice.discounted) }}
                        </div>
                        <div
                            :class="[
                                'product-price-txt',
                                {
                                    'product-price-txt-red':
                                        serumTotalPrice.discounted > 0,
                                },
                            ]"
                        >
                            ¥{{ formatPrice(serumTotalPrice.price) }}
                        </div>
                    </div>
                </div>

                <!--<div class="product-details my-1 text-small">-->
                <slot name="description"></slot>
                <!--</div>-->
                <slot name="button"></slot>
                <slot name="scores"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {formatPrice, getLimitedProductInfo} from '@/imyme-app/utils'
import {Vue, Component, Prop} from 'vue-property-decorator'
import Morning from '@shared/components/AnimatedIcons/Skincare/Morning.vue'
import Night from '@shared/components/AnimatedIcons/Skincare/Night.vue'
import MorningAndNight from '@shared/components/AnimatedIcons/Skincare/MorningAndNight.vue'
import EyesAndMouth from '@shared/components/AnimatedIcons/Skincare/EyesAndMouth.vue'
import TZone from '@shared/components/AnimatedIcons/Skincare/TZone.vue'
import UZone from '@shared/components/AnimatedIcons/Skincare/UZone.vue'
import Aging from '@shared/components/AnimatedIcons/Skincare/Aging.vue'

@Component({
    components: {
        Morning,
        Night,
        morning_and_night: MorningAndNight,
        eyes_and_mouth: EyesAndMouth,
        T: TZone,
        U: UZone,
        A: Aging,
    },
})
export default class Product extends Vue {
    public name: string = 'Product'

    @Prop({type: [Object, Array], default: () => ({})}) readonly product: any
    @Prop({type: Boolean, required: false, default: false})
    readonly centerContent
    @Prop({type: Boolean, required: false, default: false}) readonly disableLink
    type: string = ''
    link: object = {
        name: 'results',
    }

    formatPrice(price: number) {
        return formatPrice(price)
    }

    get showDiscount() {
        return function(product) {
            if (product && product.properties && product.properties.promotion) {
                return product.properties.promotion === 'true' ? true : false
            }
            return false
        }
    }
    get isLimitedProduct() {
        return getLimitedProductInfo(this.product.id)
    }
    get isPowder() {
        return this.product.type === 'brightening powder'
    }
    get showPrice() {
        return this.disableLink
    }

    get serumTotalPrice() {
        const total = {
            price: 0,
            discounted: 0,
        }
        this.product.forEach(async item => {
            if (item.type === 'serum' && item.skinCode) {
                if (this.showDiscount(item)) {
                    total.price += Number(item.discountPrice)
                    total.discounted += Number(item.price)
                } else {
                    total.price += Number(item.price)
                }
            }
        })
        return total
    }

    async created() {
        if (Array.isArray(this.product) && this.product.length > 0) {
            const product = this.product[0]
            this.type = product.type
            if ('skinCode' in product || 'essences' in product) {
                this.link['hash'] = `#my_${product.type}_area`
            } else if (product.id) {
                this.link = {
                    name: 'product',
                    query: {
                        id: product.id,
                    },
                }
            }
        }
    }
}
</script>
<style scoped>
.results-product-skincare-icon > svg {
    max-width: 9rem;
    height: 6rem;
}

.product-content {
    padding: 1rem;
    display: inline-flex;
    justify-content: center;
}
p.product-content-intro {
    font-size: 3vw;
    line-height: 4.6vw;
}
.product-id p {
    font-size: 3.8vw;
    line-height: 4.8vw;
    word-break: keep-all;
}
.product-price {
    margin: auto;
    margin-right: 0;
    text-align: right;
    font-size: 3.8vw;
}
.product-title .product-price {
    display: flex;
    margin: 0;
}
.product-total-price {
    font-size: 3.8vw;
    text-align: right;
}
.product-total-price > div {
    display: inline-block;
    padding-left: 0.5rem;
}

.product-price-discounted span {
    color: #000000;
    font-size: 4vw;
    padding-right: 2.1vw;
}
.product-price-txt-red {
    color: red;
}
.product-img {
    width: 76%;
}

.product-img img {
    margin: 0;
    width: 100%;
    height: 29vh;
    object-fit: cover;
    text-align: center;
}
.results-products-img {
    display: flex;
}
.results-product-img {
    padding-right: 1rem;
}
.trial-set-img img {
    height: 100%;
    object-fit: contain;
}
.product-header {
    padding: 1.6vw 0;
}
.product-drop {
    height: fit-content;
}
.icon-stroke {
    margin: 0 -1rem;
}
@media screen and (min-width: 1480px) {
    .trial-set-title p {
        font-size: 2.8vw;
    }
}
</style>
