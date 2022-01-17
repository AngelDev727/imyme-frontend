<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Campain extends Vue {
    public name: string = 'Canpain'

    campainInfo: any = []
    currentCampain: number = 1
    maxCampain: number = 4
    animationTime: number = 6000
    animationEvent: number | null = null

    get currentComponent(): string {
        return `slide${this.currentCampain}`
    }

    mounted() {
        this.getNews()
        this.$nextTick(() => {
            this.animationEvent = window.setInterval(() => {
                this.moveNextCampain()
            }, this.animationTime)
        })
    }

    beforeDestroy() {
        if (this.animationEvent) clearInterval(this.animationEvent)
    }

    getNews() {
        // acmpain情報の取得・生成処理実装予定
    }

    moveNextCampain() {
        if (this.currentCampain < this.maxCampain) {
            this.currentCampain = this.currentCampain + 1
        } else {
            this.currentCampain = 1
        }
    }

    findNextCampain() {
        if (this.currentCampain < this.maxCampain) {
            return this.currentCampain
        } else {
            return 0
        }
    }
}
</script>

<template>
    <section class="text-center m-0">
        <h2 id="campaoin" class="text-uppercase">
            campain
            <p class="sub-title">キャンペーン情報</p>
        </h2>
        <div class="carousel">
            <transition name="slide-left" mode="out-in">
                <div>
                    <!-- Campain情報の表示 news[currentCampain - 1] -->
                </div>
                <div>
                    <!-- Campain情報の表示 news[findNextCampain()]-->
                </div>
            </transition>
        </div>
        <div class="indicator-control">
            <div
                v-for="slide in maxCampain"
                :key="`indicator-${slide}`"
                :class="['indicator', {active: slide === currentCampain}]"
                @click="currentCampain = slide"
            />
        </div>
    </section>
</template>
