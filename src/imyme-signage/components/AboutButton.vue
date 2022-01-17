<template>
    <router-link :to="{ name: `${to}`}" :class="`${to}-button`" class="about-button-frame">
        <div class="about-button-content" v-on:click='isActive=!isActive' v-bind:class="{'active-button':isActive}"></div>
    </router-link>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    data(){
      return {
        isActive: false
      }
    },
    props: {
      to: {
        type: String,
        required: true,
      },
    },
  })

  export default class AboutButton extends Vue {}
</script>
