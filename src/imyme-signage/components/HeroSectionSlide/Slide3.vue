<template>
    <div class="hero--img hero--img__3">
        <router-link :to="{name: 'about-clean'}" class="w-100 h-100vh hero--link"></router-link>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component
  export default class Slide3 extends Vue {}
</script>
