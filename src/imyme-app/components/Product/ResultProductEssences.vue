<template>
    <div class="m-auto">
        <div v-if="product && product.essences" class="essence-section">
            <ResultEssence
                v-for="essence in product.essences"
                :key="essence.id"
                :essence-id="essence.id"
                :essence-image="essence.image || false"
                :essence-overview="essence.overview || essence.name"
                :essence-name="essence.name"
                class="essence-top-page"
            />
        </div>
    </div>
</template>
<style scoped>
.essence-section {
    flex-direction: column;
    padding: 0;
}
.essence-top-page {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: space-between;
}
</style>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import ResultEssence from '@app/components/Product/ResultEssence.vue'
import essenceDictionary from '@/shared/essenceDictionary.js'

@Component({
    components: {
        ResultEssence,
    },
})
export default class ResultProductEssences extends Vue {
    public name: string = 'ResultProductEssences'

    @Prop({type: Object, required: false, default: null}) product: any

    showEssenceSection: boolean = false

    toggleEssenceDetails() {
        this.showEssenceSection = !this.showEssenceSection
    }
    essenceImage(id) {
        return essenceDictionary[id]
    }
}
</script>
