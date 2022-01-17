<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import AddressDisplay from '@app/components/AddressDisplay.vue'
import {formatPhoneNumber} from '@/imyme-app/utils'
import {State, Action, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'

@Component({
    components: {
        AddressDisplay,
    },
})
export default class ShippingAddress extends Vue {
    public name: string = 'ShippingAddress'

    @State(state => state.user.user) user!: User
    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @Action('user/updateUser') updateUser
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject

    backupPhone: any = null

    get showPhoneInput() {
        if (this.user && this.rechargeObject) {
            if (this.rechargeObject.shipping_address) {
                return (
                    !!this.rechargeObject.shipping_address.phone ||
                    !!this.user.phone
                )
            } else if (this.user.defaultAddress) {
                return !!this.user.defaultAddress.phone || !!this.user.phone
            }
        }
        return true
    }
    get containsDiscount() {
        if (this.rechargeObject && this.rechargeObject.line_items.length > 0) {
            return this.rechargeObject.line_items.find(item => {
                if (item.properties && item.properties.promotion === 'true') {
                    return item
                }
            })
        }
        return false
    }

    updatePhone(number) {
        const userUpdate = `{
            phone: "${formatPhoneNumber(number)}"
        }`
        return this.updateUser(userUpdate)
    }

    async createCheckout(checkout) {
        this.setRechargeObject(checkout)
        this.$router.push({name: 'orderPayment'})
    }
    async reviewOrder() {
        const rechargeObject = {...this.rechargeObject}
        const chosenAddress =
            rechargeObject.shipping_address || this.user.defaultAddress

        const shippingAddress = chosenAddress
            ? {
                  address1: chosenAddress.address1,
                  address2: chosenAddress.address2,
                  zip: chosenAddress.zip,
                  city: chosenAddress.city,
                  province: chosenAddress.province,
                  country: 'Japan',
                  first_name:
                      'first_name' in chosenAddress
                          ? chosenAddress.first_name
                          : chosenAddress.firstName,
                  last_name:
                      'last_name' in chosenAddress
                          ? chosenAddress.last_name
                          : chosenAddress.lastName,
                  phone:
                      chosenAddress.phone ||
                      this.user.phone ||
                      this.backupPhone,
              }
            : null

        rechargeObject.shipping_address = shippingAddress

        // TODO add proper handeling for when rechargeObject.shipping_address is null or undifined
        if (this.user.phone) {
            this.createCheckout(rechargeObject)
        } else if (this.backupPhone) {
            await this.updatePhone(this.backupPhone)
            this.createCheckout(rechargeObject)
        } else if (chosenAddress) {
            await this.updatePhone(chosenAddress.phone)
            this.createCheckout(rechargeObject)
        }
    }
}
</script>

<template>
    <div v-if="user">
        <AddressDisplay
            :user="user"
            :address="rechargeObject.shipping_address || user.defaultAddress"
            :address-type="`shipping`"
        >
            <router-link
                :to="{name: 'registeredAddresses'}"
                tag="button"
                class="edit--button"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-return" />
                </svg>
                別の住所
            </router-link>
        </AddressDisplay>
        <form v-if="user" action @submit.prevent="reviewOrder">
            <section v-if="!showPhoneInput" id="delevery-details" class="p-1">
                <label class="form--label" for="phone">
                    電話番号
                    <span class="required-icon">※</span>
                </label>
                <input
                    id="phone"
                    v-model="backupPhone"
                    class="form--input"
                    required
                    inputmode="tel"
                    placeholder="09012345678"
                />
            </section>
            <button
                data-testid="review-order"
                class="btn btn-secondary w-center-70 mb-3"
                type="submit"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-forward" />
                </svg>
                <span class="mx-auto">次へ進む</span>
            </button>
        </form>
    </div>
</template>
