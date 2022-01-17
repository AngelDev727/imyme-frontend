<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({
    components: {
        AboutSection: () => import('@shared/components/Top/AboutSection.vue'),
        Carousel: () => import('@app/components/Carousel.vue'),
        Campain: () => import('@shared/components/Top/Campain.vue'),
        Footer: () => import('@shared/components/Top/Footer.vue'),
        NewsSection: () => import('@shared/components/Top/NewsSection.vue'),
    },
})
export default class Top extends Vue {
    public name: string = 'Top'
}
</script>

<template>
    <div class="top-page">
        <Carousel />
        <!-- 2021.11.01 ニュースの更新処理等含め要検討の為、今回はコメントアウト
        <NewsSection /> -->
        <!-- 2021.10.30 現在、検証もできない為未実装
        <Campain />
        -->
        <AboutSection />
        <router-link
            ref="counseling-btn"
            class="counseling-btn"
            :to="{name: 'survey', params: {question: 1}}"
        >
            <img
                src="@app/assets/images/top/pc/btnCounseling.jpg"
                alt="オンライン肌カウンセリング"
                class="pc"
            />
            <img
                src="@app/assets/images/top/sp/btnCounseling.jpg"
                alt="オンライン肌カウンセリング"
                class="sp"
            />
        </router-link>
        <img
            src="@app/assets/images/top/pc/footerimg.jpg"
            class="footer-img pc"
        />
        <img
            src="@app/assets/images/top/sp/footerimg.jpg"
            class="footer-img sp"
        />
        <!-- 2021.10.30 現在、検証もできない為未実装
        <div>
            MEDIA
        </div>
        <div>
            JOURNAL
        </div>
        </div> -->
        <Footer />
    </div>
</template>

<style scoped>
.top-page {
    margin-top: 80px;
}
.counseling-btn {
    display: block;
    margin: 50px auto;
    width: 805px;
}
.counseling-btn img {
    width: 805px;
}
.footer-img {
    width: 100%;
}
@media screen and (max-width: 768px) {
    .top-page {
        margin-top: 60px;
    }
    .counseling-btn,
    .counseling-btn img {
        width: 390px;
    }
}
@media screen and (max-width: 390px) {
    .counseling-btn,
    .counseling-btn img {
        width: 320px;
    }
}
</style>
