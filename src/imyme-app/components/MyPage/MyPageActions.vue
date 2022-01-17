<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {clearAccessToken} from '@/shared/auth.js'
import {State, Action} from 'vuex-class'

@Component
export default class MyPageActions extends Vue {
    public name: string = 'MyPageActions'

    @State(state => state.checkout.userSubscriptions) userSubscriptions!: any[]
    @Action('resetState') resetState

    get subscriptions() {
        if (this.userSubscriptions) {
            return this.userSubscriptions.filter(subscription => {
                if (subscription.status !== 'CANCELLED') {
                    return subscription
                }
            })
        } else {
            return []
        }
    }

    logout() {
        clearAccessToken()
        sessionStorage.clear()
        this.resetState()
        this.$router.push({name: 'top'})
    }
}
</script>

<template>
    <div>
        <!-- <div v-if="subscriptions && subscriptions.length > 0">
            <router-link
                tag="button"
                class="btn m-0 mb-1 w-center-70"
                :to="{name: 'subscriptions'}"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-next" />
                </svg>
                <span class="m-auto">定期購入一覧</span>
            </router-link>
        </div> -->

        <button class="btn m-3 mb-4 w-center-70" @click="logout">
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-login" />
            </svg>
            <span class="m-auto">ログアウト</span>
        </button>
    </div>
</template>
