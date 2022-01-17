<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import BrandIntro from '@app/components/TrialSet/BrandIntro.vue'
import Breadcrumbs from '@shared/components/Breadcrumbs.vue'
import Footer from '@shared/components/Top/Footer.vue'
import ProductIntro from '@app/components/TrialSet/ProductIntro.vue'
import SampleProduct from '@app/components/TrialSet/SampleProduct.vue'
import SendSurveyBtn from '@app/components/TrialSet/SendSurveyBtn.vue'
import TrialPrice from '@app/components/TrialSet/Price.vue'

@Component({
    components: {
        BrandIntro,
        Breadcrumbs,
        Footer,
        ProductIntro,
        SampleProduct,
        SendSurveyBtn,
        TrialPrice,
    },
})
export default class TrialSet extends Vue {
    public name: string = 'TrialSetView'

    breadcrumbs: any = [
        {
            path: {
                name: 'top',
            },
            text: 'Top',
        },
        {
            text:
                '4 in 1 ウォーターレス・スキンケア　パーソナライズセラム トライアルセット【初回限定】【送料無料】【未開封のみ8日間返品可】',
        },
    ]
}
</script>

<template>
    <div id="trial">
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
        <h1>
            <div class="main-visual">
                <img
                    class="pc"
                    src="@app/assets/images/trialSet/trial-main.jpg"
                    alt="imyme パーソナライズセラム：トライアルセット"
                />
                <img
                    class="sp"
                    src="@app/assets/images/trialSet/sp_trial-main.jpg"
                    alt="imyme パーソナライズセラム：トライアルセット"
                />
            </div>
        </h1>
        <div class="trial-content">
            <h2>
                しっかり2週間、自分の肌と向き合うトライアルセット
            </h2>
            <TrialPrice />
            <SendSurveyBtn />
            <ProductIntro />
        </div>
        <SampleProduct />
        <TrialPrice />
        <SendSurveyBtn />
        <BrandIntro />
        <TrialPrice />
        <SendSurveyBtn />
        <Footer />
    </div>
</template>

<style scoped>
#trial {
    background: #f8f4ef;
    font-family: 'brandon-grotesque', 'Avenir', 'Segoe UI', '游ゴシック Medium',
        'Yu Gothic Medium', YuGothic, '游明朝', '游明朝体', 'Yu Mincho',
        YuMincho, sans-serif;
    margin: 80px auto 0;
    padding: 20px 0;
}
.trial-content {
    font-size: 1.25rem;
    margin: 0 auto;
}
.trial-content h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-block-end: 0.83em;
    margin-block-start: 0.83em;
    text-align: center;
}
.main-visual {
    width: auto;
}
.main-visual img {
    height: auto;
    max-width: 100%;
    margin: auto;
}

@media only screen and (max-width: 768px) {
    #trial {
        margin-top: 60px;
    }
    .trial-content {
        font-size: 2rem;
        margin: 0 auto;
        min-width: 350px;
        width: 95%;
    }
    .trial-content h2 {
        text-align: center;
        width: 100%;
    }
}
</style>
