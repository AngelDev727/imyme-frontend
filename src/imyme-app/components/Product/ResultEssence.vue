<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Action} from 'vuex-class'
import {isVisibleEssence} from '@/imyme-app/utils'

@Component
export default class ResultEssence extends Vue {
    public name: string = 'ResultEssence'

    @Prop({type: [String, Number], required: true}) essenceId!: string | number
    @Prop({type: [String, Number, Boolean], required: true}) essenceImage!:
        | string
        | number
        | boolean
    @Prop({type: [String], required: false}) essenceOverview?: string
    @Prop({type: [String], required: true}) essenceName?: string
    @Action('products/getEssenceById') getEssenceById

    showModal(id) {
        this.getEssenceById(id)
    }

    get visible() {
        return isVisibleEssence(this.essenceId)
    }
}
</script>

<template>
    <div v-if="essenceImage && visible">
        <div class="essence-img-block" @click="showModal(essenceId)">
            <img
                v-lazy="essenceImage"
                class="essence-img"
                :alt="`essence-${essenceId}`"
            />
        </div>
        <div class="essence-txt-block">
            <p>{{ essenceName }}</p>
            {{ essenceOverview }}
        </div>
    </div>
</template>
<style scoped>
.essence-img {
    padding: 0.5em;
    padding-left: 1em;
}
.essence-img-block {
    width: 50%;
}
.essence-txt-block {
    width: 50%;
    padding: 0.5em;
    padding-right: 1em;
    font-size: 1.3rem;
}
.essence-txt-block p {
    text-align: left;
    margin-bottom: 5px;
    font-size: 1.2em;
}
@media only screen and (min-width: 750px) {
    .essence-txt-block {
        font-size: 1.6rem;
    }
}
@media only screen and (min-width: 75em) {
    .essence-img-block {
        width: 40%;
    }
    .essence-txt-block {
        width: 60%;
    }
}
</style>
