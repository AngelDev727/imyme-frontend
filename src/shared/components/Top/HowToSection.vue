<template>
    <section id="flow" class="text-center m-0 pb-3">
        <svg class="icon-stroke icon-stroke-bold mt-4">
            <use xlink:href="#icon-flow" />
        </svg>
        <h1 id="howto" class="pb-4 text-lowercase text-heading-regular">
            flow
        </h1>
        <div class="how-to-section-container">
            <div
                v-for="(step, index) in steps"
                :key="index"
                class="mx-2 mb-2 px-2 pt-1 bg-body"
            >
                <div class="step-header">
                    <span class="step-number mr-3">
                        {{ index + 1 }}
                    </span>
                    <span class="text-regular text-left">
                        <div v-for="t in step.text" :key="t" class="lh-1">
                            {{ t }}
                        </div>
                    </span>
                </div>
                <div class="icon-container">
                    <svg class="how-to-icon" :class="step.iconOffset">
                        <use :xlink:href="step.icon" />
                    </svg>
                </div>
                <div v-if="index < 2" class="arrow-down" />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator'

export default class HowToSection extends Vue {
    public name: string = 'HowToSection'

    xPos: number = 0
    sectionWidth: number = 0
    steps: any[] = [
        {
            text: ['15個の質問に答えて、', 'あなたの名前を入力してください。'],
            icon: '#icon-survey',
            iconOffset: '',
        },
        {
            text: ['あなたにぴったりの化粧品を', 'お届けします。'],
            icon: '#icon-delivery',
        },
        {
            text: [
                'できる限り新鮮な状態で',
                '消費期限内に使い切ってください。',
            ],
            icon: '#icon-face-hands',
            iconOffset: '',
        },
    ]

    onScroll(event) {
        this.xPos =
            (event.target.scrollLeft /
                (event.target.scrollWidth - event.target.clientWidth)) *
            200
    }
}
</script>
