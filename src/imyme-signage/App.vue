<template>
    <div id="app">
        <Icons />
        <div class="fixed-top-right-matching">
                <img @click="showFlowModal" src="@signage/assets/images/button/flow-button.png" width="320px">
        </div>
        <div
            v-if="String($route.name).indexOf('about') === -1"
            class="mt-0 fixed-top-right-about"
        >
            <router-link :to="{name: 'about'}">
                <img src="@signage/assets/images/button/about-button.png" width="320px">
            </router-link>
        </div>
        <transition>
            <router-view />
        </transition>
        <FlowModal />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Icons from '@shared/components/Icons.vue'
import FlowModal from '@signage/components/FlowModal.vue'

@Component({
    components: {
        Icons,
        FlowModal,
    },
    methods: {
        showFlowModal() {
            this.$store.state.products.flow = true
        },
    },
})
export default class App extends Vue {}
</script>
