<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Action} from 'vuex-class'

@Component
export default class Essence extends Vue {
    public name: string = 'Essence'

    @Prop({type: [String, Number], required: true}) essenceId!: string | number
    @Prop({type: [String, Number, Boolean], required: true}) essenceImage!:
        | string
        | number
        | boolean
    @Action('products/getEssenceById') getEssenceById

    showModal(id) {
        this.getEssenceById(id)
    }
}
</script>

<template>
    <div v-if="essenceImage" @click="showModal(essenceId)">
        <img
            v-lazy="essenceImage"
            class="essence-img essence-fade-in"
            :alt="`essence-${essenceId}`"
        />
    </div>
</template>
