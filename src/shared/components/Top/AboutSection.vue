<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class AboutSection extends Vue {
    public name: string = 'AboutSection'

    routes = [
        {
            text: 'imymeの約束',
            to: {
                name: 'brand',
            },
        },
        {
            text: '主成分を見る',
            to: {
                name: 'ingredient',
            },
        },
        // 2021.10.30　今後追加予定のページとのことでコメントアウト
        // {
        //     text: '製品一覧を見る',
        //     to: {
        //         name: 'top',
        //     },
        // },
    ]
}
</script>

<template>
    <section class="text-center m-0">
        <h2 id="about-imyme" class="text-uppercase">
            about
            <p class="sub-title">imymeについて</p>
        </h2>
        <div class="content-wrap">
            <div class="imyme-img pc">
                <img src="@app/assets/images/top/pc/aboutimg.jpg" class="pc" />
                <img src="@app/assets/images/top/sp/aboutimg.jpg" class="sp" />
            </div>
            <div class="about-text">
                <h2>
                    植物生体水90％以上。<br />
                    植物＆サイエンスで肌トラブルのない素肌へ導く<br />
                    ウォーターレス・スキンケア
                </h2>
                <p>
                    私たちは、imymeをお使いになった方の肌が、みずみずしく<br />
                    うるおい、いつも正常に輝く整ったキメを作り続けるために<br />
                    3つの持続可能な取り組みをお約束します。
                </p>
                <p class="under-line">
                    ウォーターレス・ビューティへの取り組み<br />
                    生産者とのパートナーシップと化粧品の新しい未来<br />
                    年齢や性別を問わない、あなたの肌に寄り添うスキンケア
                </p>
                <div class="links">
                    <router-link
                        v-for="(route, i) in routes"
                        :to="route.to"
                        :key="i"
                    >
                        {{route.text}}
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.content-wrap {
    display: flex;
}
.imyme-img {
    width: 50%;
}
.imyme-img img {
    width: 100%;
}
.about-text {
    padding-left: 2rem;
    position: relative;
    width: 50%;
}
.about-text,
.about-text h2 {
    text-align: left;
}
.about-text p {
    font-size: 18px;
    line-height: 40px;
}
.under-line {
    margin: 3rem 0;
    text-decoration: underline;
    text-decoration-color: #ccc;
    text-decoration-thickness: 8px;
}
.links {
    margin-left: auto;
    position: relative;
    width: 45%;
}
.links a {
    border-bottom: 2px dashed #333;
    display: block;
    font-size: 16px;
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 5px;
    width: 100%;
}
.links a::before {
    content: '>';
    font-size: 26px;
    position: absolute;
    right: 0;
}
@media screen and (max-width: 768px) {
    .content-wrap {
        display: block;
        position: relative;
    }
    .about-text {
        background-image: url(../../../imyme-app/assets/images/top/sp/aboutimg.jpg);
        background-size: cover;
        padding: 1.5rem 2rem 10rem;
        width: 100%;
    }
    .links {
        margin-left: 0;
    }
}
</style>
