<script lang="ts">
import {formatPrice, getProductTypeName} from '@/imyme-app/utils'
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Action, State} from 'vuex-class'
import {Results} from '@/shared/store/modules/survey/types'
import Morning from '@shared/components/AnimatedIcons/Skincare/Morning.vue'
import Night from '@shared/components/AnimatedIcons/Skincare/Night.vue'
import MorningAndNight from '@shared/components/AnimatedIcons/Skincare/MorningAndNight.vue'
import EyesAndMouth from '@shared/components/AnimatedIcons/Skincare/EyesAndMouth.vue'
import TZone from '@shared/components/AnimatedIcons/Skincare/TZone.vue'
import UZone from '@shared/components/AnimatedIcons/Skincare/UZone.vue'
import Aging from '@shared/components/AnimatedIcons/Skincare/Aging.vue'

interface ProductInfo {
    type: string
    title: string
    price: number
    image: string
    logo: string
    serum_type: string
    properties: Array<Property>
}

interface Property {
    name: string
    value: string
}

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
    @Prop({type: String, default: ''}) readonly paymentMethod!: string
    @Action('checkout/updateSubscriptionsRecharge') updateSubscriptionsRecharge
    @Action('checkout/getUserSubscriptionsRecharge')
    getUserSubscriptionsRecharge
    @Action('user/getUser') getUser
    @Action('checkout/updateSubscriptionsCod') updateSubscriptionsCod
    @Action('checkout/getSubscriptionsCod') getSubscriptionsCod
    @Action('checkout/checkSubscriptionProductRecharge')
    checkSubscriptionProductRecharge
    @State(state => state.survey.results) results!: Results | null

    type: string = ''
    order_interval_frequency: number = 0
    selectedSubscriptionCycle: number = 0
    productInfoList: any[] = []

    flgEditSubscriptionCycle: boolean = false
    processing: boolean = false
    optionSubscriptionCycle: any = [
        {id: 1, value: '30', name: '30日'},
        {id: 2, value: '40', name: '40日'},
        {id: 3, value: '50', name: '50日'},
        {id: 4, value: '60', name: '60日'},
        {id: 5, value: '90', name: '90日'},
    ]
    isOptionProduct: boolean = false

    get recommendations() {
        return this.results ? this.results.recommends : null
    }

    mounted() {
        this.setProductInfo()
    }

    setProductInfo() {
        this.product.forEach(item => {
            const productInfo: ProductInfo = {
                type: item.type || '',
                title: item.title || '',
                price: item.price || 0,
                image: item.image || '',
                logo: item.logo || null,
                serum_type: item.serum_type || '',
                properties: item.properties || [],
            }

            const option = productInfo.properties.find(
                property =>
                    property.name === 'option' && property.value === 'true',
            )
            this.isOptionProduct = option ? true : false

            this.productInfoList.push(productInfo)
        })
        this.order_interval_frequency =
            this.product[0].order_interval_frequency || ''
        this.selectedSubscriptionCycle = this.order_interval_frequency
        this.type = this.product[0].type
    }

    get changeFlg(): any {
        if (this.recommendations && !this.isOptionProduct) {
            const recommendItem =
                this.type === 'serum'
                    ? this.recommendations.serum
                    : this.recommendations.soap

            const subscriptionItemNameList = this.product.map(item => item.name)
            const recommendItemNameList = recommendItem.map(item => item.name)

            const diff = subscriptionItemNameList
                .concat(recommendItemNameList)
                .filter(
                    item =>
                        !subscriptionItemNameList.includes(item) ||
                        !recommendItemNameList.includes(item),
                )
            if (
                subscriptionItemNameList.length === recommendItemNameList.length &&
                diff.length === 0
            ) {
                return false
            }
            return true
        }
        return false
    }

    formatPrice(price: number) {
        return formatPrice(price)
    }

    editSubscriptionCycle() {
        this.flgEditSubscriptionCycle = !this.flgEditSubscriptionCycle
    }

    async saveSubscriptionCycle() {
        this.startProcessing()
        const next_charge_date = this.product[0].next_charge_scheduled_at.match(/^\d{4}-\d{2}-\d{2}/)
        const subscriptionInfo = {
            subscriptionIdList: this.product.map(item => item.subscription_id),
            beforeOrderIntervalFrequency: this.order_interval_frequency,
            afterOrderIntervalFrequency: this.selectedSubscriptionCycle,
            nextChargeScheduledAt: next_charge_date ? next_charge_date[0] : '',
        }
        try {
            await this.updateSubscriptionsRecharge(subscriptionInfo)
            const user = await this.getUser()
            await this.getUserSubscriptionsRecharge(user.id)
            this.order_interval_frequency = this.selectedSubscriptionCycle
        } catch {
            this.selectedSubscriptionCycle = this.order_interval_frequency
        }
        this.flgEditSubscriptionCycle = !this.flgEditSubscriptionCycle
        this.endProcessing()
    }
    async saveSubscriptionCycleCod() {
        this.startProcessing()
        const next_charge_date = this.product[0].next_charge_scheduled_at.match(/^\d{4}-\d{2}-\d{2}/)
        const subscriptionInfo = {
            subscriptionIdList: this.product.map(item => item.subscription_id),
            beforeOrderIntervalFrequency: this.order_interval_frequency,
            afterOrderIntervalFrequency: this.selectedSubscriptionCycle,
            nextChargeScheduledAt: next_charge_date ? next_charge_date[0] : '',
        }
        try {
            await this.updateSubscriptionsCod(subscriptionInfo)
            const user = await this.getUser()
            await this.getSubscriptionsCod(user.id)
            this.order_interval_frequency = this.selectedSubscriptionCycle
        } catch {
            this.selectedSubscriptionCycle = this.order_interval_frequency
        }
        this.flgEditSubscriptionCycle = !this.flgEditSubscriptionCycle
        this.endProcessing()
    }

    cancelEditSubscriptionCycle() {
        this.selectedSubscriptionCycle = this.order_interval_frequency
        this.flgEditSubscriptionCycle = !this.flgEditSubscriptionCycle
    }

    startProcessing() {
        this.processing = true
    }

    endProcessing() {
        this.processing = false
    }

    isProcessing() {
        return this.processing
    }

    formatSchedule(nextChargeScheduledAt) {
        const picked = nextChargeScheduledAt.match(/^\d{4}-\d{2}-\d{2}/)
        return picked ? picked[0].replace(/-/g, '.') : '---'
    }

    get productTypeName() {
        return getProductTypeName(this.type)
    }

    async goToChangeSerum() {
        const next_charge_date = this.product[0].next_charge_scheduled_at.match(/^\d{4}-\d{2}-\d{2}/)
        const subscriptionInfo = {
            nextChargeScheduledAt: next_charge_date ? next_charge_date[0] : '',
        }
        await this.checkSubscriptionProductRecharge(subscriptionInfo)

        this.$router.push({
            name: 'serum_change',
            params: {
                product: this.product,
                change_flg: this.changeFlg,
                paymentMethod: this.paymentMethod,
            },
        })
    }
}
</script>

<template>
    <div>
        <div v-if="product" class="product">
            <div class="product-img">
                <div v-for="(item, index) in productInfoList" :key="index">
                    <img :src="item.image" alt="product" :class="{'soap-img': item.type === 'soap'}" />
                </div>
            </div>
            <div class="product-content">
                <p class="product-content-intro">次回注文日</p>
                <section class="m-0">
                    <div>
                        <h3 class="date ls-1">
                            {{ formatSchedule(product[0].next_charge_scheduled_at) }}
                        </h3>
                    </div>
                </section>

                <p class="product-content-intro">お届けサイクル</p>
                <section
                    v-if="flgEditSubscriptionCycle"
                    class="m-0 text-center"
                >
                    <div class="bg-body">
                        <span class="date ls-1">
                            <div class="select">
                                <select
                                    v-model="selectedSubscriptionCycle"
                                    class="subscription-cycle"
                                >
                                    <option
                                        v-for="option in optionSubscriptionCycle"
                                        :key="option.id"
                                        :value="option.value"
                                    >
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="btn-group">
                                <button
                                    v-if="!isProcessing()"
                                    class="btn m-1"
                                    :disabled="isProcessing()"
                                    @click="cancelEditSubscriptionCycle"
                                >
                                    <span class="m-auto">取消</span>
                                </button>
                                <button
                                    v-if="paymentMethod === 'cod'"
                                    class="btn m-1"
                                    :class="[processing ? '' : 'btn-blue']"
                                    :disabled="isProcessing()"
                                    @click="saveSubscriptionCycleCod"
                                >
                                    <span v-if="isProcessing()" class="m-auto">
                                        保存中
                                    </span>
                                    <span v-else class="m-auto">保存</span>
                                </button>
                                <button
                                    v-else
                                    class="btn m-1"
                                    :class="[processing ? '' : 'btn-blue']"
                                    :disabled="isProcessing()"
                                    @click="saveSubscriptionCycle"
                                >
                                    <span v-if="isProcessing()" class="m-auto">
                                        保存中
                                    </span>
                                    <span v-else class="m-auto">保存</span>
                                </button>
                            </div>
                        </span>
                    </div>
                </section>
                <section v-else class="m-0">
                    <div class="info-subscription-cycle">
                        <span class="subscription-cycle ls-1">
                            {{ selectedSubscriptionCycle }}日
                        </span>
                        <span
                            v-if="!flgEditSubscriptionCycle"
                            class="edit--button-subscription-cycle"
                            tag="button"
                            @click="editSubscriptionCycle"
                        >
                            <svg class="icon-stroke icon-btn">
                                <use xlink:href="#icon-return" />
                            </svg>
                            編集
                        </span>
                    </div>
                </section>
                <div
                    v-for="(item, index) in productInfoList"
                    :key="index"
                    class="product-header"
                >
                    <div v-if="item.serum_type" class="product-skincare-icon">
                        <Component :is="item.serum_type" />
                    </div>
                    <div v-else-if="item.logo" class="product-drop">
                        <img
                            v-lazy="item.logo"
                            alt="product"
                            class="product-drop-temp"
                        />
                    </div>
                    <div v-else class="product-drop">
                        <svg class="icon-stroke icon-sm text-regular">
                            <use xlink:href="#icon-logo" />
                        </svg>
                    </div>
                    <div class="product-title pl-1">
                        <div class="product-id">
                            <p>{{ item.type }}</p>
                            <p>{{ item.title }}</p>
                        </div>
                        <div v-if="item.price" class="product-price">
                            <div class="product-price-txt">
                                ¥{{ formatPrice(item.price) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="changeFlg">
            <div
                class="change-serum btn btn-blue w-70 mx-auto mt-1"
                @click="goToChangeSerum"
            >
                <span class="m-auto">
                    {{ productTypeName }}を変更する
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
span.edit--button-subscription-cycle {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    right: 0;
    margin-left: calc(-20%);
    padding: 0.5em;
    color: white;
    background-color: #b1aab0;
    font-size: 1em;
}
.info-subscription-cycle {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    display: flex;
    font-size: 3.8vw;
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
    display: flex;
    width: 76%;
}
.product-img > div {
    width: 50%;
    overflow: hidden;
}
.product-img > div:only-child {
    width: 100%;
    overflow: hidden;
}
.product-img img {
    margin: 0;
    width: 100%;
    height: 29vh;
    object-fit: cover;
}
img.soap-img {
    margin: -10% 0;
}
.product-header {
    padding: 1.6vw 0;
}
select.subscription-cycle {
    font-size: 2.3em;
}
.select {
    position: relative;
    border: #ccc solid 2px;
    border-radius: 3px;
}
.select::after {
    position: absolute;
    top: 50%;
    right: 8px;
    margin-top: -8px;
    content: '\f0f5';
    color: #ccc;
    font-size: 16px;
    font-family: fontAwesome;
    z-index: -1;
}
.select > select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 8px;
    border: none;
    background-color: transparent;
    border-radius: 0;
    outline: none;
}
div.btn-group {
    display: inline-flex;
}
span.subscription-cycle {
    font-size: 2.3em;
    position: relative;
    margin: auto;
}
div.change-serum {
    font-size: 4vw;
}
.product-title {
    display: block;
    height: fit-content;
}
.product-skincare-icon {
    margin: auto 0;
}
.product-skincare-icon > svg {
    max-width: 9rem;
    height: 6rem;
}
</style>
