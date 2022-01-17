<template>
    <div style="width:100%">
        <div class="subsection mt-2 p-1">
            <div class="text-subheading text-center">
                防腐剤不使用で、<br />美肌寿命をのばす
            </div>
            <div class="text-philosophy mt-2">
                imymeは合成防腐剤（パラベン）を一切使用しないことで、化粧品による肌ストレスから解放し、
                肌の常在菌バランスを邪魔せずにスキンケアができます。
                ひとりひとりに合わせたセラムによって、肌の「質」を高め、
                息を吹き返したような肌を目覚めさせます。
                <br />
                <br />
                imymeはフレッシュな状態をお使いいただけるよう極力つくりたてをお届けしています。
            </div>
            <img
                class="mt-4 skin-graph"
                src="../../assets/images/freshness_graph.png"
            />
            <div class="text-philosophy mt-2 attention">
                ※紫外線やストレス、合わない化粧品や合成成分等によって本来の
                自然老化より老化が加速してしまった状態
            </div>
        </div>
        <div class="subsection mt-2 p-1">
            <span class="text-philosophy-subsection-heading">
                通常は配合できない、<br />新鮮で良質な成分を配合
            </span>
            <span class="text-philosophy-subsection">
                植物成分の中には、肌への効果が高いことはわかっていても、長時間の保存に向かず化粧品に配合できないものがあります。imymeはつくりたてのフレッシュなセラムを直接お届けするシステム。これまでは配合できなかった至高な植物成分を配合し、植物が持つ画期的な成分をたっぷりと肌に取り込むことができます。
            </span>
            <div class="text-center">
                <img
                    src="@shared/assets/images/icon-delivery.svg"
                    class="icon-xl icon-stroke"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class SubsectionFreshness extends Vue {
    public name: string = 'SubsectionFreshness'
}
</script>
<style scoped>
.freshness-legend-waku {
    border: #aaaaaa 1px solid;
    padding: 2.4vw;
}
.freshness-legend-waku {
    font-size: 2vw;
    line-height: 5vw;
}
.attention {
    font-size: 1.4em !important;
}
.skin-graph {
    width: 100%;
    object-fit: cover;
}
span.waku-txt {
    line-height: 3.8vw;
    color: #5a5a5a;
}
span.waku-txt-small {
    font-size: 1.6vw;
}
.icon-xl {
    width: 14em;
}
</style>
