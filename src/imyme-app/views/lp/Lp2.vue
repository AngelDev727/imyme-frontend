<script lang="ts">
import {Vue, Component, Prop, Ref} from 'vue-property-decorator'

@Component
export default class Lp2 extends Vue {
    public name: string = 'Lp2'

    @Prop({type: String, required: false, default: null}) cpId: any
    @Ref('active') readonly activeDiv!: HTMLElement

    isShowQ1: boolean = true
    isShowQ2: boolean = true
    isShowQ3: boolean = true
    isShowQ4: boolean = true
    isShowQ5: boolean = true
    isShowQ6: boolean = true
    image: string = ''
    activeTop: number = 0
    isShowBtn: boolean = false

    async created() {
        if (this.cpId) {
            this.image = require(`@app/assets/images/lp2_cp/section1315_3198_${
                this.cpId
            }.jpg`)
        } else {
            this.image = require('@app/assets/images/lp2_cp/section1315_3198.jpg')
        }
    }

    async mounted() {
        this.activeTop = this.activeDiv.offsetTop
    }

    onScroll(event) {
        const {scrollTop} = event.target.scrollingElement
        this.isShowBtn = scrollTop > this.activeTop
    }
}
</script>
<template>
    <div v-scroll="onScroll" class="wrapper">
        <div class="section1315_3198 view_area_1">
            <picture>
                <img alt="" :src="image" width="750" height="1183" />
            </picture>
        </div>
        <div ref="active" class="cv view_area_2">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/cv1315_3202.jpg"
                width="750"
                height="782"
            />
            <div class="cv_inner_cv1315_3202">
                <a href="/survey/1" class="cv_area_1">
                    <img
                        alt=""
                        class="btn_1"
                        src="@app/assets/images/lp2_cp/btn_1.png"
                        width="644"
                        height="190"
                    />
                </a>
            </div>
        </div>
        <div class="section1315_3205 view_area_3">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3205.jpg"
                    width="750"
                    height="2140"
                />
            </picture>
        </div>
        <div class="section1315_3206 view_area_4">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3206.jpg"
                    width="750"
                    height="3543"
                />
            </picture>
        </div>
        <div class="section1315_3208 view_area_5">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3208.jpg"
                    width="750"
                    height="2560"
                />
            </picture>
        </div>
        <div class="section1315_3210 view_area_6">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3210.jpg"
                    width="750"
                    height="1824"
                />
            </picture>
        </div>
        <div class="cv view_area_7">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/cv1315_3266.jpg"
                width="750"
                height="1618"
            />
            <div class="cv_inner_cv1315_3266">
                <img
                    alt=""
                    class="gif"
                    src="@app/assets/images/lp2_cp/imyme_問診.gif"
                    width="960"
                    height="679"
                />
            </div>
        </div>
        <div class="cv view_area_8">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/cv2.jpg"
                width="750"
                height="1044"
            />
            <div class="cv_inner_cv2">
                <a href="/survey/1" class="cv_area_2">
                    <img
                        alt=""
                        class="btn_2"
                        src="@app/assets/images/lp2_cp/btn_2.png"
                        width="644"
                        height="190"
                    />
                </a>
            </div>
        </div>
        <div class="section1315_3215 view_area_9">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3215.jpg"
                    width="750"
                    height="1789"
                />
            </picture>
        </div>
        <div class="section1315_3217 view_area_10">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3217.jpg"
                    width="750"
                    height="1323"
                />
            </picture>
        </div>
        <div class="section1315_3218 view_area_11">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3218.jpg"
                    width="750"
                    height="1244"
                />
            </picture>
        </div>
        <div class="cv view_area_12">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/cv1315_3224.jpg"
                width="750"
                height="570"
            />
            <video
                class="video"
                src="@app/assets/images/lp2_cp/imyme動画.mp4"
                loop
                autoplay
                muted
            ></video>
        </div>
        <div class="question view_area_13">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/cv1315_3233.jpg"
                    width="750"
                    height="284"
                />
            </picture>
            <div class="qanda">
                <div class="toggle">
                    <div @click="isShowQ1 = !isShowQ1">
                        <img
                            v-show="isShowQ1"
                            alt=""
                            src="@app/assets/images/lp2_cp/q1.png"
                            width="660"
                            height="184"
                        />
                        <img
                            v-show="!isShowQ1"
                            alt=""
                            src="@app/assets/images/lp2_cp/q1_1.png"
                            width="660"
                            height="378"
                        />
                    </div>
                </div>
                <div class="toggle">
                    <div @click="isShowQ2 = !isShowQ2">
                        <img
                            v-show="isShowQ2"
                            alt=""
                            src="@app/assets/images/lp2_cp/q2.png"
                            width="660"
                            height="184"
                        />
                        <img
                            v-show="!isShowQ2"
                            alt=""
                            src="@app/assets/images/lp2_cp/q2_1.png"
                            width="660"
                            height="505"
                        />
                    </div>
                </div>
                <div class="toggle">
                    <div @click="isShowQ3 = !isShowQ3">
                        <img
                            v-show="isShowQ3"
                            alt=""
                            src="@app/assets/images/lp2_cp/q3.png"
                            width="660"
                            height="179"
                        />
                        <img
                            v-show="!isShowQ3"
                            alt=""
                            src="@app/assets/images/lp2_cp/q3_1.png"
                            width="660"
                            height="608"
                        />
                    </div>
                </div>
                <div class="toggle">
                    <div @click="isShowQ4 = !isShowQ4">
                        <img
                            v-show="isShowQ4"
                            alt=""
                            src="@app/assets/images/lp2_cp/q4.png"
                            width="660"
                            height="180"
                        />
                        <img
                            v-show="!isShowQ4"
                            alt=""
                            src="@app/assets/images/lp2_cp/q4_1.png"
                            width="660"
                            height="608"
                        />
                    </div>
                </div>
                <div class="toggle">
                    <div @click="isShowQ5 = !isShowQ5">
                        <img
                            v-show="isShowQ5"
                            alt=""
                            src="@app/assets/images/lp2_cp/q5.png"
                            width="660"
                            height="180"
                        />
                        <img
                            v-show="!isShowQ5"
                            alt=""
                            src="@app/assets/images/lp2_cp/q5_1.png"
                            width="660"
                            height="783"
                        />
                    </div>
                </div>
                <div class="toggle">
                    <div @click="isShowQ6 = !isShowQ6">
                        <img
                            v-show="isShowQ6"
                            alt=""
                            src="@app/assets/images/lp2_cp/q6.png"
                            width="660"
                            height="180"
                        />
                        <img
                            v-show="!isShowQ6"
                            alt=""
                            src="@app/assets/images/lp2_cp/q6_1.png"
                            width="660"
                            height="570"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="section1315_3234 view_area_14">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3234.jpg"
                    width="750"
                    height="882"
                />
            </picture>
        </div>
        <div class="cv view_area_15">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/cv1315_3239.jpg"
                width="750"
                height="2419"
            />
            <div class="cv_inner_cv1315_3239">
                <a href="/survey/1" class="cv_area_3">
                    <img
                        alt=""
                        class="btn_3"
                        src="@app/assets/images/lp2_cp/btn_3.png"
                        width="644"
                        height="190"
                    />
                </a>
            </div>
        </div>
        <div class="section1315_3240 view_area_16">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/section1315_3240.jpg"
                    width="750"
                    height="1919"
                />
            </picture>
        </div>
        <div class="cv">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/cv1315_3262.jpg"
                class="footer-img"
                width="750"
                height="359"
            />
            <div class="cv_inner_cv1315_3262">
                <a href="/company">
                    <img
                        alt=""
                        class="btn_4"
                        src="@app/assets/images/lp2_cp/btn_4.png"
                        width="460"
                        height="67"
                    />
                </a>
                <a href="/privacy">
                    <img
                        alt=""
                        class="btn_5"
                        src="@app/assets/images/lp2_cp/btn_5.png"
                        width="460"
                        height="67"
                    />
                </a>
                <a href="/terms">
                    <img
                        alt=""
                        class="btn_6"
                        src="@app/assets/images/lp2_cp/btn_6.png"
                        width="460"
                        height="67"
                    />
                </a>
            </div>
        </div>
        <transition name="fade">
            <div v-if="isShowBtn" class="cta">
                <div class="cta_inner">
                    <a href="/survey/1" class="cv_area_4">
                        <img
                            alt=""
                            class="btn_6"
                            src="@app/assets/images/lp2_cp/btn_7.png"
                            width="628"
                            height="170"
                        />
                    </a>
                </div>
            </div>
        </transition>
    </div>
</template>

<style>
.navbar {
    display: none !important;
}
</style>
<style scoped>
* {
    margin: 0;
}
img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
}
.cv {
    position: relative;
}
.btn_5 {
    margin-top: 0%;
    /* （ ボタンの上下間の余白/cv_innerの横幅 ）*/
}
.btn_6 {
    margin-top: 0%;
    /* （ ボタンの上下間の余白/cv_innerの横幅 ）*/
}
.cv_inner_cv1315_3262 {
    position: absolute;
    top: 10.07647727272727%;
    left: 19.333333333333332%;
    width: 61.33333333333333%;
}
.cv_inner_cv1315_3239 {
    position: absolute;
    top: 89.78916907813147%;
    left: 7.066666666666667%;
    width: 85.86666666666667%;
}
.q2 {
    margin-top: 0%;
    /* （ ボタンの上下間の余白/cv_innerの横幅 ）*/
}
.q3 {
    margin-top: 0%;
    /* （ ボタンの上下間の余白/cv_innerの横幅 ）*/
}
.q4 {
    margin-top: 0%;
    /* （ ボタンの上下間の余白/cv_innerの横幅 ）*/
}
.q5 {
    margin-top: 0%;
    /* （ ボタンの上下間の余白/cv_innerの横幅 ）*/
}
.q6 {
    margin-top: 0%;
    /* （ ボタンの上下間の余白/cv_innerの横幅 ）*/
}
.video {
    position: absolute;
    top: 17.543859649122805%;
    left: 50%;
    transform: translateX(-50%);
    width: 88.8%;
}
.cv_inner_cv1315_3266 {
    position: absolute;
    top: 30.873918%;
    left: 9.6%;
    width: 80.80000000000001%;
}
.cv_inner_cv2 {
    position: absolute;
    top: 77.069054%;
    left: 7.066666666666667%;
    width: 85.86666666666667%;
}
.cv_inner_cv1315_3202 {
    position: absolute;
    top: 53.069053708439895%;
    left: 7.066666666666667%;
    width: 85.86666666666667%;
}
.wrapper {
    max-width: 750px;
    margin: 0 auto;
}
.qanda {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 15%;
}
.question {
    background: url(../../assets/images/lp2_cp/bg-color.jpg) no-repeat;
    background-size: cover;
    background-position: top center;
}
.footer-img {
    padding-bottom: 23.5%;
}
.cta {
    width: 750px;
    position: fixed;
    bottom: 0;
}
.cta_inner {
    width: 81%;
    margin: 0 auto;
}
@media all and (min-width: 0px) and (max-width: 749px) {
    .cta {
        width: 100%;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s;
}
.fade-enter,
.fade-leave {
    opacity: 0;
}
</style>
