<script lang="ts">
import {Vue, Component, Ref, Watch} from 'vue-property-decorator'
import {getAddressByZip} from 'japan-address-autofill'
import {State, Action, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import {SurveyState} from '@/shared/store/modules/survey/types'
import {formatPhoneNumber, getRomajiPrefecture} from '@/imyme-app/utils'

interface ErrorsObject {
    nickname: boolean
    nicknameMessage: string
}

@Component
export default class ShippingAddressForm extends Vue {
    public name: string = 'ShippingAddressForm'

    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @State(state => state.user.user) user!: User
    @State('survey') surveyState!: SurveyState
    @Action('application/loadingPromiseAdd') loadingPromiseAdd
    @Action('user/getUser') getUser
    @Action('user/updateUser') updateUser
    @Action('user/updateUserNickname') updateUserNickname
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage
    @Ref('zip-input') zipInput!: HTMLInputElement
    @Ref('province') province!: HTMLInputElement

    editObject: any = {
        firstName: '',
        lastName: '',
        phone: '',
        zip: '',
        province: '',
        city: '',
        address1: '',
        address2: '',
        country: 'Japan',
    }
    nickname: string = ''
    // processing: boolean = false
    errors: ErrorsObject = {
        nickname: false,
        nicknameMessage: '',
    }

    async created() {
        if (this.rechargeObject.shipping_address) {
            const prefecture = await this.getKanjiPrefecture(
                this.rechargeObject.shipping_address.zip,
            )
            this.editObject = {
                address1: this.rechargeObject.shipping_address.address1,
                address2: this.rechargeObject.shipping_address.address2,
                zip: this.rechargeObject.shipping_address.zip,
                city: this.rechargeObject.shipping_address.city,
                province: prefecture,
                country: 'Japan',
                firstName: this.rechargeObject.shipping_address.first_name,
                lastName: this.rechargeObject.shipping_address.last_name,
                phone: this.rechargeObject.shipping_address.phone,
                id: this.rechargeObject.shipping_address.id,
            }
        }
    }

    get survey() {
        return Object.keys(this.surveyState.survey_obj.selection).length
    }

    get isShowNickname() {
        return this.survey === 15 ? false : true
    }

    get nicknameError() {
        return this.errors
    }

    get email() {
        return this.rechargeObject.email
    }

    async getKanjiPrefecture(zip) {
        //Shopify returns prefecture name in Romaji by default, convert it Kanji
        if (!zip) return ''

        const zipCode: string = zip.replace('-', '')
        return await getAddressByZip(zipCode)
            .then(({prefecture}) => {
                return prefecture
            })
            .catch(() => {
                this.setErrorMessage({
                    message: 'incorrect zip',
                })
            })
    }

    async getAddress() {
        if (
            this.editObject &&
            this.editObject.zip &&
            this.editObject.zip.replace('-', '').length == 7
        ) {
            await getAddressByZip(this.editObject.zip.replace('-', ''))
                .then(result => {
                    this.zipInput.setCustomValidity('')
                    const {area, city, prefecture, street} = result
                    Vue.set(this.editObject, 'address1', area)
                    Vue.set(this.editObject, 'city', city)
                    Vue.set(this.editObject, 'address2', street)
                    Vue.set(this.editObject, 'province', prefecture)
                    if (!this.editObject.address2) {
                        this.editObject.address2 = ''
                    }
                })
                .catch(() => {
                    this.zipInput.setCustomValidity(
                        'Please enter a valid zip code NNN-NNNN',
                    )
                    return false
                })
        } else {
            this.zipInput.setCustomValidity(
                'Please enter a valid zip code NNN-NNNN',
            )
            return false
        }
    }

    async saveAddress() {
        const rechargeObject = {...this.rechargeObject}
        await this.updateDisplayName()
        await this.updatePhone()
        //need to call getUser to get array of all addresses
        await this.getUser()

        rechargeObject.shipping_address = {
            address1: this.editObject.address1,
            address2: this.editObject.address2,
            zip: this.editObject.zip,
            city: this.editObject.city,
            province: getRomajiPrefecture(this.editObject.province),
            country: 'Japan',
            first_name: this.editObject.firstName,
            last_name: this.editObject.lastName,
            phone: this.editObject.phone,
            id: null,
        }
        this.setRechargeObject(rechargeObject)

        if (this.isShowNickname) {
            await this.updateUserNickname({
                remoteId: this.user.id,
                nickname: this.nickname,
            })
        }
    }

    checkRomajiPrefecture() {
        const romajiPrefecture = getRomajiPrefecture(this.editObject.province)
        if (romajiPrefecture) {
            this.province.setCustomValidity('')
        } else {
            this.province.setCustomValidity(
                '都道府県名を正しく入力してください',
            )
        }
    }

    updateDisplayName() {
        const {lastName, firstName} = this.editObject

        const userUpdate = `{
                    firstName: "${firstName}"
                    lastName: "${lastName}"
                }`
        return this.updateUser(userUpdate)
    }

    updatePhone() {
        const {phone} = this.editObject
        const userUpdate = `{
            phone: "${formatPhoneNumber(phone)}"
        }`
        return this.updateUser(userUpdate)
    }

    @Watch('nickname')
    onNicknameChanged() {
        this.checkErrors()
    }

    checkErrors() {
        const reg = new RegExp(/[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]/g)

        if (this.nickname.length <= 1) {
            this.errors.nickname = true
            this.nickname.length <= 1
                ? (this.errors.nicknameMessage = '2文字以上入力してください')
                : ''
        } else if (!/^[A-Za-z0-9]*$/.test(this.nickname)) {
            this.errors.nickname = true
            this.errors.nicknameMessage = '半角英数字のみです'
        } else if (reg.test(this.nickname)) {
            this.errors.nickname = true
            this.errors.nicknameMessage = '半角英数字のみです'
        } else if (this.nickname.length > 10) {
            this.errors.nickname = true
            this.nickname.length > 10
                ? (this.errors.nicknameMessage = '10文字以内で入力してください')
                : ''
        } else {
            this.errors.nickname = false
        }
    }
}
</script>

<template>
    <section id="delevery-details" class="p-1">
        <h3 class="py-1">お客様情報の入力</h3>
        <h4 class="required-heading py-1">※入力必須項目</h4>
        <span class="form--label" role="heading">
            名前
            <span class="required-icon">※</span>
        </span>
        <div class="form--group">
            <label class="user-details-label" for="lastname">姓</label>
            <input
                id="lastname"
                v-model="editObject.lastName"
                class="form--input"
                required
                type="text"
                placeholder="姓"
            />
            <label class="user-details-label" for="firstname">名</label>
            <input
                id="firstname"
                v-model="editObject.firstName"
                class="form--input"
                required
                type="text"
                placeholder="名"
            />
        </div>
        <label class="form--label" for="email">
            メールアドレス
            <span class="required-icon">※</span>
        </label>
        <input
            id="email"
            v-model="email"
            class="form--input"
            required
            type="email"
            disabled
        />
        <label class="form--label" for="phone">
            電話番号
            <span class="required-icon">※</span>
        </label>
        <input
            id="phone"
            v-model="editObject.phone"
            class="form--input"
            required
            inputmode="tel"
            placeholder="09012345678"
        />
        <label class="form--label" for="zip">
            郵便番号
            <span class="required-icon">※</span>
        </label>
        <input
            id="zip"
            ref="zip-input"
            v-model="editObject.zip"
            class="form--input"
            required
            type="text"
            minlength="7"
            maxlength="8"
            @input="getAddress"
        />
        <label class="form--label" for="province">
            都道府県
            <span class="required-icon">※</span>
        </label>
        <input
            id="province"
            ref="province"
            v-model="editObject.province"
            class="form--input"
            required
            type="text"
            @input="checkRomajiPrefecture"
        />
        <label class="form--label" for="city">
            市区町村
            <span class="required-icon">※</span>
        </label>
        <input
            id="city"
            v-model="editObject.city"
            class="form--input"
            required
            type="text"
        />
        <label class="form--label" for="address1">
            番地
            <span class="required-icon">※</span>
        </label>
        <input
            id="address1"
            v-model="editObject.address1"
            class="form--input"
            required
            type="text"
        />
        <label class="form--label" for="address2">建物名</label>
        <input
            id="address2"
            v-model="editObject.address2"
            class="form--input"
            type="text"
        />
        <div v-if="isShowNickname">
            <label class="form--label" for="nickname">
                ニックネーム（商品のラベルに印字されます）
                <span class="required-icon">※</span>
            </label>
            <input
                id="nickname"
                v-model="nickname"
                class="form--input"
                required
                type="text"
                placeholder="半角英数字で入力"
                maxlength="10"
            />
            <div
                :class="{'input-err': errors.nickname}"
                class="input-err-message"
            >
                ※ {{ errors.nicknameMessage }}
            </div>
        </div>
    </section>
</template>

<style scoped>
input#nickname {
    margin-bottom: 0px;
}
</style>
