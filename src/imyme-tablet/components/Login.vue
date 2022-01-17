<template>
    <div class="cart">
        <form action @submit.prevent="signIn">
            <section id="SNS" class="p-1 w-80 mx-auto">
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
                    type="password"
                    placeholder="パスワード"
                />
                <div class="flex-row flex-center">
                    <button class="btn w-80 my-2" type="submit" value="login">
                        <svg class="icon-stroke icon-btn">
                            <use xlink:href="#icon-login" />
                        </svg>
                        <span class="m-auto text-tiny">ログイン</span>
                    </button>
                </div>
            </section>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',

    data() {
        return {
            creds: {
                email: null,
                password: null,
            },
        }
    },

    mounted() {
        sessionStorage.clear()
        localStorage.clear()
        this.$store.dispatch('resetState')
    },

    methods: {
        signIn() {
            this.$store.dispatch('auth/signIn', this.creds).then(response => {
                this.$store.dispatch('user/getUser').then(user => {
                    this.$store.dispatch(
                        'tablet/getCustomerByRemoteId',
                        user.id,
                    )
                    this.$store
                        .dispatch('survey/getAnswerId', user.id)
                        .then(results => {
                            this.$router.push({name: 'results'})
                        })
                        .catch(err => {
                            this.$router.push({
                                name: 'survey',
                                params: {question: 'start'},
                            })
                        })
                })
            })
        },
    },
}
</script>
