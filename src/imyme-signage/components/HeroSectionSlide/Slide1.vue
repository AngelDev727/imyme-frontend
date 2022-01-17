<template>
    <div class="hero--img hero--img__1">
        <router-link :to="{name: 'about'}" class="w-100 h-100vh hero--link"></router-link>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class Slide1 extends Vue {}
</script>
