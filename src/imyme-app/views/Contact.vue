<template>
    <div class="pt-5 mt-2 max-page-w">
        <section class="py-2 pb-2 px-1">
            <h2 class="pb-1">お問い合わせ</h2>

            <form class="p-1" action @submit.prevent="sendMessage">
                <label class="form--label" for="name">名 前</label>
                <div class="flex-row flex-sb">
                    <input
                        id="name"
                        v-model="contact.firstName"
                        required
                        class="form--input half"
                        type="text"
                        placeholder="姓"
                    />
                    <input
                        id="name"
                        v-model="contact.lastName"
                        required
                        class="form--input half"
                        type="text"
                        placeholder="名"
                    />
                </div>

                <label class="form--label" for="email">メールアドレス</label>
                <input
                    id="email"
                    v-model="contact.email"
                    required
                    class="form--input"
                    type="email"
                />

                <label class="form--label" for="title">電話番号</label>
                <input
                    id="title"
                    v-model="contact.phone"
                    required
                    class="form--input"
                    type="tel"
                />

                <label class="form--label" for="message">
                    メッセージ本文
                </label>
                <textarea
                    id="message"
                    v-model="contact.content"
                    required
                    class="form--input"
                    rows="10"
                    name
                />

                <div class="flex-row">
                    <input
                        id="confirm"
                        v-model="confirm"
                        required
                        class="form--input"
                        type="checkbox"
                    />
                    <label class="form--label" for="confirm">
                        上記内容に問題が無ければこちらに
                        <br />チェック入れ送信ボタンをクリック下さい。
                    </label>
                </div>

                <div class="flex-row flex-center mt-3">
                    <button class="btn w-70" type="submit">
                        <svg class="icon-stroke icon-btn">
                            <use xlink:href="#icon-paper-plane" />
                        </svg>
                        <span class="m-auto">送信</span>
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action} from 'vuex-class'
// import {connect} from 'net'

@Component
export default class Contact extends Vue {
    public name: string = 'Contact'

    contact: any = {}
    confirm: boolean = false
    @Action('social/sendInquiry') sendInquiry

    async sendMessage() {
        if (this.confirm) {
            await this.sendInquiry({
                content: this.contact.content,
                email: this.contact.email,
                firstName: this.contact.firstName,
                lastName: this.contact.lastName,
                phone: this.contact.phone,
            })
            this.$router.push('/')
        }
    }
}
</script>
