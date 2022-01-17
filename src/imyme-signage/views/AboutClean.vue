<template>
    <section class="m-0 bg-body top-section-transitions-3">
        <div id="about-clean">
            <span>
                <BackButton :to="`about`" />
                <AboutContent
                        :icon="aboutContent.icon"
                        :iconCss="aboutContent.iconCss"
                        :title="aboutContent.title"
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
        aboutContent:
          {
            icon: require('@signage/assets/images/about/icon/clean-icon.png'),
            iconCss: 'clean-icon-position',
            title: '15の診断で、最適なセラムを提案',
            mainText: [
              'スマホから１５の診断に答えるだけで、今まで出会えなかったあなたに最適なスキンケアを提案し、あなたを肌トラブルから解放。特定のアレルギーをお持ちの方でもアレルギー成分を除外したスキンケアを提案するので安心です。',
            ],
            backgroundClass: 'sticky-bg top--clean',
          },
      }
    }
  })

  export default class AboutClean extends Vue {}
</script>
