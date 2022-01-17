<script lang="ts">
import {Vue, Component, Ref} from 'vue-property-decorator'
import Footer from '@shared/components/Top/Footer.vue'

@Component({
    components: {
        Footer,
    },
})
export default class Brand extends Vue {
    public name: string = 'Brand'

    @Ref('activeWrap1') readonly wrap1!: HTMLElement
    @Ref('activeWrap2') readonly wrap2!: HTMLElement
    @Ref('activeWrap3') readonly wrap3!: HTMLElement
    @Ref('activeTxtBox1') readonly txtBox1!: HTMLElement
    @Ref('activeTxtBox2') readonly txtBox2!: HTMLElement
    @Ref('activeTxtBox3') readonly txtBox3!: HTMLElement

    innerHeight: number = 0
    wrap1Top: number = 0
    wrap2Top: number = 0
    wrap3Top: number = 0
    wrap1Height: string = ''
    wrap2Height: string = ''
    wrap3Height: string = ''
    isShowImg1: boolean = false
    isShowImg2: boolean = false
    isShowImg3: boolean = false

    mounted() {
        this.innerHeight = window.innerHeight / 2
        this.onResize()
        window.addEventListener('resize', this.onResize)
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    }

    onScroll(event) {
        const {scrollTop} = event.target.scrollingElement
        if (!this.wrap1Top) {
            this.wrap1Top = this.wrap1.offsetTop - this.innerHeight
            if (this.wrap1Top < 0) {
                this.wrap1Top = 0
            }
        }
        this.isShowImg1 = scrollTop > this.wrap1Top

        if (!this.wrap2Top) {
            this.wrap2Top = this.wrap2.offsetTop - this.innerHeight
        }
        this.isShowImg2 = scrollTop > this.wrap2Top

        if (!this.wrap3Top) {
            this.wrap3Top = this.wrap3.offsetTop - this.innerHeight
        }
        this.isShowImg3 = scrollTop > this.wrap3Top
    }

    onResize() {
        if (window.innerWidth > 599) {
            this.wrap1Height = this.txtBox1.clientHeight + 'px'
            this.wrap2Height = this.txtBox2.clientHeight + 'px'
            this.wrap3Height = this.txtBox3.clientHeight + 'px'
        } else {
            this.wrap1Height = 'auto'
            this.wrap2Height = 'auto'
            this.wrap3Height = 'auto'
        }
    }
}
</script>
<template>
    <div v-scroll="onScroll" class="brand">
        <section id="brand-page">
            <div class="brand-page-title">
                <div class="message-container">
                    <div class="txt-box">
                        <img
                            src="@app/assets/images/brand/brandMessageTxt.png"
                        />
                        <h1>
                            植物＆サイエンスで肌トラブルのない素肌へ導く<br />ウォーターレス・スキンケア
                        </h1>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="brand-container">
                <div
                    ref="activeWrap1"
                    class="brand-wrap"
                    :style="{height: wrap1Height}"
                >
                    <div ref="activeTxtBox1" class="brand-wrap-02-txt">
                        <h3>ウォーターレス・ビューティへの取り組み</h3>
                        <h2>植物生体水＋植物オイル</h2>
                        <h4>For Waterless beauty</h4>
                        <p>
                            imymeのセラムの主原材料は、植物生体水と植物オイル。<br />
                            <span class="annotationcolor">水をほとんど使用せず</span>
                            <span class="annotationmark">※1</span>
                            、ひとりひとりの肌悩みや食生活、生活習慣に合わせてお作りします。<br />
                            製造過程で植物抽出目的以外に、原材料として水を使用しないため、雑菌繁殖抑制に使用する
                            <span class="annotationcolor">防腐剤や保存料を加える必要がありません。</span><br />
                            これにより、
                            <span class="annotationcolor">皮膚常在菌を守り</span>
                            つつ、植物本来のちからを、肌に摂り入れる
                            <span class="annotationmark">※2</span>
                            ことができるのです。<br />
                            また、
                            <span class="annotationcolor">地球の限りある水資源の保護</span>
                            にもつながっています。<br /><br />

                            地球環境を守り、健やかな肌を育てることは、<br />
                            私たちの約束です。
                        </p>
                        <div class="annotation">
                            ※1 水は植物抽出のために使われているものです。<br />
                            ※2 角質層まで
                        </div>
                        <div class="lnk">
                            <router-link to="/ingredient#essence">
                                imymeの植物成分
                            </router-link>
                        </div>
                    </div>
                    <transition name="fade">
                        <div v-show="isShowImg1" class="brand-wrap-02-img">
                            <img
                                src="@app/assets/images/brand/brandMessageImg01.jpg"
                                class="fadein"
                            />
                        </div>
                    </transition>
                </div>

                <div
                    ref="activeWrap2"
                    class="brand-wrap"
                    :style="{height: wrap2Height}"
                >
                    <div ref="activeTxtBox2" class="brand-wrap-txt">
                        <h2>
                            生産者とのパートナーシップ<br />と化粧品の新しい未来
                        </h2>
                        <h4>For Partners & a new future for cosmetics</h4>
                        <p>
                            主原材料である植物は、化学肥料を使わず、有機栽培で育まれた新鮮で健康な植物。農家とのパートナーシップにより、ひとつひとつ大切に育てられています。<br />
                            収穫された植物は、低温真空抽出法
                            <span class="annotationmark">※3</span>
                            によって抽出し、あますところなく活用します。<br /><br />

                            低温真空抽出法によって植物の栄養が保たれ、植物本来のエネルギーがそのまま凝縮された成分として肌に届きます。<br /><br />

                            農業と化粧品が共存し、健全な製品を作り出す、化粧品の新しい未来を約束します。
                        </p>
                        <div class="annotation">
                            ※3
                            植物資源を低温（35℃～40℃）で液体と個体に分離させる方法。植物の細胞を壊さず、有効成分を抽出する効率の高い抽出法です。
                        </div>
                    </div>
                    <transition name="fade">
                        <div v-show="isShowImg2" class="brand-wrap-img">
                            <img
                                src="@app/assets/images/brand/brandMessageImg02.jpg"
                                class="fadein"
                            />
                        </div>
                    </transition>
                </div>

                <div
                    ref="activeWrap3"
                    class="brand-wrap"
                    :style="{height: wrap3Height}"
                >
                    <div ref="activeTxtBox3" class="brand-wrap-02-txt">
                        <h2>肌悩みに寄り添う、<br />ひとりひとりのスキンケア</h2>
                        <h4>For Customers</h4>
                        <p>
                            「いま使ってるスキンケア、ほんとうに肌に合ってる？」<br />
                            多くの女性のその悩みにこたえるために、imymeは独自のオンラインカウンセリングであなたの肌を分析します。<br /><br />

                            良質な植物の持つビタミン、ミネラル、酵素などのちからと、スキンケアサイエンスの融合が引き出す、肌本来の機能が目覚める処方設計。<br />
                            100
                            種類のセラムレシピから、カウンセリング結果の肌状態に合わせてカスタマイズ
                            <span class="annotationmark">※4</span>
                            した、あなただけのスキンケアセラムをつくります。注文後に製造する
                            <span class="annotationmark">※5</span>
                            ため、つくりたての新鮮な状態でお届けします。<br /><br />

                            お客様の肌が、みずみずしく満たされ、いつも清浄に輝く整ったキメを作ることを約束します。<br />
                        </p>
                        <div class="annotation">
                            ※4
                            10万人の肌データから導きだした分析結果を基に、最適なレシピを処方<br />
                            ※5
                            防腐剤を使用していないため、使用期限以内に使い切ってください。
                        </div>
                        <div class="lnk">
                            <router-link to="/ingredient#product">
                                imymeのアイテム紹介
                            </router-link>
                        </div>
                    </div>
                    <transition name="fade">
                        <div v-show="isShowImg3" class="brand-wrap-02-img">
                            <img
                                src="@app/assets/images/brand/brandMessageImg03.jpg"
                                class="fadein"
                            />
                        </div>
                    </transition>
                </div>
            </div>
        </section>
        <Footer />
    </div>
</template>

<style scoped>
.brand {
    color: #111;
    font-family: '游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', 'メイリオ',
        sans-serif;
    margin: 0;
}
h1,
h2 {
    font-weight: 700;
    margin: 0.83em 0;
}
h1 {
    color: #222;
    font-size: 2.56rem;
    letter-spacing: normal;
    text-align: right;
}
h2 {
    font-size: 2.88rem;
    line-height: 4.16rem;
    text-align: left;
}
h3 {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.6rem;
    margin: 1em 0;
    text-align: left;
}
h4 {
    color: #444;
    font-size: 1.536rem;
    font-weight: 700;
    line-height: 3.2rem;
    margin: 1.33em 0;
    text-align: left;
    text-transform: none;
}
p {
    font-size: 1.536rem;
    line-height: 2.56rem;
    margin: 1em 0;
}
section:not(:last-child) {
    background: #fff;
    margin: 0 auto;
    width: 100%;
}
.annotation {
    color: #444;
    font-size: 1.28rem;
    line-height: 2.08rem;
    margin-bottom: 1.6rem;
}
.annotationcolor {
    color: #b38512;
    font-weight: 700;
}
.annotationmark {
    font-size: 0.8rem;
}
.message-container {
    margin: 0 auto;
    overflow: hidden;
    padding: 150px 0 40px;
}
.txt-box {
    box-sizing: initial;
    float: right;
    padding-right: 200px;
    text-align: right;
    width: 50%;
}
.txt-box img {
    width: 70%;
}
.lnk {
    background: rgba(179, 133, 18, 0.6);
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    margin-top: 1.6rem;
    padding: 1.92rem;
    width: fit-content;
}
.lnk a:link,
a:visited,
a:hover,
a:active {
    color: #fff;
    text-decoration: none;
}
#brand-page {
    margin: 0 auto;
}
.brand-page-title {
    background: url(../assets/images/brand/main_brandstoryBG.jpg) no-repeat
        center;
    background-size: cover;
    padding: 100px 20px 110px;
}
.brand-container {
    margin: 0 auto;
    max-width: 1024px;
    width: 100%;
}
.brand-wrap {
    box-sizing: initial;
    height: auto;
    margin: 0 auto;
    padding: 0 0 4.8rem;
    position: relative;
    width: 95%;
}
.brand-wrap-img,
.brand-wrap-02-img {
    height: auto;
    left: 0;
    position: absolute;
    top: 100px;
    width: 50%;
}
.brand-wrap-02-img {
    left: 50%;
}
.brand-wrap-img img,
.brand-wrap-02-img img {
    width: 100%;
}
.brand-wrap-txt,
.brand-wrap-02-txt {
    background: rgba(255, 255, 255, 0.6);
    left: 45%;
    padding: 2%;
    position: absolute;
    width: 55%;
    z-index: 1;
}
.brand-wrap-02-txt {
    left: 0;
}
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 500ms;
}
.fade-enter,
.fade-leave {
    opacity: 0;
    transform: translate(0, 50px);
}
@media screen and (max-width: 599px) {
    h1 {
        color: #222;
        font-family: 'Yu Gothic', '游ゴシック', YuGothic, '游ゴシック体';
        font-size: 1.92rem;
        text-align: left;
    }
    h2 {
        font-size: 3.04rem;
        line-height: 4.64rem;
    }
    h3 {
        font-size: 2.4rem;
        line-height: 3.2rem;
    }
    h4 {
        color: #888;
        font-size: 1.92rem;
        line-height: 3.2rem;
    }
    p {
        font-size: 1.6rem;
        line-height: 3.2rem;
    }
    .message-container {
        padding-left: 200px;
    }
    .txt-box {
        padding-right: 40px;
        width: 80%;
    }
    .txt-box img {
        width: 80%;
    }
    .brand-page-title {
        margin: 0;
        padding: 0;
    }
    .brand-wrap {
        position: static;
    }
    .brand-wrap-txt {
        background: none;
        margin: 0 auto;
        position: static;
        width: 95%;
    }
    .brand-wrap-img {
        position: static;
        width: 100%;
    }
    .brand-wrap-02-txt {
        background: none;
        margin: 0 auto;
        position: static;
        width: 95%;
    }
    .brand-wrap-02-img {
        height: auto;
        padding-top: 3.2rem;
        position: static;
        width: 100%;
    }
}
@media only screen and (max-width: 479px) {
    .message-container {
        margin: 0 auto;
        max-width: 80%;
        padding: 150px 0 40px 50px;
    }
    .txt-box {
        background: rgba(255, 255, 255, 0.3);
        padding: 2%;
        width: 100%;
    }
    .txt-box img {
        width: 100%;
    }
    h1 {
        font-size: 2.4rem;
        line-height: initial;
    }
    h2 {
        font-size: 3rem;
        line-height: 5.2rem;
    }
    h3 {
        font-size: 3rem;
        line-height: 4rem;
    }
    h4 {
        font-size: 2.4rem;
        line-height: 4rem;
    }
    p {
        font-size: 2rem;
        line-height: 4rem;
    }
    .annotation {
        font-size: 1.6rem;
        line-height: 2.6rem;
    }
    .brand-page-title {
        background-size: auto 500px;
    }
    .brand-wrap {
        padding: 4rem 0;
    }
    .brand-wrap-02-img {
        padding-top: 3rem;
    }
}
</style>
