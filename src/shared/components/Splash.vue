<template>
    <transition name="fade-long" mode="in-out">
        <div
            v-if="application.promises.length > 0"
            class="bg-body animation--section animation--section__full"
        >
            <h1>{{ loadingText }}</h1>
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
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {ApplicationState} from '../store/modules/application/types'

@Component
export default class Splash extends Vue {
    public name: string = 'Splash'

    animationDuration: number = 1500
    loadingText: string = ''

    @State('application') application!: ApplicationState

    @Watch('$route')
    onRouteChange(to, from) {
        ;(from.name === 'survey' || from.name === 'surveySummary') &&
        to.name === 'results'
            ? (this.loadingText = 'MATCHING...')
            : (this.loadingText = '')
    }
}
</script>
