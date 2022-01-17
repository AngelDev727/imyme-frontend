<template>
    <section class="text-center m-0">
        <h2 id="howto" class="pt-4 pb-1 text-lowercase">
            <u>how to matching</u>
        </h2>
        <div class="how-to-section" @scroll.passive="onScroll($event)">
            <div :style="'width:' + steps.length * 95 + 'vw'">
                <div
                    v-for="(step, index) in steps"
                    :key="index"
                    class="p-1 mx-1 bg-body flex-item-100 flex-row"
                >
                    <div class="w-100">
                        <h2 class="text-lowercase">
                            step<span class="text-scale-150">
                                {{ index + 1 }}
                            </span>
                        </h2>
                        <p>{{ step.text }}</p>
                        <svg
                            class="icon-stroke icon-lg mt-1"
                            :class="step.iconOffset"
                        >
                            <use :xlink:href="step.icon" />
                        </svg>
                    </div>
                    <div class="arrow-container">
                        <div v-if="index < 3" class="arrow-right" />
                    </div>
                </div>
            </div>
        </div>
        <div class="py-3 px-5 mx-5">
            <div class="scroll-bar" />
            <div
                class="scroll-handel"
                :style="`transform: translateX(${xPos}%)`"
            />
        </div>
    </section>
</template>

<script>
export default {
    name: 'HowToSection',

    data() {
        return {
            xPos: 0,
            sectionWidth: 0,
            steps: [
                {
                    text:
                        '20の診断に答えて、\nあなたの名前を入力してください。',
                    icon: '#icon-tablet-survey',
                },
                {
                    text:
                        '分析結果から、あなたにぴったりの\nローションをつくります。',
                    icon: '#icon-bottle',
                    iconOffset: 'pb-1',
                },
                {
                    text:
                        'あなたの好みに応じて、\n成分をチューニングできます。',
                    icon: '#icon-tablet-customize',
                },
                {
                    text:
                        '目の前で、今すぐ\nあなただけのローションをつくります。',
                    icon: '#icon-tablet-bottles',
                    iconOffset: 'pb-1',
                },
            ],
        }
    },

    methods: {
        onScroll(event) {
            this.xPos =
                (event.target.scrollLeft /
                    (event.target.scrollWidth - event.target.clientWidth)) *
                200
        },
    },
}
</script>
