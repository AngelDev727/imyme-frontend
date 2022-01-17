<template>
    <div class="essence-section">
        <Essence
            v-for="(value, key) in essenceList"
            :key="key"
            :data-testid="`essence-${key}`"
            :essence-id="key"
            :essence-image="value"
            class="essence-top-page"
        />
    </div>
</template>

<script lang="ts">
import Essence from '@/shared/components/Essence.vue'
import essenceDictionary from '@/shared/essenceDictionary'

// import IconColorDrop from '@shared/components/IconColorDrop'
import {Vue, Component} from 'vue-property-decorator'

@Component({
    components: {
        Essence,
        // IconColorDrop,
    },
})
export default class Essences extends Vue {
    public name: string = 'Essences'

    showEssenceSection: boolean = false
    essenceList = essenceDictionary

    essenceImage(id) {
        return essenceDictionary[id]
    }
}
</script>
