<template>
    <div>
        <div v-if="essence" class="essence-backdrop" @click.self="closeModal" />
        <transition name="pop" mode="out-in">
            <div v-if="essence" class="essence-modal px-2 py-2">
                <div
                    class="essence-cross collapse-icon cross"
                    @click="closeModal"
                >
                    <div class="bar" />
                    <div class="bar" />
                    <div class="bar" />
                </div>
                <img
                    :src="essenceImage(essence.id) || essence.image"
                    alt="temp"
                />
                <div class="name-section my-1">
                    <span class="header">
                        <span>
                            <svg
                                style="fill:rgb(251, 220, 220); stroke:#fff; stroke-width:.4px; height:7em; width:7em"
                            >
                                <use xlink:href="#icon-logo-fill" />
                            </svg>
                        </span>
                        <span class="name">{{ essence.name }}</span>
                    </span>
                    <span class="text-regular left my-1">{{
                        essence.overview
                    }}</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import essenceDictionary from '@/shared/essenceDictionary'
import {Vue, Component} from 'vue-property-decorator'
import {State, Action} from 'vuex-class'
import {ProductsState} from '@/shared/store/modules/products/types'

@Component
export default class EssenceModal extends Vue {
    public name: string = 'EssenceModal'

    @State('products') products!: ProductsState
    @Action('products/resetEssence') resetEssence

    get essence() {
        return this.products.essence
    }

    closeModal() {
        this.resetEssence()
    }
    essenceImage(id) {
        return essenceDictionary[id]
    }
}
</script>
