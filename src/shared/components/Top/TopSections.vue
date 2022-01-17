<template>
    <div>
        <MatchingAndFreshness />
        <!-- {{ philosophy }} -->
        <section
            v-for="section in philosophySections"
            :key="section.title"
            v-scroll="section.id === 'essence' ? handleEssence : handleScroll"
            class="m-0 top--img clip-box no-click"
            :class="section.backgroundClass"
        >
            <div :id="section.id" class="top">
                <span class="top--text top--padding">
                    <svg class="icon-stroke icon-stroke-bold icon-top-page">
                        <use :xlink:href="`#${section.icon}`" />
                    </svg>
                    <span class="text-heading-regular">
                        {{ section.heading }}
                    </span>
                    <span
                        class="text-subheading text-center mt-2"
                        v-html="section.subheading"
                    />
                    <div
                        v-for="(paragraph, index) in section.mainText"
                        :key="section.heading + index"
                        class="text-philosophy mt-2"
                    >
                        {{ paragraph }}
                    </div>
                    <component
                        :is="section.subSection"
                        v-if="section.subSection"
                        v-scroll="handleScroll"
                    />
                </span>
            </div>
        </section>
        <EssenceModal />
    </div>
</template>

<script lang="ts">
import MatchingAndFreshness from '@shared/components/Top/MatchingAndFreshness.vue'
import SubscriptionLink from '@shared/components/Top/SubscriptionLink.vue'
import {philosophy} from '@/shared/topSectionsDictionary.js'
import SubsectionClean from '@shared/components/Top/SubsectionClean.vue'
import SubsectionFreshness from '@shared/components/Top/SubsectionFreshness.vue'
import Essences from '@shared/components/Essences.vue'
import EssenceModal from '@shared/components/EssenceModal.vue'
import {Vue, Component} from 'vue-property-decorator'

@Component({
    components: {
        MatchingAndFreshness,
        SubsectionClean,
        SubsectionFreshness,
        Essences,
        EssenceModal,
        SubscriptionLink,
    },
})
export default class TopSections extends Vue {
    public name: string = 'TopSections'

    get philosophySections() {
        return philosophy
    }

    handleScroll(evt, el) {
        if (window.scrollY >= el.offsetTop - window.innerHeight * 0.75) {
            el.classList.add('top-section-transitions-2')
            return true
        }
    }

    handleEssence(evt, el) {
        el.classList.add('bg-body', 'top-section-transitions-2')
        el.classList.remove('no-click')
        return true
    }
}
</script>
