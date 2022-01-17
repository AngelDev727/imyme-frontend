<script>
import Slide1 from '@shared/components/Top/Carousel/Slide1'
import Slide2 from '@shared/components/Top/Carousel/Slide2'
import Slide3 from '@shared/components/Top/Carousel/Slide3'
import Slide4 from '@shared/components/Top/Carousel/Slide4'

export default {
    name: 'Start',

    components: {
        Slide1,
        Slide2,
        Slide3,
        Slide4,
    },

    data() {
        return {
            currentSlide: 3,
            maxSlides: 4,
            animationTime: 7000,
            interval: null,
        }
    },

    computed: {
        currentComponent() {
            return `slide${this.currentSlide}`
        },
    },


    mounted() {
        this.$nextTick(() => {
            this.interval = window.setInterval(() => {
                this.moveNextSlide()
            }, this.animationTime)
        })
    },

    methods: {
        moveNextSlide() {
            if (this.currentSlide < this.maxSlides) {
                this.currentSlide = this.currentSlide + 1
            } else {
                this.currentSlide = 1
            }
        },
        start() {
            window.clearInterval(this.interval)
            this.$router.push({name: 'home'})
        },
    },
}
</script>

<template>
    <div class="sticky-bg" @click="start">
        <transition name="slide-left" mode="out-in">
            <Component :is="currentComponent" />
        </transition>
    </div>
</template>
