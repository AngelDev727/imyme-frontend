<template>
    <transition name="fade" mode="in-out">
        <div class="bg-body animation--section animation--section__full">
            <svg
                class="icon-stroke animation animation--splash"
                :style="'animation-duration:' + animationDuration + 'ms'"
            >
                <use xlink:href="#icon-logo" />
            </svg>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Splash extends Vue {
    animationDuration: number = 1500
}
</script>
