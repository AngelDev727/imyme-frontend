<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action, Mutation} from 'vuex-class'

@Component
export default class PasswordReset extends Vue {
    public name: string = 'PasswordReset'

    creds = {
        email: null,
    }
    newPassword = {
        password: null,
        password_repeat: null,
    }
    resetSent = false
    @Action('auth/sendPasswordRecovery') sendPasswordRecovery
    @Action('auth/setNewPassword') setNewPassword
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage

    get userId() {
        return this.$route.query.id
    }
    get resetToken() {
        return this.$route.query.token
    }

    async sendResetMail() {
        await this.sendPasswordRecovery(this.creds)
        this.resetSent = true
    }
    async resetPassword() {
        if (this.newPassword.password === this.newPassword.password_repeat) {
            await this.setNewPassword({
                userId: this.userId,
                resetToken: this.resetToken,
                password: this.newPassword.password,
            })
            this.$router.push({name: 'top'})
        } else {
            this.setErrorMessage({
                message: 'Password Mismatch',
            })
        }
    }
}
</script>

<template>
    <div v-if="userId && resetToken" class="cart max-page-w">
        <h1 class="pt-2">パスワード再設定</h1>
        <form action @submit.prevent="resetPassword">
            <section id="SNS" class="p-1">
                <input
                    v-model="newPassword.password"
                    class="form--input"
                    required
                    minlength="5"
                    maxlength="10"
                    type="password"
                    placeholder="PASSWORD"
                />
                <input
                    v-model="newPassword.password_repeat"
                    class="form--input"
                    required
                    minlength="5"
                    maxlength="10"
                    type="password"
                    placeholder="REPEAT PASSWORD"
                />
            </section>
            <div class="flex-row flex-center">
                <button class="btn btn-auth w-70" type="submit" value="login">
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-login" />
                    </svg>
                    <span class="m-auto">設定する</span>
                </button>
            </div>
        </form>
    </div>
    <div v-else class="cart max-page-w">
        <h1 class="pt-2">パスワード再発行</h1>
        <form v-if="!resetSent" action @submit.prevent="sendResetMail">
            <section id="SNS" class="p-1">
                <h3 class="py-1">メールアドレスを記入してください</h3>
                <input
                    v-model="creds.email"
                    class="form--input"
                    required
                    type="email"
                    placeholder="MAIL ADDRESS(ID)"
                />
            </section>
            <div class="flex-row flex-center">
                <button class="btn btn-auth w-70" type="submit" value="login">
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-login" />
                    </svg>
                    <span class="m-auto">メールを送信</span>
                </button>
            </div>
        </form>
        <div v-else>
            <section class="bg-body p-1">
                <div class="text-regular mb-2">
                    パスワード再発行のメールを送信いたしました。メールを確認して、パスワード再発行用のリンクをクリックしてください。
                </div>
                <router-link
                    :to="{name: 'top'}"
                    class="btn btn-auth w-70 m-auto"
                    type="submit"
                    value="login"
                >
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-login" />
                    </svg>
                    <span class="m-auto">home</span>
                </router-link>
            </section>
        </div>
    </div>
</template>
