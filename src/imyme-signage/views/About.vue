<template>
    <section class="m-0 bg-body top-section-transitions-3">
        <div id="about" class="top">
            <BackButton :to="`home`" />
            <div class="sticky-bg top--concept pt-4">
                <span class="top--text top--padding">
                    <img src="@signage/assets/images/about/icon/about-icon.png">
                    <div class="flexbox flex-row mt-5">
                        <AboutButton v-for="aboutButton in aboutButtons" :to="`about-${aboutButton.to}`"/>
                    </div>
                </span>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AboutButton from '@signage/components/AboutButton.vue';
  import BackButton from '@signage/components/BackButton.vue';
  import {clearInterval} from "timers";

  @Component({
    components: {
      AboutButton,
      BackButton,
    },
    data: function () {
      return {
        aboutButtons: [
          {
              to: 'recipe',
          },
          {
              to: 'clean',
          },
          {
              to: 'step',
          },
          {
              to: 'subscription',
          },
          {
              to: 'essence',
          },
        ]
      }
    },
  })

  export default class About extends Vue {
      public async mounted() {
          clearInterval(this.$store.state.products.productTimer)
      }
  }
</script>
