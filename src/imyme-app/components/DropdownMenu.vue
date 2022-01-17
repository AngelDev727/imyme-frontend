<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {clearAccessToken} from '@/shared/auth'
import {isLoggedIn} from '@/shared/auth.js'
import {Action, Getter} from 'vuex-class'

@Component
export default class DropdownMenu extends Vue {
    public name: string = 'DropdownMenu'

    @Action('resetState') resetState
    @Getter('survey/nextQuestion') nextQuestion
    routes = [
        {
            text: 'HOME',
            to: {
                name: 'top',
                params: {
                    override: true,
                },
            },
        },
        {
            text: 'imymeについて',
            to: {
                name: 'brand',
            },
        },
        {
            text: 'imymeの成分',
            to: {
                name: 'ingredient',
            },
        },
        // 2021.10.30　今後追加予定のページとのことでコメントアウト
        // {
        //     text: '製品情報',
        //     to: {
        //         name: 'top',
        //     },
        // },
    ]

    get loggedIn() {
        return isLoggedIn()
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
    <div id="nav-dropdown" class="bg-body navbar--dropdown">
        <ul>
            <li
                v-for="(route, key) in routes"
                :key="key"
                class="links"
                @click="$emit('toggle-nav-links')"
            >
                <router-link :to="route.to">
                    {{ route.text }}
                </router-link>
            </li>
            <li class="log-controll" @click="$emit('toggle-nav-links')">
                <router-link
                    v-if="!loggedIn"
                    :to="{name: 'login'}"
                >
                    ログイン
                    /
                    マイページ
                </router-link>
                <div v-else @click="logout">
                    ログアウト
                </div>
            </li>
            <li @click="$emit('toggle-nav-links')">
                <router-link
                    :to="{name: 'survey', params: {question: nextQuestion}}"
                >
                    <img
                        src="@app/assets/images/top/sp/hearder_btnCounseling.jpg"
                        alt="カウンセリングボタン"
                    />
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.navbar--dropdown {
    padding: 2rem 0;
    text-align: center;
}
.navbar--dropdown > ul {
    margin: auto;
    text-align: left;
    width: max-content;
}
.navbar--dropdown li:not(:last-child) {
    text-indent: 5px;
}
.navbar--dropdown img {
    width: 300px;
}
.links {
    border-bottom: 2px solid #111;
    font-size: 20px;
}
.log-controll {
    padding: 20px 0;
    font-size: 18px;
}
</style>
