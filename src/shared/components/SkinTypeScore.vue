<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class SkinTypeScore extends Vue {
    public name: string = 'SkinTypeScore'

    @Prop({type: Boolean, default: false}) readonly sensitivity!: boolean
    @Prop({type: Number, default: 0, required: true}) readonly score!: number
    @Prop({type: Number, default: 5, required: true}) readonly dots!: number

    scoreClamped = Math.ceil(Math.min(this.score, 10) / (10 / this.dots))
}
</script>

<template>
    <div>
        <div class="skin-score-label">
            <span v-if="sensitivity" class="label-nowrap">
                低い
            </span>
            <span v-else class="label-nowrap">
                悪い
            </span>
            <span v-if="sensitivity" class="label-nowrap">
                高い
            </span>
            <span v-else class="label-nowrap">
                良い
            </span>
        </div>
        <div v-if="score" class="spread">
            <i
                v-for="n in scoreClamped"
                :key="n"
                class="small circle__active"
            />
            <i
                v-for="n in dots - scoreClamped"
                :key="n + scoreClamped"
                class="small circle"
            />
        </div>
    </div>
</template>
