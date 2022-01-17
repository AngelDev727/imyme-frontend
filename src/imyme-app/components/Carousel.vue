<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Slide1 from '@shared/components/Top/Carousel/Slide6.vue'
import Slide2 from '@shared/components/Top/Carousel/Slide7.vue'
import Slide3 from '@shared/components/Top/Carousel/Slide8.vue'
import Slide4 from '@shared/components/Top/Carousel/Slide9.vue'

@Component({
    components: {
        Slide1,
        Slide2,
        Slide3,
        Slide4,
    },
})
export default class Carousel extends Vue {
    public name: string = 'Carousel'

    currentSlide: number = 1
    maxSlides: number = 3
    animationTime: number = 6000
    animationEvent: number | null = null

    get currentComponent(): string {
        return `slide${this.currentSlide}`
    }

    mounted() {
        this.$nextTick(() => {
            this.animationEvent = window.setInterval(() => {
                this.moveNextSlide()
            }, this.animationTime)
        })
    }

    beforeDestroy() {
        if (this.animationEvent) clearInterval(this.animationEvent)
    }

    moveNextSlide() {
        if (this.currentSlide < this.maxSlides) {
            this.currentSlide = this.currentSlide + 1
        } else {
            this.currentSlide = 1
        }
    }
}
</script>

<template>
    <div>
        <div class="carousel">
            <transition name="fade-in" mode="out-in">
                <Component :is="currentComponent" />
            </transition>
        </div>
        <div class="indicator-control">
            <div
                v-for="slide in maxSlides"
                :key="`indicator-${slide}`"
                :class="['indicator', {active: slide === currentSlide}]"
                @click="currentSlide = slide"
            />
        </div>
    </div>
</template>

<style scoped>
.carousel {
    height: 40.17vw;
    max-height: 683px;
    width: 100vw;
}

@media screen and (max-width: 768px) {
    .carousel {
        height: 100vw;
        width: 100vw;
    }
}
</style>
