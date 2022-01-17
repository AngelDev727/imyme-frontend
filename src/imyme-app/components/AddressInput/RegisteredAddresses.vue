<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State, Action, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import RegisteredAddressInput from '@app/components/AddressInput/RegisteredAddressInput.vue'
import AddressDisplay from '@app/components/AddressDisplay.vue'

/**
 * Default size for address choices
 */
const showSize: number = 3
/**
 * Maximum size of address that can be registered
 */
const maxAddressSize: number = 10

@Component({
    components: {
        RegisteredAddressInput,
        AddressDisplay,
    },
})
export default class RegisteredAddresses extends Vue {
    public name: string = 'RegisteredAddresses'

    @State(state => state.user.user) user!: User
    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @Action('user/deleteAddress') actionDeleteAddress
    @Action('user/getUser') getUser
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject

    selectedAddress: any = null
    selectedAddressId: string = ''
    isShowMini: boolean = true

    created() {
        this.resetAddressInfo()
    }

    get addresses() {
        const {edges} =
            this.user && this.user.addresses ? this.user.addresses : {edges: []}
        return edges
    }

    get showSize() {
        return showSize
    }

    get maxAddressSize() {
        return maxAddressSize
    }

    resetAddressInfo() {
        if (this.user.defaultAddress) {
            this.selectedAddressId = this.rechargeObject.shipping_address
                ? this.rechargeObject.shipping_address.id
                : this.user.defaultAddress.id
        }

        if (this.selectedAddressId) {
            this.selectedAddress = this.getAddress(this.selectedAddressId)
        }

        if (this.selectedAddress) {
            this.setShippingAddress(this.selectedAddress)
        }

        if (this.addresses.length && this.selectedAddressId) {
            this.isShowMini = Boolean(
                this.addresses.filter(
                    (address, index) =>
                        index < this.showSize &&
                        address.node.id === this.selectedAddressId,
                ).length,
            )
        }

        this.$emit('input', this.selectedAddressId)
    }

    async deleteAddress(id) {
        if (id === this.selectedAddressId) {
            this.unsetShippingAddress()
        }
        await this.actionDeleteAddress(id)
        await this.getUser()
        this.resetAddressInfo()
    }

    getAddress(id: string) {
        const matchAddress = this.addresses.filter(
            address => address.node.id === id,
        )
        if (matchAddress.length > 0) {
            return matchAddress[0].node
        } else {
            return null
        }
    }

    setShippingAddress(address) {
        const rechargeObject = {...this.rechargeObject}
        rechargeObject.shipping_address = {
            address1: address.address1,
            address2: address.address2,
            zip: address.zip,
            city: address.city,
            province: address.province,
            country: 'Japan',
            first_name: address.firstName,
            last_name: address.lastName,
            phone: address.phone || this.user.phone,
            id: address.id,
        }
        this.setRechargeObject(rechargeObject)
    }

    unsetShippingAddress() {
        this.setRechargeObject({
            ...this.rechargeObject,
            shipping_address: null,
        })
    }

    updateShippingAddress(e) {
        this.$emit('input', e.target.value)

        if (this.selectedAddressId) {
            this.selectedAddress = this.getAddress(this.selectedAddressId)
            this.setShippingAddress(this.selectedAddress)
        } else {
            this.selectedAddress = null
            this.unsetShippingAddress()
        }
    }
}
</script>

<template>
    <section class="pb-1">
        <h3 class="pt-2">お届け先住所の選択</h3>
        <div v-for="(address, index) in addresses" :key="address.node.id">
            <div
                v-if="index < showSize || !isShowMini"
                class="subscription--item m-1"
            >
                <RegisteredAddressInput :address="address">
                    <input
                        id="false"
                        v-model="selectedAddressId"
                        type="radio"
                        name="address"
                        data-testid="subscription-false-button"
                        :value="address.node.id"
                        required
                        @change="updateShippingAddress"
                    />
                    <span class="checkmark" />
                </RegisteredAddressInput>
                <button
                    class="del-btn"
                    @click.prevent="deleteAddress(address.node.id)"
                >
                    削除
                </button>
            </div>
        </div>
        <div
            v-if="showSize < addresses.length && isShowMini"
            class="subscription--item m-1"
            @click="isShowMini = false"
        >
            他の住所から選択する
        </div>
        <div
            v-if="addresses.length < maxAddressSize"
            class="subscription--item m-1"
        >
            <label class="container">
                新しい住所を入力
                <input
                    id="false"
                    v-model="selectedAddressId"
                    required
                    type="radio"
                    name="address"
                    data-testid="subscription-false-button"
                    :value="null"
                    @change="updateShippingAddress"
                />
                <span class="checkmark" />
            </label>
        </div>
        <AddressDisplay
            v-if="selectedAddress"
            :user="user"
            :address="rechargeObject.shipping_address || user.defaultAddress"
            :address-type="`shipping`"
        />
    </section>
</template>

<style scoped>
select.order-cycle {
    width: 100%;
    outline: none;
    height: 30px;
    padding-left: 3px;
    border: #ccc solid 2px;
    border-radius: 3px;
}
.del-btn {
    width: 8rem;
    height: 3rem;
    margin: auto;
    margin-right: 0;
}
</style>
