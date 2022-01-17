<template>
    <section class="p-1 mb-2">
        <h3 class="py-1 text-center text-subheading">
            {{ showPrefix ? 'あなたの' : '' }}トータルライフバランス
        </h3>
        <div
            class="life-balance-container bg-body p-1"
            :class="{'px-1': !showHeader}"
        >
            <div class="life-balance-chart-container">
                <RadarChart
                    :radar-chart-context="radarChartContext"
                    :inner-data="[
                        lifeBalance.diet,
                        lifeBalance.excercise,
                        lifeBalance.mental,
                        lifeBalance.stress,
                        lifeBalance.sleep,
                    ]"
                />
            </div>

            <div class="life-balance-details pb-2">
                <span class="life-balance-item pb-2">
                    <svg class="icon-stroke icon-xs">
                        <use xlink:href="#icon-stress" />
                    </svg>
                    <h4 class="name">
                        ストレス
                    </h4>
                    <span class="advice">
                        <span class="number skin-score">
                            {{ lifeBalance.stress }}
                        </span>
                        <span>
                            {{ adviceText('stress', lifeBalance.stress) }}
                        </span>
                    </span>
                </span>

                <span class="life-balance-item pb-2">
                    <svg class="icon-stroke icon-xs">
                        <use xlink:href="#icon-sleep" />
                    </svg>
                    <h4 class="name">
                        睡眠
                    </h4>
                    <span class="advice">
                        <span class="number skin-score">
                            {{ lifeBalance.sleep }}
                        </span>
                        <span>
                            {{ adviceText('sleep', lifeBalance.sleep) }}
                        </span>
                    </span>
                </span>

                <span class="life-balance-item pb-2">
                    <svg class="icon-stroke icon-xs">
                        <use xlink:href="#icon-diet" />
                    </svg>
                    <h4 class="name">
                        食生活
                    </h4>
                    <span class="advice">
                        <span class="number skin-score">
                            {{ lifeBalance.diet }}
                        </span>
                        <span>
                            {{ adviceText('diet', lifeBalance.diet) }}
                        </span>
                    </span>
                </span>

                <span class="life-balance-item pb-2">
                    <svg class="icon-stroke icon-xs">
                        <use xlink:href="#icon-running" />
                    </svg>
                    <h4 class="name">
                        運動
                    </h4>
                    <span class="advice">
                        <span class="number skin-score">
                            {{ lifeBalance.excercise }}
                        </span>
                        <span>
                            {{ adviceText('excercise', lifeBalance.excercise) }}
                        </span>
                    </span>
                </span>

                <span class="life-balance-item">
                    <svg class="icon-stroke icon-xs">
                        <use xlink:href="#icon-mental" />
                    </svg>
                    <h4 class="name">
                        メンタル
                    </h4>
                    <span class="advice">
                        <span class="number skin-score">
                            {{ lifeBalance.mental }}
                        </span>
                        <span>
                            {{ adviceText('mental', lifeBalance.mental) }}
                        </span>
                    </span>
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import RadarChart from '@shared/components/RadarChart'
import lifeBalanceDictionary from '@shared/lifeBalanceDictionary'

export default {
    name: 'MyLifeBalance',

    components: {
        RadarChart,
    },

    props: {
        lifeBalance: {
            type: Object,
            required: true,
        },
        radarChartContext: {
            type: String,
            default: 'radar-chart',
        },
        subcategory: {
            type: Boolean,
            default: false,
        },
        showHeader: {
            type: Boolean,
            default: true,
        },
        showPrefix: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            windowWidth: window.innerWidth,
        }
    },

    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.resizeWithWindowSize)
        })
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeWithWindowSize)
    },

    methods: {
        adviceText(type, value) {
            return lifeBalanceDictionary[type][value]
        },

        resizeWithWindowSize() {
            this.windowWidth = window.innerWidth
        },
    },
}
</script>
