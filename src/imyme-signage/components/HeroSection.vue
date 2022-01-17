<template>
    <div class="m-0 home-hero-section pl-2">
        <div id="hero" class="hero">
            <transition name="slide-left" mode="out-in">
                <Component :is="currentComponent" />
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component({
    components: {
        Slide1: () => import('@signage/components/HeroSectionSlide/Slide1.vue'),
        Slide2: () => import('@signage/components/HeroSectionSlide/Slide2.vue'),
        Slide3: () => import('@signage/components/HeroSectionSlide/Slide3.vue'),
        Slide4: () => import('@signage/components/HeroSectionSlide/Slide4.vue'),
        Slide5: () => import('@signage/components/HeroSectionSlide/Slide5.vue'),
        Slide6: () => import('@signage/components/HeroSectionSlide/Slide6.vue'),
    },
  })

  export default class HeroSection extends Vue {
    currentSlide: number = 1;
    maxSlides: number = 6;
    animationTime: number = 9000;
    animationEvent: number | null = null;

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

    moveNextSlide() {
      if (this.currentSlide < this.maxSlides) {
        this.currentSlide = this.currentSlide + 1
      } else {
        this.currentSlide = 1
      }
    }
  }
</script>
