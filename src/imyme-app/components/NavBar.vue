<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import DropdownMenu from './DropdownMenu.vue'
import {Getter} from 'vuex-class'

@Component({
    components: {
        DropdownMenu,
    },
})
export default class NavBar extends Vue {
    public name: string = 'NavBar'

    showNavLinks: boolean = false
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
    icons = [
        {
            name: ['far', 'user'],
            to: {
                name: 'mypage',
            },
        },
        {
            name: 'info-circle',
            to: {
                name: 'guide',
            },
        },
        {
            name: 'shopping-cart',
            to: {
                name: 'cart',
            },
        },
    ]
    @Getter('checkout/getCountInCart') countInCart

    toggleNavLinks() {
        this.showNavLinks = !this.showNavLinks
    }
}
</script>

<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <router-link :to="{name: 'top', params: {override: true}}">
                <img
                    src="@shared/assets/images/logo.svg"
                    class="icon-stroke"
                />
            </router-link>
        </div>
        <div class="links-wrap pc">
            <ul class="nav-links">
                <li v-for="(route, i) in routes" :key="'link-' + i">
                    <router-link :to="route.to">
                        {{ route.text }}
                    </router-link>
                </li>
            </ul>
            <div class="counseling-btn">
                <router-link :to="{name: 'survey', params: {question: 1}}">
                    <img
                        src="@app/assets/images/top/pc/hearder_btnCounseling.jpg"
                        alt="オンライン肌カウンセリング"
                    />
                </router-link>
            </div>
            <div class="nav-icons">
                <router-link
                    v-for="(icon, i) in icons"
                    :key="'icon-' + i"
                    :to="icon.to"
                    class="relative"
                >
                    <font-awesome-icon :icon="icon.name" />
                    <span
                        v-if="
                            icon.to.name === 'cart' &&
                            countInCart > 0
                        "
                        class="button-badge"
                    >
                        {{ countInCart }}
                    </span>
                </router-link>
            </div>
        </div>
        <div class="sp">
            <div class="menu" @click="toggleNavLinks">
                <img
                    v-if="!showNavLinks"
                    src="@app/assets/images/top/sp/drawer_btn.png"
                    alt="MENU"
                />
                <font-awesome-icon v-else icon="times" />
            </div>
            <div class="nav-icons">
                <router-link
                    v-for="(icon, i) in icons"
                    :key="'icon-sp-' + i"
                    :to="icon.to"
                    class="relative"
                >
                    <font-awesome-icon :icon="icon.name" />
                    <span
                        v-if="
                            icon.to.name === 'cart' &&
                            countInCart > 0
                        "
                        class="button-badge"
                    >
                        {{ countInCart }}
                    </span>
                </router-link>
            </div>
        </div>
        <transition
            duration="5000"
            :css="false"
            @enter="$enter"
            @after-enter="$afterEnter"
            @leave="$leave"
        >
            <DropdownMenu
                v-if="showNavLinks"
                data-testid="nav-list"
                @toggle-nav-links="toggleNavLinks"
            />
        </transition>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: #fff;
    display: block;
    font-size: 1.3rem;
    height: 80px;
    line-height: 40px;
    padding: 20px 0;
    text-align: right;
    width: 100%;
}
.navbar-logo {
    left: 5%;
    position: absolute;
    top: 0;
    width: fit-content;
}
.navbar-logo img {
    height: 80px;
    vertical-align: middle;
}
.links-wrap {
    width: 95vw;
}
.links-wrap > div,
.links-wrap > ul,
.links-wrap li,
.nav-links a,
.sp > div {
    display: inline-block;
}
.navbar li {
    margin: auto;
    width: fit-content;
    padding: 0 1rem;
}
.nav-links {
    padding: 0 1rem;
    text-align: right;
}
.counseling-btn {
    height: 40px;
    vertical-align: middle;
    width: 320px;
}
.counseling-btn > a {
    height: 34px;
}
.pc .nav-icons {
    margin: auto;
    padding: 0 25px;
    text-align: center;
    vertical-align: middle;
}
.nav-icons a {
    color: #111111;
    display: inline-block;
    margin: 0 0.5rem;
}
.nav-icons svg {
    height: 25px;
    vertical-align: middle;
    width: 25px;
}
.button-badge {
    background-color: #fa3e3e;
    border-radius: 50%;
    color: #fff;
    display: block;
    font-weight: bold;
    left: 16px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    top: 0px;
    width: 20px;
}
@media screen and (max-width: 1024px) {
    .pc .nav-icons {
        padding: 0;
    }
}
@media screen and (max-width: 768px) {
    .navbar {
        height: 60px;
        padding: 0;
        text-align: left;
    }
    .navbar-logo {
        left: 50%;
        top: 10px;
        transform: translateX(-50%);
    }
    .navbar-logo img {
        height: 40px;
    }
    .menu {
        height: 60px;
        width: 60px;
    }
    .menu img,
    .menu svg {
        height: 60px;
        width: 60px;
        vertical-align: middle;
    }
    .menu svg {
        color: #ccc;
        padding: 10px;
    }
    .nav-icons {
        float: right;
        margin: 10px;
    }
}
</style>
