<template>
    <section id="FAQ" class="mt-2 m-0 pb-3">
        <h3 class="pt-5 pb-2 text-heading-small">
            faq よくある質問
        </h3>

        <transition
            duration="5000"
            :css="false"
            @enter="$enter"
            @after-enter="$afterEnter"
            @leave="$leave"
        >
            <div id="q-and-a-section" class="collapse-section">
                <div v-for="(section, key, index) in FAQs" :key="key">
                    <div class="q-and-a-heading" @click="toggleSection(index)">
                        <div
                            id="q-and-a-icon"
                            class="pb-5 collapse-icon arrow-r"
                            :class="{'arrow-up': showSections[index]}"
                        >
                            <div class="bar" />
                            <div class="bar" />
                            <div class="bar" />
                        </div>
                        <h3 class="pointer pt-1 pl-2">
                            {{ key }}
                        </h3>
                    </div>

                    <transition
                        duration="5000"
                        :css="false"
                        @enter="$enter"
                        @after-enter="$afterEnter"
                        @leave="$leave"
                    >
                        <div
                            v-if="showSections[index]"
                            id="q-and-a"
                            class="collapse-section"
                        >
                            <div
                                v-for="(faq, inner_index) in section"
                                :key="inner_index"
                            >
                                <div class="bg-body m-2 p-1">
                                    <div class="m-2">
                                        <span class="text-faq">
                                            Q_ {{ faq.question }}
                                        </span>
                                    </div>
                                    <div class="m-1">
                                        <span
                                            class="text-faq left"
                                            v-html="faq.answer"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>

                    <div
                        v-if="showSections[index]"
                        id="q-and-a-icon"
                        class="pb-5 collapse-icon arrow"
                        :class="{'arrow-up': showSections[index]}"
                        @click="toggleSection(index)"
                    >
                        <div class="bar" />
                        <div class="bar" />
                        <div class="bar" />
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import FAQ from '@/shared/faq.js'

@Component
export default class FAQSection extends Vue {
    public name: string = 'FAQSection'

    showSections: object = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
    }

    get FAQs() {
        return FAQ
    }
    toggleSection(i) {
        this.showSections[i] = !this.showSections[i]
    }
}
</script>
