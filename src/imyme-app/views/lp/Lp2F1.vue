<script lang="ts">
import {Vue, Component, Ref} from 'vue-property-decorator'

@Component
export default class Lp2F1 extends Vue {
    public name: string = 'Lp2F1'

    @Ref('active') readonly activeDiv!: HTMLElement

    isShowQ1: boolean = true
    isShowQ2: boolean = true
    isShowQ3: boolean = true
    isShowQ4: boolean = true
    isShowQ5: boolean = true
    isShowQ6: boolean = true
    activeTop: number = 0
    isShowBtn: boolean = false

    mounted() {
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
        <div class="fv cv view_area_1">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/fv.jpg"
                    width="750"
                    height="1309"
                />
            </picture>
            <div class="cv_1">
                <a href="/survey/1" class="btn cv_area_1">
                    <img
                        alt=""
                        src="@app/assets/images/lp2_cp/f1/btn_1.png"
                        width="621"
                        height="158"
                    />
                </a>
            </div>
        </div>
        <div ref="active" class="sec01 view_area_2">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec01.jpg"
                    width="750"
                    height="1620"
                />
            </picture>
        </div>
        <div class="sec02 view_area_3">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec02.jpg"
                    width="750"
                    height="2132"
                />
            </picture>
        </div>
        <div class="cv view_area_4">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/f1/cv_2.jpg"
                width="750"
                height="417"
            />
            <div class="cv_2">
                <a href="/survey/1" class="btn cv_area_2">
                    <img
                        alt=""
                        src="@app/assets/images/lp2_cp/f1/btn_1.png"
                        width="621"
                        height="158"
                    />
                </a>
            </div>
        </div>
        <div class="sec03 view_area_5">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec03.jpg"
                    width="750"
                    height="2373"
                />
            </picture>
        </div>
        <div class="sec04 view_area_6">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec04.jpg"
                    width="750"
                    height="1662"
                />
            </picture>
        </div>
        <div class="cv view_area_7">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/f1/cv_3.jpg"
                width="750"
                height="395"
            />
            <div class="cv_3">
                <a href="/survey/1" class="btn cv_area_3">
                    <img
                        alt=""
                        src="@app/assets/images/lp2_cp/f1/btn_1.png"
                        width="621"
                        height="158"
                    />
                </a>
            </div>
        </div>
        <div class="sec05 view_area_8">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec05.jpg"
                    width="750"
                    height="3520"
                />
            </picture>
        </div>
        <div class="sec06 cv view_area_9">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec06.jpg"
                    width="750"
                    height="1593"
                />
            </picture>
            <div class="anime">
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/anime.gif"
                    width="495"
                    height="572"
                />
            </div>
        </div>
        <div class="cv view_area_10">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/f1/cv_4.jpg"
                width="750"
                height="915"
            />
            <div class="cv_4">
                <a href="/survey/1" class="btn cv_area_4">
                    <img
                        alt=""
                        src="@app/assets/images/lp2_cp/f1/btn_1.png"
                        width="621"
                        height="158"
                    />
                </a>
            </div>
        </div>
        <div class="sec07 view_area_11">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec07.jpg"
                    width="750"
                    height="1449"
                />
            </picture>
        </div>
        <div class="sec08 view_area_12">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec08.jpg"
                    width="750"
                    height="1177"
                />
            </picture>
        </div>
        <div class="sec09 view_area_13">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec09.jpg"
                    width="750"
                    height="1244"
                />
            </picture>
        </div>
        <div class="sec10 view_area_14">
            <div class="video1">
                <video
                    class="video"
                    controls="controls"
                    playsinline
                    loop
                    autoplay
                    muted
                >
                    <source src="@app/assets/images/lp2_cp/f1/video.mp4" />
                </video>
            </div>
        </div>
        <div class="sec11 view_area_15">
            <picture>
                <img
                    alt=""
                    src="@app/assets/images/lp2_cp/f1/sec11.jpg"
                    width="750"
                    height="299"
                />
            </picture>
            <div class="qanda">
                <dl class="toggle" @click="isShowQ1 = !isShowQ1">
                    <div v-show="isShowQ1">
                        <img
                            alt=""
                            src="@app/assets/images/lp2_cp/f1/q01.jpg"
                            width="628"
                            height="144"
                        />
                    </div>
                    <div v-show="!isShowQ1">
                        <dt>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/q01_1.jpg"
                                width="628"
                                height="144"
                            />
                        </dt>
                        <dd>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/a01.jpg"
                                width="628"
                                height="231"
                            />
                        </dd>
                    </div>
                </dl>
                <dl class="toggle" @click="isShowQ2 = !isShowQ2">
                    <div v-show="isShowQ2">
                        <img
                            alt=""
                            src="@app/assets/images/lp2_cp/f1/q02.jpg"
                            width="628"
                            height="144"
                        />
                    </div>
                    <div v-show="!isShowQ2">
                        <dt>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/q02_1.jpg"
                                width="628"
                                height="144"
                            />
                        </dt>
                        <dd>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/a02.jpg"
                                width="628"
                                height="231"
                            />
                        </dd>
                    </div>
                </dl>
                <dl class="toggle" @click="isShowQ3 = !isShowQ3">
                    <div v-show="isShowQ3">
                        <img
                            alt=""
                            src="@app/assets/images/lp2_cp/f1/q03.jpg"
                            width="628"
                            height="144"
                        />
                    </div>
                    <div v-show="!isShowQ3">
                        <dt>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/q03_1.jpg"
                                width="628"
                                height="144"
                            />
                        </dt>
                        <dd>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/a03.jpg"
                                width="628"
                                height="231"
                            />
                        </dd>
                    </div>
                </dl>
                <dl class="toggle" @click="isShowQ4 = !isShowQ4">
                    <div v-show="isShowQ4">
                        <img
                            alt=""
                            src="@app/assets/images/lp2_cp/f1/q04.jpg"
                            width="628"
                            height="144"
                        />
                    </div>
                    <div v-show="!isShowQ4">
                        <dt>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/q04_1.jpg"
                                width="628"
                                height="144"
                            />
                        </dt>
                        <dd>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/a04.jpg"
                                width="628"
                                height="231"
                            />
                        </dd>
                    </div>
                </dl>
                <dl class="toggle" @click="isShowQ5 = !isShowQ5">
                    <div v-show="isShowQ5">
                        <img
                            alt=""
                            src="@app/assets/images/lp2_cp/f1/q05.jpg"
                            width="628"
                            height="144"
                        />
                    </div>
                    <div v-show="!isShowQ5">
                        <dt>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/q05_1.jpg"
                                width="628"
                                height="144"
                            />
                        </dt>
                        <dd>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/a05.jpg"
                                width="628"
                                height="231"
                            />
                        </dd>
                    </div>
                </dl>
                <dl class="toggle" @click="isShowQ6 = !isShowQ6">
                    <div v-show="isShowQ6">
                        <img
                            alt=""
                            src="@app/assets/images/lp2_cp/f1/q06.jpg"
                            width="628"
                            height="144"
                        />
                    </div>
                    <div v-show="!isShowQ6">
                        <dt>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/q06_1.jpg"
                                width="628"
                                height="144"
                            />
                        </dt>
                        <dd>
                            <img
                                alt=""
                                src="@app/assets/images/lp2_cp/f1/a06.jpg"
                                width="628"
                                height="231"
                            />
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <div class="sec12 view_area_16">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/f1/sec12.jpg"
                width="750"
                height="1380"
            />
        </div>
        <div class="cv view_area_17">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/f1/cv_5.jpg"
                width="750"
                height="1803"
            />
            <div class="cv_5">
                <a href="/survey/1" class="btn cv_area_5">
                    <img
                        alt=""
                        src="@app/assets/images/lp2_cp/f1/btn_1.png"
                        width="621"
                        height="158"
                    />
                </a>
            </div>
        </div>
        <div class="sec13 view_area_18">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/f1/sec13.jpg"
                width="750"
                height="1919"
            />
        </div>
        <div class="sec14 cv">
            <img
                alt=""
                src="@app/assets/images/lp2_cp/f1/sec14.jpg"
                class="footer-img"
                width="750"
                height="359"
            />
            <div class="cv_6">
                <a href="/company">
                    <img
                        src="@app/assets/images/lp2_cp/btn_4.png"
                        width="460"
                        height="67"
                    />
                </a>
                <a href="/privacy">
                    <img
                        src="@app/assets/images/lp2_cp/btn_5.png"
                        width="460"
                        height="67"
                    />
                </a>
                <a href="/terms">
                    <img
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
                    <a href="/survey/1" class="btn cv_area_6">
                        <img
                            alt=""
                            src="@app/assets/images/lp2_cp/f1/btn_2.png"
                            width="691"
                            height="150"
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
.btn {
    display: inline;
    padding: 0;
    background-color: unset;
}
.cv {
    position: relative;
}
.wrapper {
    max-width: 750px;
    margin: 0 auto;
}
.cv_1 {
    position: absolute;
    width: 82.8%;
    top: 83%;
    left: 9%;
}
.cv_2 {
    position: absolute;
    width: 82.8%;
    top: 40%;
    left: 9%;
}
.cv_3 {
    position: absolute;
    width: 82.8%;
    top: 42%;
    left: 9%;
}
.cv_4 {
    position: absolute;
    width: 82.8%;
    top: 72%;
    left: 9%;
}
.cv_5 {
    position: absolute;
    width: 82.8%;
    top: 87.5%;
    left: 9%;
}
.cv_6 {
    position: absolute;
    top: 10.07647727272727%;
    left: 19.333333333333332%;
    width: 61.33333333333333%;
}
.anime {
    position: absolute;
    width: 66%;
    top: 27%;
    left: 17%;
}
.sec10 {
    background: #f4f5fa;
    padding: 15% 0 15%;
}
.video1 {
    width: 89%;
    margin: 0 auto;
}
.video {
    width: 100%;
}
.sec11 {
    background: #fffdd7;
    padding-bottom: 10%;
}
.btn:hover {
    filter: brightness(130%);
}
.btn {
    transition: filter 0.3s;
}
.qanda {
    width: 83.7%;
    margin: 0 auto;
}
.toggle {
    margin-bottom: 4%;
    cursor: pointer;
}
.inner > span:last-of-type,
.inner.active > span:first-of-type {
    display: none;
}
.inner.active > span:last-of-type {
    display: inline;
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
    width: 92%;
    margin: 0 auto 2%;
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
.sec14 {
    margin-bottom: 24%;
}
</style>
