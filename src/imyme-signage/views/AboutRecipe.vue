<template>
    <section class="m-0 bg-body top-section-transitions-3">
        <div id="about-recipe">
            <span>
                <BackButton :to="`about`" />
                <div :class="aboutContent.backgroundClass" class="pt-4">
                    <div>
                        <span class="top--text top--padding">
                            <span class="text-heading-small">{{ aboutContent.title }}</span>
                            <div v-for="(paragraph, index) in aboutContent.mainText" :key="aboutContent.title + index" class="text-philosophy mt-2">
                                {{ paragraph }}
                            </div>
                            <div class="my-3">
                                <img :src="aboutContent.icon">
                            </div>
                            <div class="text-philosophy mt-2">imymeは、以下の成分を配合していません。</div>
                            <component :is="aboutContent.subSection" v-if="aboutContent.subSection"/>
                        </span>
                    </div>
                </div>
            </span>
        </div>
    </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AboutContent from '@signage/components/AboutContent.vue';
  import BackButton from '@signage/components/BackButton.vue';
  import SubsectionClean from '@shared/components/Top/SubsectionClean.vue';

  @Component({
    components: {
      AboutContent,
      BackButton,
      SubsectionClean,
    },
    data: function () {
      return {
        aboutContent: {
            icon: require('@signage/assets/images/about/icon/recipe-icon.png'),
            title: 'できたてのセラムを直接お届け',
            mainText: [
              '注文を受けてから、できたてのセラムをお客さまへ直接お届けします。なので、新鮮な成分のままお肌の喜びを感じることができます。セラムが古いかどうかを気にする必要もありません。',
            ],
            backgroundClass: 'sticky-bg top--recipe',
            subSection: 'SubsectionClean'
        }
      }
    }
  })

  export default class AboutRecipe extends Vue {}
</script>
