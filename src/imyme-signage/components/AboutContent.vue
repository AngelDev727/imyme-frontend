<template>
    <div :class="backgroundClass" class="pt-4">
        <div>
            <span class="top--text top--padding">
                <span class="text-heading-small">{{ title }}</span>
                <div v-for="(paragraph, index) in mainText" :key="title + index" class="text-philosophy mt-2">
                    {{ paragraph }}
                </div>
                <div class="my-3">
                    <img :src="icon" :class="iconCss">
                </div>
                <component :is="subSection" v-if="subSection"/>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue  } from 'vue-property-decorator';
  import {PropType} from "vue/types/options";
  import SubsectionClean from '@shared/components/Top/SubsectionClean.vue';
  import Essences from '@signage/components/Essences.vue';

  @Component({
    components: {
      SubsectionClean,
      Essences,
    },
    props: {
      icon: {
        type: String,
        required: true,
      },
      iconCss: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: true,
      },
      mainText: {
        type: Array as PropType<string[]>,
        required: true,
      },
      backgroundClass: {
        type: String,
        required: true,
      },
      subSection: {
        type: String,
        required: false,
      },
    },
  })

  export default class AboutButton extends Vue {}
</script>
