<template>
    <div class="cart max-page-w-sm">
        <form action @submit.prevent="signIn">
            <section id="SNS" class="p-1">
                <h3 class="py-1">登録 ID でログイン</h3>
                <input
                    v-model="creds.email"
                    required
                    class="form--input"
                    type="email"
                    placeholder="メールアドレス"
                />
                <input
                    v-model="creds.password"
                    required
                    class="form--input"
                    minlength="5"
                    maxlength="10"
                    type="password"
                    placeholder="パスワード"
                />
                <div class="flex-row flex-center">
                    <button
                        class="btn btn-auth w-70"
                        type="submit"
                        value="login"
                        :disabled="processing"
                    >
                        <svg class="icon-stroke icon-btn">
                            <use xlink:href="#icon-login" />
                        </svg>
                        <span v-if="processing" class="m-auto">
                            ログイン中
                        </span>
                        <span v-else class="m-auto">ログイン</span>
                    </button>
                </div>
                <div class="form--title">
                    <router-link :to="{name: 'password-reset'}" class="px-1">
                        PASSWORDを忘れた場合
                    </router-link>
                </div>
            </section>
        </form>
        <div class="form--title text-center my-2">
            まだ会員登録されていない方
        </div>
        <div>
            <router-link
                :to="{name: 'signup', query: {next: redirectTo}}"
                class="btn btn-auth w-70 m-auto"
            >
                <span class="m-auto">新規登録(無料)</span>
            </router-link>
        </div>
        <div class="text-regular text-center my-2">
            <router-link to="/guide">利用規約</router-link>・
            <router-link to="/privacy">個人情報取り扱に同意</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action} from 'vuex-class'

@Component
export default class Login extends Vue {
    public name: string = 'Login'

    creds = {
        email: null,
        password: null,
    }
    processing = false
    @Action('application/loadingPromiseAdd') loadingPromiseAdd
    @Action('user/getUser') getUser
    @Action('auth/signIn') getSignIn

    get redirectTo() {
        return this.$route.query.next || 'top'
    }

    async signIn() {
        this.processing = true
        this.loadingPromiseAdd([
            await this.getSignIn(this.creds).catch(() => {
                this.processing = false
            }),
            await this.getUser().catch(() => {
                this.processing = false
            }),
            //then triggers watch for user.id on app
        ])
    }
}
</script>
