<script>
import dayjs from 'dayjs'
import SkinTypeScore from '@shared/components/SkinTypeScore'
import skinTypeDictionary from '@shared/skinTypeDictionary'
import sensitivityDictionary from '@shared/sensitivityDictionary'

export default {
    name: 'MySkinType',

    components: {
        SkinTypeScore,
    },

    filters: {
        formatDate(date) {
            return dayjs(date).format('YYYY.MM.DD')
        },
    },

    props: {
        skin: {
            type: Object,
            required: true,
        },
        showHeader: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: String,
            default: dayjs().format(),
        },
        showPrefix: {
            type: Boolean,
            default: true,
        },
        scoreCap: {
            type: Number,
            default: 5,
        },
    },

    data() {
        return {
            ja: {
                普通肌: 'normal',
                乾燥肌: 'dry',
                脂性肌: 'oily',
                乾燥性脂性肌: 'dryoily',
                混合肌: 'mixed',
                normal: '普通肌',
                dry: '乾燥肌',
                oily: '脂性肌',
                dryoily: '乾燥性脂性肌',
                mixed: '混合肌',
            },
        }
    },

    methods: {
        skinValueText(value) {
            return skinTypeDictionary[value]
        },
        sensitivityValueText(value) {
            return sensitivityDictionary[value]
        },
        sensitivityValue(value) {
            return value <= 10 ? value : 10
        },
    },
}
</script>

<template>
    <section class="p-1">
        <h2 v-if="showHeader" class="py-1 text-center text-subheading">
            {{ showPrefix ? 'あなたの' : '' }}肌タイプ
        </h2>
        <h3 v-else-if="!showHeader && createdAt" class="date ls-1">
            {{ createdAt | formatDate }}
        </h3>
        <div
            class="skin-type-container bg-body pb-2"
            :class="{'px-1': showHeader}"
        >
            <div class="flex-row flex-center flex-ai py-3 m-auto">
                <svg class="icon-stroke icon-skin-type icon-skin-type-side">
                    <use :xlink:href="'#icon-skin-' + ja[skin.type]" />
                </svg>
                <h1>{{ skin.type }}</h1>
            </div>
            <div class="skin-type-details">
                <div class="spaced-label">
                    <span>敏</span>
                    <span>感</span>
                    <span>度</span>
                </div>
                <div class="score label-nowrap blue-background mx-1">
                    <span class="skin-score mr-1">
                        {{ sensitivityValue(skin.sensitivity) }}
                    </span>
                    <span>{{ sensitivityValueText(skin.sensitivity) }}</span>
                </div>
                <SkinTypeScore
                    :score="skin.sensitivity"
                    :dots="scoreCap"
                    :sensitivity="true"
                />

                <div class="spaced-label">
                    <span>シ</span>
                    <span>ミ</span>
                </div>
                <div class="score label-nowrap blue-background mx-1">
                    <span class="skin-score mr-1">
                        {{ skin.spot }}
                    </span>
                    <span>{{ skinValueText(skin.spot) }}</span>
                </div>
                <SkinTypeScore :score="skin.spot" :dots="scoreCap" />
                <div class="spaced-label">
                    <span>ニ</span>
                    <span>キ</span>
                    <span>ビ</span>
                </div>
                <div class="score label-nowrap blue-background mx-1">
                    <span class="skin-score mr-1">
                        {{ skin.acne }}
                    </span>
                    <span>{{ skinValueText(skin.acne) }}</span>
                </div>
                <SkinTypeScore :score="skin.acne" :dots="scoreCap" />

                <div class="spaced-label">
                    <span>シ</span>
                    <span>ワ</span>
                </div>
                <div class="score label-nowrap blue-background mx-1">
                    <span class="skin-score mr-1">
                        {{ skin.wrinkle }}
                    </span>
                    <span>{{ skinValueText(skin.wrinkle) }}</span>
                </div>
                <SkinTypeScore :score="skin.wrinkle" :dots="scoreCap" />
            </div>
        </div>
    </section>
</template>
