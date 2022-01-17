<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {getAddressByZip} from 'japan-address-autofill'
import {State, Action, Mutation, Getter} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'

@Component
export default class AddressDisplay extends Vue {
    public name: string = 'AddressDisplay'

    @Prop({type: String, default: 'default'}) addressType!: string
    @Prop({type: Object, default: () => ({})}) user: any
    @Prop({type: Object, default: () => ({})}) address: any
    @State('survey') surveyState!: SurveyState
    @Action('tablet/getCustomerByRemoteId') getCustomerByRemoteId
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage
    @Getter('checkout/getOrderCycle') getOrderCycle
    @Getter('checkout/getPaymentMethod') getPaymentMethod

    kanjiPrefecture: string | null = null
    nickname: string = ''

    get headerText() {
        return this.addressType === 'default' ? 'お客様配送先情報'
            : this.addressType === 'customer' ? 'お客様情報'
            : '配送先情報'
    }

    get survey() {
        return Object.keys(this.surveyState.survey_obj.selection).length
    }

    get isShowNickname() {
        if (this.survey === 15) {
            return false
        }
        if (this.$route.path.match(/mypage/)) {
            return false
        }
        return true
    }

    get orderCycle() {
        return this.getOrderCycle
    }

    get paymentMethodName() {
        return this.getPaymentMethod === 'cod' ? '商品代引き' : 'クレジットカード決済'
    }

    get isCheckoutPage() {
        return !!this.$route.path.match(/checkout/)
    }

    get isOrderInputPage() {
        return !!this.$route.path.match(/order\/input-form/)
    }

    get isShowOrderCycle() {
        return this.isCheckoutPage && this.orderCycle
    }

    get isShowPaymentMethod() {
        return this.isCheckoutPage
    }

    async created() {
        this.setKanjiPrefecture()
        const customer = await this.getCustomerByRemoteId(this.user.id)
        this.nickname = customer.name
    }

    async setKanjiPrefecture() {
        //Shopify returns prefecture name in Romaji by default, convert it Kanji
        if (!this.address) {
            this.$router.push({name: 'orderInputForm'})
        }
        this.kanjiPrefecture = ''
        const zipCode: string = this.address.zip
            ? this.address.zip.replace('-', '')
            : ''

        await getAddressByZip(zipCode)
            .then(({prefecture}) => {
                this.kanjiPrefecture = prefecture
            })
            .catch(() => {
                this.setErrorMessage({
                    message: 'incorrect zip',
                })
            })
    }

    @Watch('address')
    onAddressChanged() {
        this.setKanjiPrefecture()
    }
}
</script>

<template>
    <div v-if="user && address">
        <section
            :class="{ 'p-1': !isOrderInputPage }"
        >
            <div
                v-if="!isOrderInputPage"
                class="summary-heading pb-1 max-w"
            >
                <span class="summary--title">
                    {{ headerText }}
                </span>
                <slot />
            </div>
            <ul class="max-w">
                <li class="summary--item">
                    <span role="heading" class="heading p-1">
                        お名前
                    </span>
                    <span
                        v-if="user.firstName && user.lastName"
                        class="value p-1 pl-4"
                    >
                        {{ user.lastName }} {{ user.firstName }}
                    </span>
                    <span
                        v-else-if="address.firstName && address.lastName"
                        class="value p-1 pl-4"
                    >
                        {{ address.lastName }} {{ address.firstName }}
                    </span>
                    <span v-else class="value p-1 pl-4">
                        {{ user.displayName }}
                    </span>
                </li>
                <li class="summary--item">
                    <span role="heading" class="heading p-1">
                        メールアドレス
                    </span>
                    <span class="value p-1 pl-4">
                        {{ user.email }}
                    </span>
                </li>
                <li
                    v-if="address.phone || user.phone"
                    class="summary--item"
                >
                    <span role="heading" class="heading p-1">
                        電話番号
                    </span>
                    <span class="value p-1 pl-4">
                        {{ address.phone || user.phone }}
                    </span>
                </li>
                <li class="summary--item">
                    <span role="heading" class="heading p-1">
                        郵便番号
                    </span>
                    <span class="value p-1 pl-4">
                        {{ address.zip }}
                    </span>
                </li>
                <li class="summary--item">
                    <span role="heading" class="heading p-1">
                        都道府県
                    </span>
                    <span class="value p-1 pl-4">
                        {{ kanjiPrefecture }}
                    </span>
                </li>
                <li class="summary--item">
                    <span role="heading" class="heading p-1">
                        市区町村
                    </span>
                    <span class="value p-1 pl-4">
                        {{ address.city }}
                    </span>
                </li>
                <li class="summary--item">
                    <span role="heading" class="heading p-1">
                        番地
                    </span>
                    <span class="value p-1 pl-4">
                        {{ address.address1 }}
                    </span>
                </li>
                <li
                    v-if="address.address2 && address.address2 !== 'undefined'"
                    class="summary--item"
                >
                    <span role="heading" class="heading p-1">
                        建物名
                    </span>
                    <span class="value p-1 pl-4">
                        {{ address.address2 }}
                    </span>
                </li>
                <li
                    v-if="isShowNickname"
                    class="summary--item pb-1"
                >
                    <span role="heading" class="heading p-1">
                        ニックネーム
                        <div>※商品のラベルに印字されます</div>
                    </span>
                    <span class="value p-1 pl-4">
                        {{ nickname }}
                    </span>
                </li>
                <li
                    v-if="isShowOrderCycle"
                    class="summary--item pb-1"
                >
                    <span role="heading" class="heading p-1">
                        お届けサイクル
                    </span>
                    <span class="value p-1 pl-4">
                        {{ orderCycle }}日
                    </span>
                </li>
                <li
                    v-if="isShowPaymentMethod"
                    class="summary--item pb-1"
                >
                    <span role="heading" class="heading p-1">
                        支払い方法
                    </span>
                    <span class="value p-1 pl-4">
                        {{ paymentMethodName }}
                    </span>
                </li>
            </ul>
        </section>
    </div>
</template>
