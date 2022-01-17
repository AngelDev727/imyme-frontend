<template>
    <router-link v-if="to" v-bind:to="{ name: `${to}`}" class="next-button2">
        <div class="pb-5 collapse-icon arrow-r ">
            <div class="bar" />
            <div class="bar" />
        </div>
    </router-link>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component ({
    props: {
      to: {
        type: String,
        required: true,
      },
    },
  })

  export default class NextButton extends Vue {}
</script>
