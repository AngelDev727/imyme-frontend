<template>
    <section class="m-0 bg-body top-section-transitions-3">
        <div id="about-recipe">
            <span>
                <BackButton :to="`about`" />
                <AboutContent
                        :icon="aboutContent.icon"
                        :title="aboutContent.title"
                        :sub="aboutContent.sub"
                        :mainText="aboutContent.mainText"
                        :backgroundClass="aboutContent.backgroundClass"
                        :subSection="aboutContent.subSection"
                />
            </span>
        </div>
    </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AboutContent from '@signage/components/AboutContent.vue';
  import BackButton from '@signage/components/BackButton.vue';

  @Component({
    components: {
      AboutContent,
      BackButton,
    },
    data: function () {
      return {
        aboutContent: {
            icon: require('@signage/assets/images/about/icon/step-icon.png'),
            title: 'たった１本で４機能のセラム',
            mainText: [
              'imymeのセラムは、化粧水、美容液、乳液、クリームの代わりにたった１本のセラムだけで、スキンケアできます。お客様の肌に合わせて、エキス、オイルの配合がアレンジされ、洗顔とセラムの２ステップでOK。最低限のコストでスキンケアを目指します。',
            ],
            backgroundClass: 'sticky-bg top--step',
        }
      }
    }
  })

  export default class AboutStep extends Vue {}
</script>
