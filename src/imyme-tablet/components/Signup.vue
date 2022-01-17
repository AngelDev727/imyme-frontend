<template>
    <div>
        <h1>Signup</h1>
        <form action @submit.prevent="signUp">
            <section id="SNS" class="p-1 w-center-70">
                <h3 class="py-1">SNS</h3>
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
                <router-link class="btn w-center-70 my-1" :to="{name: 'results'}">
                    <svg class="icon icon-stroke icon-btn">
                        <use xlink:href="#icon-log-in" />
                    </svg>
                    <span class="mx-auto">
                        <small>サインアップ</small>
                    </span>
                </router-link>
            </section>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Signup',

    data() {
        return {
            creds: {
                email: null,
                password: null,
                password_repeat: null,
            },
        }
    },

    methods: {
        signUp() {
            if (this.creds.password === this.creds.password_repeat) {
                this.$store.dispatch('auth/signUp', this.creds)
            } else {
                this.$store.commit('application/SET_ERROR_MESSAGE', {
                    message: 'Password Mismatch',
                })
            }
        },
    },
}
</script>
