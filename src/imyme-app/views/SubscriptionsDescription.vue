<template>
    <div class="max-page-w subscr_container">
        <section class="subscr_index">
            <img
                src="@app/assets/images/Subscriptions/header_subscriptions_pc.jpg"
                alt="定期購入のご案内"
            />
        </section>
        <section class="subscr_header">
            <h2>
                季節によって変化する肌は<br />
                定期購入がオススメ。
            </h2>
            <p>
                自宅にいながら、お肌のプロのアドバイスを<br class="sp_only" />
                受けられる安心感。
            </p>
            <p>
                imymeの肌サポートシステム（定期購入）は<br class="sp_only" />
                もう体験いただきましたか？<br />
                imymeの肌サポートシステムは、<br />
                10万人の肌分析をもとにお肌の状態にピッタリのセラムを<br />
                継続してお使いいただくことで、<br class="sp_only" />健康的な素肌を手に入れてもらえるよう<br class="sp_only" />
                スキンケア方法から化粧品の成分、生活習慣に至るまで様々な角度でサポートを行います。
            </p>
        </section>
        <section class="content_cycle">
            <div class="">
                <h2>
                    <img :src="cycle" class="cycle" /><br />
                    一人一人に合わせた<br>サイクル美容
                </h2>
                <p>
                    通常のスキンケアの定期購入は同じ製品をずっとおすすめしますが、imymeでは季節の変化とひとりひとりのお肌の変化に合わせて、その時のお肌状態にピッタリの１本をレコメンドします。 １年間のサイクルを通じて、お肌の変化や生活習慣をサポートしながら、お肌自身がしっかりと働き、お肌自ら潤うように習慣づけるプロセスを「サイクル美容」と名付けました。
                </p>
            </div>
            <div class="steps">
                <h3 class="">
                    imymeはお客様のお肌の状態と<br class="sp_only" />
                    カウンセリング（生活環境、食生活）を元に<br />
                    毎月、月々にぴったりなセラムをお届けします。
                </h3>
                <div class="step step1">
                    <img :src="step1" class="step1_img" />
                </div>
                <div class="step step2">
                    <img :src="step2" class="step2_img" />
                </div>
                <div class="step step3">
                    <img :src="step3" class="step3_img" />
                    <p>imyme 定期サイクル</p>
                    <img :src="step3_1" class="step3_1" />
                    <img :src="step3_2" class="step3_2" />
                    <img :src="step3_3" class="step3_3" />
                    <img :src="step3_4" class="step3_4" />
                </div>
                <div class="step graph">
                    <img :src="graph" class="graph_img" />
                </div>
                <div class="step example">
                    <p>Aikoさんの<br />セラムの<br />使用パターン</p>
                    <img :src="example1" class="example1" />
                    <img :src="example2" class="example2" />
                    <img :src="example3" class="example3" />
                    <img :src="example4" class="example4" />
                </div>
            </div>
            <p>
                この「サイクル美容」を続けることにより、肌の３つの機能がはたらくようになります。
            </p>
            <div class="content_work">
                <h3>
                    お肌の３つのはたらきについて
                </h3>
                <div class="work work1">
                    <img :src="work1" class="work1_img" />
                    <h4>1-代謝機能</h4>
                    <p>
                        不要になった角質細胞をアカとして押し出す力。<br
                            class="sp_only"
                        />
                        （表皮細胞が生まれる新陳代謝力サイクル)<br
                            class="sp_only"
                        />
                        日焼けしたお肌が元の色に戻るのは、このはたらきのおかげです。
                        <br
                            class="sp_only"
                        />
                        ニキビ跡、シミ、くすみを防ぎます。
                    </p>
                </div>
                <div class="work work2">
                    <img :src="work2" class="work2_img" />
                    <h4>2-水分保持機能</h4>
                    <p>
                        肌内面から角質表面まで水分が保持されることで、角質層の天然保湿因子（NMF）のバランスが保たれ、肌の水分蒸発を抑制し、キメを整え、肌荒れ、小じわを防ぎます。
                    </p>
                </div>
                <div class="work work3">
                    <img :src="work3" class="work3_img" />
                    <h4>3-バリア機能</h4>
                    <p>
                        肌のバリア機能は「皮脂分泌力（皮脂）＋毒素排出（汗）」が肌表面で混ざり合いつくられます。紫外線から肌を守り、水分の蒸発、細菌の繁殖を防ぎます。
                    </p>
                </div>
                <p>
                    imymeのサイクル美容によってお肌の３つのはたらきを正常にして、うるおい、ハリや弾力、明るさ、輝きのある肌になれるよう目指しましょう。３ケ月後、６ケ月後、１年後、キメ細かな美肌の心地よさを味わっていただきたいのです。
                </p>
                <p>
                    <img
                        src="@app/assets/images/Subscriptions/light_tone.png"
                    />
                </p>
                <p>
                    imymeのセラムは、１本使い終わった頃、お肌の３つの働きがじわじわと回復するように感じます。（人によっては、そんなに変わっていないように思えるかもしれませんが、お肌のミクロレベルでは大きな変化が起こっています）今、中断したらせっかく回復した肌の働きがバランスを崩し、肌トラブルが起こりやすい状態に戻ってしまいます！
                </p>
                <p>
                    <img src="@app/assets/images/Subscriptions/spyral.png" />
                </p>
                <p>
                    今より２倍、３倍のキメの細かさを体験したくないですか？imymeのセラムは、１本２本と使い続けるほどに肌のキメがぐんと細かくなってくるのが大きな特徴です。<br />毛穴もシワも、元はといえばキメの乱れからくる問題！ 美しいキメはすべての問題を跳ね返すのです。
                </p>
            </div>
        </section>

        <section v-if="$route.query.ref === 'results'" class="content_start">
            <img :src="iconStart" class="iconStart" />
            <h2>
                さぁ、imymeで<br />
                サイクル美容を始めましょう!
            </h2>
            <p class="content_start_desc">
                美しさの階段を登り、きめ細かな肌をぜひご体験いただきたくために、ぜひサイクル美容を始めてみませんか？<br />
                スタート前に気になるコトについてお答えします！
            </p>
            <div class="desc_imyme">
                <h3>
                    imymeは
                </h3>
                <dl>
                    <dt>1</dt>
                    <dd><span>解約縛りはありません。</span></dd>
                </dl>
                <dl>
                    <dt>2</dt>
                    <dd><span>サイクルはずらせます。</span></dd>
                </dl>
                <dl>
                    <dt>3</dt>
                    <dd><span>おやすみできます。</span></dd>
                </dl>
                <dl>
                    <dt>4</dt>
                    <dd>
                        <span>
                            合わないときは、<br />別のセラムをリコメンド。
                        </span>
                    </dd>
                </dl>
            </div>
            <p class="lets_start">
                さぁ今すぐimymeの<br class="sp_only" />
                「サイクル美容」を始めましょう！
            </p>
        </section>

        <BackButtons />
    </div>
</template>

<script lang="ts">
//TODO this page needs a rewrite
// styles are in the file but should be in the SCSS
// SVG is directly imported some would be better off added to the icons
import {Vue, Component} from 'vue-property-decorator'
import BackButtons from '@shared/components/Top/BackButtons.vue'

import cycle from '@app/assets/images/Subscriptions/SVG/cycle.svg'
import step1 from '@app/assets/images/Subscriptions/SVG/step1.svg'
import step2 from '@app/assets/images/Subscriptions/SVG/step2.svg'
import step3 from '@app/assets/images/Subscriptions/SVG/step3.svg'
import step3_1 from '@app/assets/images/Subscriptions/SVG/step3_1.svg'
import step3_2 from '@app/assets/images/Subscriptions/SVG/step3_2.svg'
import step3_3 from '@app/assets/images/Subscriptions/SVG/step3_3.svg'
import step3_4 from '@app/assets/images/Subscriptions/SVG/step3_4.svg'
import graph from '@app/assets/images/Subscriptions/SVG/Graph.svg'
import example1 from '@app/assets/images/Subscriptions/example_1.png'
import example2 from '@app/assets/images/Subscriptions/example_2.png'
import example3 from '@app/assets/images/Subscriptions/example_3.png'
import example4 from '@app/assets/images/Subscriptions/example_4.png'
import work1 from '@app/assets/images/Subscriptions/SVG/work1.svg'
import work2 from '@app/assets/images/Subscriptions/SVG/work2.svg'
import work3 from '@app/assets/images/Subscriptions/SVG/work3.svg'
import iconStart from '@app/assets/images/Subscriptions/SVG/start.svg'

@Component({
    components: {
        BackButtons,
    },
})
export default class SubscriptionsDescription extends Vue {
    public name: string = 'SubscriptionsDescription'

    cycle = cycle
    step1 = step1
    step2 = step2
    step3 = step3
    step3_1 = step3_1
    step3_2 = step3_2
    step3_3 = step3_3
    step3_4 = step3_4
    graph = graph
    example1 = example1
    example2 = example2
    example3 = example3
    example4 = example4
    work1 = work1
    work2 = work2
    work3 = work3
    iconStart = iconStart
}
</script>

<style scoped>
#app {
    background-color: #f1f7fe;
}
.subscr_container {
    padding: 0 12px;
    background-color: #f1f7fe;
}
h2,
h3,
h4,
h5 {
    text-transform: unset;
}
h2 {
    line-height: 1.5;
}
section {
    margin: 0;
    padding: 24px 0;
    background-color: transparent;
}
.subscr_index {
    padding: 0;
    margin: 0 -12px;
}
.subscr_index img {
    width: 100%;
    height: 280px;
    object-fit: cover;
}
.subscr_header {
    padding: 24px 0;
    text-align: center;
}
p {
    margin: 1em 0;
    font-size: 11px;
}
.content_cycle {
    background-color: #ffffff;
    padding: 24px 12px;
}
.cycle {
    width: 65px;
}
.steps {
    background-color: rgba(228, 164, 159, 0.1);
    padding: 24px 12px;
}
.steps h3 {
    font-size: 1.8em;
}
.step {
    margin: 2em auto;
    width: 248px;
    position: relative;
}
.step::before {
    content: '';
    display: none;
    background-image: url('../assets/images/Subscriptions/SVG/arrow_bottom.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 75px;
    animation-name: arrow;
    animation-duration: 2s;
    position: absolute;
}
.step1 {
    margin: 2em auto 100px;
}
.step2 {
    margin: 2em auto 70px;
}
.step1::before {
    display: block;
    bottom: -90px;
}
.step2::before {
    display: block;
    bottom: -60px;
}
.step::after {
    width: 100%;
    display: none;
    position: absolute;
    text-align: center;
    font-size: 2rem;
}
.step1::after {
    bottom: -50px;
    display: block;
    content: '1ヶ月後';
}
.step2::after {
    bottom: -20px;
    display: block;
    content: '季節毎';
}
.step3 {
    padding: 90px 0;
    text-align: center;
    position: relative;
}
.step3 img {
    position: absolute;
}
.step3 .step3_img {
    width: 72px;
    position: static;
}
.step3 .step3_1 {
    width: 126px;
    top: 0;
    left: 84px;
}
.step3 .step3_2 {
    width: 91px;
    top: 102px;
    right: -4px;
}
.step3 .step3_3 {
    width: 126px;
    bottom: 0;
    right: 84px;
}
.step3 .step3_4 {
    width: 92px;
    bottom: 102px;
    left: -4px;
}
.step3 p {
    margin: 0;
    font-size: 12px;
}
.graph img {
    width: 100%;
}
.example {
    padding: 94px 0;
    text-align: center;
    position: relative;
}
.example img {
    position: absolute;
}
.example::before {
    display: none;
}
.example .example1 {
    width: 126px;
    top: 0;
    left: 80px;
}
.example .example2 {
    width: 91px;
    top: 96px;
    right: -4px;
}
.example .example3 {
    width: 126px;
    bottom: 0;
    right: 80px;
}
.example .example4 {
    width: 92px;
    bottom: 96px;
    left: -4px;
}

.content_work {
    margin: 3em 0 0;
    text-align: center;
    padding: 0;
}
.content_work h3 {
    background-color: rgba(228, 164, 159, 0.3);
}
.work {
    margin: 2em 0;
}
.work img {
    margin: 1em 0;
    width: 44px;
}
.work h4 {
    font-size: 2.4rem;
}
.content_work > p {
    text-align: left;
}
.content_work > p img {
    width: 100%;
}

.content_start {
    background-color: #ffffff;
    text-align: center;
    padding: 24px 12px;
}
.content_start_desc {
    text-align: left;
}
.iconStart {
    width: 50px;
    margin: 1em auto;
}
.desc_imyme {
    background-color: rgba(228, 164, 159, 0.1);
    padding: 24px 12px;
}
.desc_imyme dl {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #ffffff;
    margin: 1em 0;
}
.desc_imyme dl dt {
    padding: 12px;
    text-align: center;
    width: 1em;
    font-size: 3rem;
}
.desc_imyme dl dd {
    padding: 12px;
    text-align: left;
    flex: 1;
    font-weight: bold;
}
.desc_imyme dl dd span {
    font-size: 1rem;
    display: inline-block;
    border-bottom: 1px solid #fb9ca5;
}
.lets_start {
    font-size: 2.5rem;
}

@keyframes arrow {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@media screen and (min-width: 768px) {
    .subscr_container {
        max-width: 100%;
        padding: 0 50px;
        background-color: #f1f7fe;
        line-height: 2;
    }
    p {
        font-size: 20px;
    }
    .sp_only {
        display: none;
    }
    section {
        max-width: 1200px;
        margin: 0 auto;
    }
    .subscr_index {
        padding: 0;
        margin: 0 -50px;
    }
    .subscr_index img {
        height: auto;
        width: 100vw;
    }
    .subscr_header {
        padding: 0 50px 50px;
        margin: 0 auto;
        text-align: center;
    }
    .subscr_header h2 {
        font-size: 45px;
    }
    .content_cycle {
        padding: 50px 100px;
    }
    .cycle {
        width: 100px;
        margin: 0 0 1em;
    }
    .content_cycle h2 {
        margin: 2em 0;
    }
    .steps {
        padding: 85px;
    }
    .step {
        width: 300px;
    }
    .step3 {
        padding: 120px 0;
    }
    .step3 p {
        font-size: 13px;
    }
    .step3 .step3_img {
        width: 90px;
    }
    .step3 .step3_1 {
        width: 152px;
        top: 0;
        left: 102px;
    }
    .step3 .step3_2 {
        width: 116px;
        top: 124px;
        right: -12px;
    }
    .step3 .step3_3 {
        width: 152px;
        bottom: 0;
        right: 102px;
    }
    .step3 .step3_4 {
        width: 116px;
        bottom: 124px;
        left: -12px;
    }
    .step1::after {
        bottom: -60px;
    }
    .step2::after {
        bottom: -30px;
    }
    .example {
        padding: 114px 0;
    }
    .example p {
        font-size: 16px;
    }
    .example .example1 {
        width: 160px;
        top: 0;
        left: 92px;
    }
    .example .example2 {
        width: 125px;
        top: 120px;
        right: -24px;
    }
    .example .example3 {
        width: 160px;
        bottom: 0;
        right: 92px;
    }
    .example .example4 {
        width: 126px;
        bottom: 121px;
        left: -24px;
    }
    .work {
        margin: 5em 0;
    }
    .work img {
        margin: 1em 0;
        width: 87px;
    }
    .content_work > p {
        margin: 3em 0;
    }
    .content_start {
        padding: 50px 100px;
        margin-bottom: 50px;
    }
    .iconStart {
        width: 100px;
    }
    .desc_imyme {
        padding: 35px 85px;
    }
    .desc_imyme h3 {
        font-size: 48px;
    }
    .desc_imyme dl {
        padding: 0 100px;
        margin: 2em 0;
    }
    .desc_imyme dl dt {
        font-size: 60px;
    }
    .desc_imyme dl dd span {
        font-size: 27px;
        line-height: 1.2;
    }
    .lets_start {
        margin: 2em 0 0;
    }
}
@media screen and (min-width: 960px) {
    .step {
        width: 480px;
        margin: 50px auto 90px;
    }
    .step3 {
        padding: 150px 0;
        margin: 50px auto 30px;
    }
    .step3 p {
        font-size: 16px;
    }
    .step3 .step3_img {
        width: 130px;
    }
    .step3 .step3_1 {
        width: 200px;
        top: 0;
        left: 176px;
    }
    .step3 .step3_2 {
        width: 160px;
        top: 160px;
        right: 10px;
    }
    .step3 .step3_3 {
        width: 200px;
        bottom: 0;
        right: 176px;
    }
    .step3 .step3_4 {
        width: 160px;
        bottom: 160px;
        left: 10px;
    }
    .step1::after {
        bottom: -60px;
    }
    .step2::after {
        bottom: -30px;
    }
    .example {
        padding: 156px 0;
        margin: -20px auto 30px;
    }
    .example p {
        font-size: 16px;
    }
    .example .example1 {
        width: 200px;
        top: 0;
        left: 164px;
    }
    .example .example2 {
        width: 153px;
        top: 152px;
        right: 22px;
    }
    .example .example3 {
        width: 200px;
        bottom: 0;
        right: 164px;
    }
    .example .example4 {
        width: 154px;
        bottom: 153px;
        left: 22px;
    }
}
</style>
