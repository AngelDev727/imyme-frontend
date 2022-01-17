<template>
    <section class="m-0 bg-body top-section-transitions-3">
        <div id="about-subscription">
            <span>
                <BackButton :to="`about`" />
                <div class="top--subscription sticky-bg pt-4">
                    <div>
                        <span class="top--text top--padding">
                            <span class="text-heading-small">万全の肌サポート体制</span>
                            <div class="text-philosophy mt-2">
                                imymeは毎月、肌の状態を分析し、その人に合ったセラムをお送りします。自信のある肌へ導けるように、私たちは食生活からスキンケアに至るまで万全なサポート（電話またはメール）で対応します。万一、imymeが提案したアイテムで効果を実感できない場合には、開封後も他のセラムに交換可能。いつでも、購入中止ができます。
                            </div>
                            <div class="mt-1 mb-3 about-subscription-icon1">
                                <img src="@signage/assets/images/about/icon/subscription-icon1.png">
                            </div>
                            <div class="my-3">
                                <img class="subscription-icon-position" src="@signage/assets/images/about/icon/subscription-icon2.png">
                            </div>
                        </span>
                    </div>
                </div>
            </span>
        </div>
    </section>
</template>



<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import BackButton from '@signage/components/BackButton.vue';

  @Component({
    components: {
      BackButton,
    },
  })

  export default class AboutSubscription extends Vue {}
</script>
