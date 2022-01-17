<template>
    <div class="complete">
        <h2 class="text-lowercase">maintenance...</h2>
        <div class="icon-group icon-fit-container">
            <svg class="icon-stroke icon-stroke-thin">
                <use xlink:href="#icon-tablet-maintenance" />
            </svg>
            <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                style="position: absolute; overflow: hidden;"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                class="icon-stroke icon-stroke-thin move-line"
            >
                <g>
                    <path
                        :d="
                            `M 11.2 20 q 2.5 ${-waveHeight} 5.1 0 q 2.5 ${waveHeight} 4.5 0`
                        "
                    />
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
import {setTimeout} from 'timers'
export default {
    name: 'Maintenance',

    data() {
        return {
            waveHeight: 50,
            time: 0,
        }
    },

    mounted() {
        setInterval(this.waveLine, 10)
    },

    methods: {
        redirect() {
            this.$router.push({name: 'start'})
        },
        clearData() {
            sessionStorage.clear()
            localStorage.clear()
            this.$store.dispatch('resetState')
        },
        waveLine() {
            this.waveHeight = Math.sin(this.time)
            this.time += 0.01
        },
    },
}
</script>

<style scoped>
.move-line {
    animation: spin 1000s linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

@keyframes spin {
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-40%);
    }
}
</style>
