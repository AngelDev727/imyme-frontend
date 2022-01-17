<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action} from 'vuex-class'
import UserDetailsForm from '@app/components/UserDetailsForm.vue'
import {formatPhoneNumber} from '@/imyme-app/utils'

@Component({
    components: {
        UserDetailsForm,
    },
})
export default class EditDetails extends Vue {
    public name: string = 'EditDetails'

    editObject: any = null
    @Action('user/updateUserAddress') updateUserAddress
    @Action('user/createUserAddress') createUserAddress
    @Action('user/updateUser') updateUserState

    get redirectTo() {
        return this.$route.params.redirect || 'mypage'
    }

    updateUser(user) {
        this.editObject = user
    }
    async updateUserDetails() {
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
            await this.updateUserAddress({
                id: id,
                address: addressUpdate,
            })
        } else {
            await this.createUserAddress({
                address: addressUpdate,
            })
        }
        await this.updateUserState(userUpdate)
        this.$router.push({name: this.redirectTo})
    }
}
</script>

<template>
    <div class="cart">
        <form action="" @submit.prevent="updateUserDetails">
            <UserDetailsForm @update-user="updateUser" />
        </form>
    </div>
</template>
