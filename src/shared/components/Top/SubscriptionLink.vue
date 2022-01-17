<template>
    <section class="subscr">
        <router-link :to="{path: 'subscriptions-description'}">
            <div class="desc">
                <svg class="icon-stroke icon-stroke-bold icon-top-page">
                    <use xlink:href="#icon-cycle" />
                </svg>
                <h2>
                    季節によって変化する肌を<br />
                    imymeがサポート
                </h2>
                <p>
                    詳しく見る＞
                </p>
            </div>
            <div class="img">
                <img
                    src="@app/assets/images/Subscriptions/header_subscriptions_pc.jpg"
                    alt="定期購入のご案内"
                />
            </div>
        </router-link>
    </section>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class SubscriptionLink extends Vue {
    public name: string = 'SubscriptionLink'
}
</script>

<style scoped>
.subscr {
    margin: 0;
    position: relative;
}
.desc {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
}
.img img {
    width: 100%;
    height: 100vw;
    object-fit: cover;
}
h2 {
    text-transform: none;
    margin: 0.5em 0;
}
p {
    margin: 0.5em 0 0;
}

@media screen and (min-width: 768px) {
    .img img {
        height: 760px;
    }
}
</style>
