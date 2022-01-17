<template>
    <section class="m-0 bg-body top-section-transitions-3">
        <div>
            <span>
                <BackButton :to="`about`" />
                <div :class="aboutContent.backgroundClass" class="pt-4">
                    <div>
                        <span class="top--text top--padding">
                            <span class="text-heading-small">{{ aboutContent.title }}</span>
                            <div class="text-philosophy mt-2 text-red">
                                <img class="essence-touch-icon" src="@signage/assets/images/icon/touch-icon.png" width="40px">
                                画像をタッチ！成分の詳細が見られます。
                            </div>
                            <component :is="aboutContent.subSection" v-if="aboutContent.subSection"/>
                        </span>
                    </div>
                </div>
            </span>
        </div>
        <EssenceModal />
    </section>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import AboutContent from '@signage/components/AboutContent.vue';
  import BackButton from '@signage/components/BackButton.vue';
  import Essences from '@signage/components/Essences.vue'
  import EssenceModal from '@shared/components/EssenceModal.vue'

  @Component({
    components: {
      AboutContent,
      BackButton,
      Essences,
      EssenceModal,
    },
    data: function () {
      return {
      aboutContent: {
            title: 'あなたに最適なセラムをつくる新鮮なエッセンス',
            backgroundClass: 'sticky-bg bg-body',
            subSection: 'Essences',
        }
      }
    }
  })

  export default class AboutEssence extends Vue {}
</script>
