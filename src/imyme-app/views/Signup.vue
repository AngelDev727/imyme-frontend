<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action, Mutation} from 'vuex-class'

interface Credentials {
    email: any
    password: any
    password_repeat: any
}

@Component
export default class Signup extends Vue {
    public name: string = 'Signup'

    creds: Credentials = {
        email: null,
        password: null,
        password_repeat: null,
    }
    processing: boolean = false
    patternValidMail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    invalidInput: boolean = false

    @Action('application/loadingPromiseAdd') loadingPromiseAdd
    @Action('auth/signUp') signUpAction
    @Action('auth/addStoreAttrAction') addStoreAttrAction
    @Action('auth/signIn') signInAction
    @Action('user/getUser') getUserAction
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage

    get redirectTo(): string {
        const next = this.$route.query.next
        return typeof next === 'string' ? next : 'top'
    }

    async signUpLoad() {
        this.invalidInput = false
        this.processing = true
        if (this.creds.email.match(this.patternValidMail) === null) {
            this.setErrorMessage({
                error: 'Invalid Email Address',
            })
            this.invalidInput = true
        } else if (this.creds.password !== this.creds.password_repeat) {
            this.setErrorMessage({
                error: 'Password Mismatch',
            })
        } else {
            this.loadingPromiseAdd([
                await this.signUp().catch(() => {
                    this.processing = false
                }),
            ])
        }
        this.processing = false
    }

    async signUp() {
        const newUser = await this.signUpAction(this.creds)
        if (newUser) {
            const storeCode =
                sessionStorage.getItem('storeCode') ||
                sessionStorage.getItem('storeCodeRef')
            if (storeCode) {
                await this.addStoreAttrAction({
                    remoteId: newUser.id,
                    storeCode: storeCode,
                }).catch(console.error)
            }
            await this.signInAction(this.creds)
            await this.getUserAction()
            //then triggers watch for user.id on app
        }
    }
}
</script>

<template>
    <div class="cart max-page-w-sm">
        <h1>新規会員登録(無料)</h1>
        <span v-if="invalidInput">
            <div class="invalid-title">ご入力されたメールアドレスに誤りはございませんか？</div>
            <div class="invalid-detail p-1">
                <div>ご入力されたメールアドレスは登録できない形式のメールアドレスです</div>
                <div>お手数をおかけしますが、他のアドレスでご利用いただくようお願いします</div>
                <div class="mt-2">【よくある登録できないメールアドレスの例】</div>
                <ul>
                    <li>アットマークの直前やメールアドレスの先頭にピリオドがある</li>
                    <ul class="two-stage">
                        <li>（例：xxxx.@xxxx）</li>
                    </ul>
                    <li>アットマークより前で、ピリオドが連続している</li>
                    <ul class="two-stage">
                        <li>（例：xx..xx@xxx）</li>
                    </ul>
                    <li>半角英数字と一部の記号（.!#$%&'*+-/=?^_`{|}~）以外の文字列を含んでいる</li>
                    <li>アットマークより後ろに存在しないドメインを指定している</li>
                </ul>
            </div>
        </span>
        <form action @submit.prevent="signUpLoad">
            <section id="SNS" class="p-1">
                <h3 class="py-1">メールアドレスとパスワードを入力</h3>
                <input
                    v-model="creds.email"
                    class="form--input"
                    required
                    type="email"
                    placeholder="メールアドレス"
                />
                <input
                    v-model="creds.password"
                    class="form--input"
                    required
                    minlength="5"
                    maxlength="10"
                    type="password"
                    placeholder="パスワード"
                />
                <input
                    v-model="creds.password_repeat"
                    class="form--input"
                    required
                    minlength="5"
                    maxlength="10"
                    type="password"
                    placeholder="パスワード再入力"
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
                            登録中
                        </span>
                        <span v-else class="m-auto">登録</span>
                    </button>
                </div>
            </section>
        </form>
        <div class="form--title text-center my-2">
            すでにアカウントをお持ちの方はこちら
        </div>
        <div>
            <router-link
                :to="{name: 'login', query: {next: redirectTo}}"
                tag="button"
                class="btn btn-auth w-70 m-auto"
                value="login"
            >
                <span class="m-auto">ログイン</span>
            </router-link>
        </div>
        <div class="text-regular text-center my-2">
            <router-link to="/guide">利用規約</router-link>・
            <router-link to="/privacy">個人情報取り扱に同意</router-link>
        </div>
    </div>
</template>

<style scoped>
.invalid-title {
    margin: 2rem 2rem;
    color: red;
    font-weight: bold;
}
.invalid-detail {
    margin: 2rem 1.5rem 3rem;
    background-color: #FCE3E3;
}
.invalid-detail li {
	list-style-type: disc;
	margin-left: 24px;
	text-align: left;
}
.invalid-detail .two-stage li {
	list-style-type: disc;
	margin-left: 48px;
	text-align: left;
}
</style>
