<template>
    <section class="m-0 top-section-transitions-3">
        <div class="top">
            <div
                id="philosophy"
                class="top--philosophy text-center"
                :class="matchingAndFreshness.backgroundClass"
            >
                <span class="top--text pt-5">
                    <span class="text-heading-large text-underlined">
                        {{ matchingAndFreshness.heading[0] }}
                    </span>
                    <span class="text-heading-small">
                        {{ matchingAndFreshness.heading[1] }}
                    </span>
                    <span class="text-heading-large text-underlined mb-4">
                        {{ matchingAndFreshness.heading[2] }}
                    </span>
                    <span
                        v-for="paragraph in matchingAndFreshness.mainText"
                        :key="paragraph.index"
                        class="text-regular"
                    >
                        {{ paragraph }}
                    </span>
                    <svg class="icon-stroke icon-xl mb-2 mt-0">
                        <use :xlink:href="`#${matchingAndFreshness.icon}`" />
                    </svg>
                </span>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {matchingAndFreshness} from '@/shared/topSectionsDictionary.js'
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class MatchingAndFreshness extends Vue {
    public name: string = 'MatchingAndFreshness'

    get matchingAndFreshness() {
        return matchingAndFreshness
    }
}
</script>
