<template>
    <section class="p-1 mb-2">
        <h3 class="pointer py-1 text-subheading">
            アドバイス
        </h3>
        <div
            v-if="advice.zoneAdviceId != 'cfb2ff43-debf-4d7d-898c-14533ca6da58'"
            class="bg-body py-3 px-1"
            @click="toggleZone"
        >
            <div class="icon-group icon-fit-container give-height m-auto">
                <svg class="icon-stroke">
                    <use xlink:href="#icon-face" />
                </svg>
                <svg class="icon-fill advice-fill">
                    <use
                        :xlink:href="zoneIcons[zoneIDs[advice.zoneAdviceId]]"
                    />
                </svg>
            </div>
            <h3 class="my-1 w-90 mx-auto">
                気になる部分：
                <span
                    v-for="(underlineWord, index) in addUnderlines(
                        zoneIDs[advice.zoneAdviceId],
                    )"
                    :key="underlineWord"
                    class="add-dot"
                    :style="
                        'border-bottom: 2px solid' + zoneColors[underlineWord]
                    "
                >
                    {{ addUnderlines(zoneIDs[advice.zoneAdviceId])[index]
                    }}<wbr />
                </span>
                <!-- {{ addUnderlines(zoneIDs[advice.zoneAdviceId]) }} -->
                ゾーン
            </h3>
            <transition
                duration="5000"
                :css="false"
                @enter="$enter"
                @after-enter="$afterEnter"
                @leave="$leave"
            >
                <div v-if="!zone" class="collapse-section">
                    <div class="px-1 py-1 max-w">
                        <p>{{ advice.zoneAdvice1 }}</p>
                    </div>
                </div>
            </transition>
            <div class="px-1 max-w">
                <p class="truncate">
                    {{ zone ? advice.zoneAdvice1 : ' ' }}
                </p>
            </div>

            <div
                id="questionare-icon"
                class="text-red pb-1 collapse-icon arrow"
                :class="{cross: !zone}"
                @click.stop="toggleZone"
            >
                <div class="bar" />
                <div class="bar" />
                <div class="bar" />
            </div>
        </div>
        <!-- section division -->
        <div class="bg-body py-3 px-1" @click="toggleTruncate">
            <div v-if="skin" class="flex-row flex-center flex-ai py-1">
                <svg class="icon-stroke icon-skin-type icon-skin-type-header">
                    <use :xlink:href="'#icon-skin-' + ja[skin.type]" />
                </svg>
            </div>
            <h3 class="my-1">{{ skin.type }}のあなたの肌状態</h3>
            <transition
                duration="5000"
                :css="false"
                @enter="$enter"
                @after-enter="$afterEnter"
                @leave="$leave"
            >
                <div v-if="!truncate" class="collapse-section">
                    <div class="px-1 py-1 max-w">
                        <p>{{ advice.skinTypeAdvice }}</p>
                    </div>
                </div>
            </transition>
            <div class="px-1 max-w">
                <p class="truncate">
                    {{ truncate ? advice.skinTypeAdvice : ' ' }}
                </p>
            </div>

            <div
                id="questionare-icon"
                class="text-red pb-1 collapse-icon arrow"
                :class="{cross: !truncate}"
                @click.stop="toggleTruncate"
            >
                <div class="bar" />
                <div class="bar" />
                <div class="bar" />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MyAdvice',

    props: {
        advice: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        subcategory: {
            type: Boolean,
            default: false,
        },
        skin: {
            type: Object,
            required: true,
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
            zoneIDs: {
                '07467887-b7d1-479f-9ef1-8dac2a3b711f': '肝臓・胆のう',
                '0ccf433e-3e58-48e4-8c42-6d9c1ae77c76': '肺',
                '20730ad2-d1bf-47f6-aca7-33f94f3765b4': '大腸・小腸',
                '75282a2d-a840-4349-bf53-f77902e5dac6': '子宮・卵巣・膀胱',
                '8020fd04-1a51-4f35-a8d7-59290c7a71cd': '膵臓',
                'b0cbdf2c-2643-4af6-8d25-4c3dde93e7c1': '胃',
                'bd80c532-385b-42db-92e2-0551a56de2e4': '腎臓',
                'cfb2ff43-debf-4d7d-898c-14533ca6da58': 'なし',
            },
            zoneIcons: {
                '肝臓・胆のう': '#icon-face-result-2',
                肺: '#icon-face-result-3',
                腎臓: '#icon-face-result-4',
                '子宮・卵巣・膀胱': '#icon-face-result-5',
                '大腸・小腸': '#icon-face-result-6',
                胃: '#icon-face-result-7',
                膵臓: '#icon-face-result-8',
                なし: '',
            },
            zoneColors: {
                肝臓: '#b0e9eb',
                胆のう: '#e1bff1',
                肺: '#fcaeb5',
                大腸: '#aaecea',
                小腸: '#ffbde1',
                子宮: '#d6c8fa',
                卵巣: '#fcaeb5',
                膀胱: '#aaecea',
                膵臓: '#fcaeb5',
                胃: '#ffbde1',
                腎臓: '#d6c8fa',
                なし: '#fff',
            },
            truncate: true,
            zone: true,
        }
    },

    methods: {
        toggleTruncate() {
            this.truncate = !this.truncate
        },
        toggleZone() {
            this.zone = !this.zone
        },
        addUnderlines(result) {
            let underlineWords = result.split('・')
            return underlineWords
        },
    },
}
</script>
