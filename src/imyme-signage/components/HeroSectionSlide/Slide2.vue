<template>
    <div class="hero--img hero--img__2">
        <router-link :to="{name: 'about-recipe'}" class="w-100 h-100vh hero--link"></router-link>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component
  export default class Slide2 extends Vue {}
</script>
