<template>
    <div class="fixed-top-left-back">
        <router-link v-if="to" v-bind:to="{ name: `${to}`}">
            <img src="@signage/assets/images/button/back-button.png" width="320px">
        </router-link>
    </div>
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

  export default class BackButton extends Vue {}
</script>
