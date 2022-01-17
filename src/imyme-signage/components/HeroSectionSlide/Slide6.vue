<template>
    <div class="hero--img hero--img__6">
        <router-link :to="{name: 'about-essence'}" class="w-100 h-100vh hero--link"></router-link>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'

  @Component
  export default class Slide6 extends Vue {}
</script>
