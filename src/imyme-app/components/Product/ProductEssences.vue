<template>
    <div class="m-auto p-2">
        <div v-if="product && product.essences" class="essence-section">
            <Essence
                v-for="essence in product.essences"
                :key="essence.id"
                :essence-id="essence.id"
                :essence-image="essence.image || false"
                class="essence-top-page"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import Essence from '@shared/components/Essence.vue'
import essenceDictionary from '@/shared/essenceDictionary.js'

@Component({
    components: {
        Essence,
    },
})
export default class ProductEssences extends Vue {
    public name: string = 'ProductEssences'

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
