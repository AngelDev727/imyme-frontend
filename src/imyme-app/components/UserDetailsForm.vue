<script lang="ts">
import {Vue, Component, Prop, Ref, Watch} from 'vue-property-decorator'
import {getAddressByZip} from 'japan-address-autofill'
import {formatPhoneNumber, parsePhoneNumber} from '@/imyme-app/utils'
import {State, Action} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'

@Component
export default class UserDetailsForm extends Vue {
    public name: string = 'UserDetailsForm'

    @Prop({type: String, default: 'mypage'}) redirectPage!: string
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.userSubscriptions) userSubscriptions!: any
    @Action('user/getUser') getUser
    @Action('user/updateUser') actionUpdateUser
    @Action('user/createUserAddress') actionCreateUserAddress
    @Action('user/updateUserAddress') actionUpdateUserAddress
    @Action('checkout/updateSubscriptionRechargeAddress') updateSubscriptionRechargeAddress
    @Ref('zip-input') zipInput!: HTMLInputElement

    editObject: any = {}
    processing: boolean = false

    get redirectTo() {
        return (this.$route.query.next as string) || this.redirectPage
    }

    @Watch('user', {immediate: true})
    onUserChanged(val) {
        const {id, firstName, lastName, email, phone, defaultAddress} = val
        this.editObject = Object.assign({
            id,
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            phone: parsePhoneNumber(phone) || '',
            defaultAddress: {...defaultAddress} || {},
        })
        this.getCity()
    }

    async reviewOrder() {
        this.startProcessing()

        this.getAddress()
        const {
            lastName,
            firstName,
            phone,
            email,
            defaultAddress: {id, address1, address2, zip, city, province},
            country = 'Japan',
        } = this.editObject

        const addressUpdate = `{
            lastName: "${lastName}",
            firstName: "${firstName}",
            address1: "${address1}",
            address2: "${address2}",
            zip: "${zip}",
            city: "${city}",
            province: "${province}",
            country: "Japan"
        }`

        const userUpdate = `{
            lastName: "${lastName}",
            firstName: "${firstName}",
            email: "${email}",
            phone: "${formatPhoneNumber(phone)}"
        }`

        if (id) {
            await this.actionUpdateUserAddress({
                id: id,
                address: addressUpdate,
            })

            if (this.subscriptionAddressIdList.length > 0) {
                const subscriptionAddressUpdate = {
                    subscriptionAddressIdList: this.subscriptionAddressIdList,
                    address: {
                        lastName: lastName,
                        firstName: firstName,
                        address1: address1,
                        address2: address2,
                        zip: zip,
                        city: city,
                        province: province,
                        phone: phone,
                        country: country,
                    },
                }
                await this.updateSubscriptionRechargeAddress(
                    subscriptionAddressUpdate,
                )
            }
        } else {
            await this.actionCreateUserAddress({
                address: addressUpdate,
            })
        }

        await this.actionUpdateUser(userUpdate)
        this.$router.push({name: this.redirectTo})

        this.endProcessing()
    }

    async getCity() {
        if (this.editObject && this.editObject.defaultAddress.zip) {
            await getAddressByZip(
                this.editObject.defaultAddress.zip.replace('-', ''),
            )
                .then(result => {
                    const {prefecture} = result
                    Vue.set(
                        this.editObject.defaultAddress,
                        'province',
                        prefecture,
                    )
                    if (!this.editObject.defaultAddress.address2) {
                        this.editObject.defaultAddress.address2 = ''
                    }
                })
                .catch(() => {
                    this.zipInput.setCustomValidity(
                        'Please enter a valid zip code NNN-NNNN',
                    )
                    return false
                })
        }
    }

    async getAddress() {
        if (
            this.editObject &&
            this.editObject.defaultAddress.zip &&
            this.editObject.defaultAddress.zip.replace('-', '').length == 7
        ) {
            await getAddressByZip(
                this.editObject.defaultAddress.zip.replace('-', ''),
            )
                .then(result => {
                    this.zipInput.setCustomValidity('')
                    const {area, city, prefecture, street} = result
                    Vue.set(this.editObject.defaultAddress, 'address1', area)
                    Vue.set(this.editObject.defaultAddress, 'city', city)
                    Vue.set(this.editObject.defaultAddress, 'address2', street)
                    Vue.set(
                        this.editObject.defaultAddress,
                        'province',
                        prefecture,
                    )
                    if (!this.editObject.address2) {
                        this.editObject.defaultAddress.address2 = ''
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

    get subscriptionAddressIdList() {
        if (this.userSubscriptions) {
            return this.uniqueArray(
                this.userSubscriptions
                    .filter(subscription => subscription.status === 'ACTIVE')
                    .map(subscription => subscription.address_id),
            )
        } else {
            return []
        }
    }

    uniqueArray(array) {
        return array.filter((x, i, self) => self.indexOf(x) === i)
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
}
</script>

<template>
    <form
        v-if="user && editObject && editObject.defaultAddress"
        action
        class="py-5 my-3"
        @submit.prevent="reviewOrder"
    >
        <section id="delevery-details" class="p-1">
            <h3 class="py-1">お客様配送先情報の入力</h3>
            <h4 class="required-heading py-1">※入力必須項目</h4>
            <span class="form--label" role="heading">
                名前
                <span class="required-icon">※</span>
            </span>
            <div class="form--group">
                <label class="user-details-label" for="firstname">姓</label>
                <input
                    id="firstname"
                    v-model="editObject.lastName"
                    class="form--input"
                    required
                    type="text"
                    placeholder="姓"
                />
                <label class="user-details-label" for="lastname">名</label>
                <input
                    id="lastname"
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
                v-model="editObject.email"
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
                v-model="editObject.defaultAddress.zip"
                class="form--input"
                required
                type="text"
                minlength="7"
                maxlength="8"
                @input="getAddress"
            />
            <label class="form--label" for="address1">
                都道府県
                <span class="required-icon">※</span>
            </label>
            <input
                id="address1"
                v-model="editObject.defaultAddress.province"
                class="form--input"
                required
                type="text"
            />

            <label class="form--label" for="address1">
                市区町村
                <span class="required-icon">※</span>
            </label>
            <input
                id="address1"
                v-model="editObject.defaultAddress.city"
                class="form--input"
                required
                type="text"
            />

            <label class="form--label" for="city">
                番地
                <span class="required-icon">※</span>
            </label>
            <input
                id="city"
                v-model="editObject.defaultAddress.address1"
                class="form--input"
                required
                type="text"
            />
            <label class="form--label" for="building">建物名</label>
            <input
                id="building"
                v-model="editObject.defaultAddress.address2"
                class="form--input"
                type="text"
            />
        </section>
        <button
            data-testid="review-order"
            class="btn btn-secondary w-center-70 mb-3"
            type="submit"
            :disabled="isProcessing()"
        >
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-forward" />
            </svg>

            <span v-if="isProcessing()" class="m-auto">
                保存中
            </span>
            <span v-else class="mx-auto">保存</span>
        </button>
    </form>
</template>
