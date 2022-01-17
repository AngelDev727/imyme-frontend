<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
    public name: string = 'Footer'

    followIcons = [
        {
            name: ['fab', 'instagram'],
            href: 'https://www.instagram.com/imyme_cosme/',
        },
        // 今後ラインなどのメディア媒体も増やすそうですが、現在はないので一旦コメントアウト
        // {
        //     name: ['fab', 'line'],
        //     href: '',
        // },
        // {
        //     name: ['far', 'envelope'],
        //     href: '',
        // },
    ]
    routes = [
        {
            text: '会社概要',
            to: {
                name: 'company',
            },
        },
        {
            text: '個人情報の取り扱いについて',
            to: {
                name: 'privacy',
            },
        },
        {
            text: '特定商取引法に基づく表記',
            to: {
                name: 'terms',
            },
        },
        {
            text: 'お問い合わせ',
            to: {
                name: 'contact',
            },
        },
    ]
}
</script>

<template>
    <section class="text-center footer--section m-0 pt-5">
        <h2>
            FOLLOW US
        </h2>
        <div class="follow-links">
            <a
                v-for="(icon, i) in followIcons"
                :key="`icon-${i}`"
                :href="icon.href"
            >
                <font-awesome-icon :icon="icon.name" />
            </a>
        </div>
        <div class="pt-3 mt-3">
            <router-link
                v-for="(route, i) in routes"
                :key="`route-${i}`"
                :to="route.to"
                class="px-2"
            >
                {{ route.text }}
            </router-link>
        </div>
        <div class="pt-10 pb-3">
            <span>
                Copyright &#169; kimelab inc. All Rights Reserved.
            </span>
        </div>
    </section>
</template>

<style scoped>
.follow-links svg {
    height: 60px;
    margin: 1rem;
    vertical-align: middle;
    width: 60px;
}
.pt-3,
.pb-3 {
    font-weight: bold;
}
.pt-3 {
    font-size: 14px;
}
.pt-10 {
    padding-top: 10rem;
}
@media screen and (max-width: 768px) {
    .px-2 {
        display: block;
        font-weight: 500;
        margin: 2rem auto;
    }
}
</style>
