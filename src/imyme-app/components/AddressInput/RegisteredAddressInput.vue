<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {getAddressByZip} from 'japan-address-autofill'
import {Mutation} from 'vuex-class'

@Component
export default class RegisteredAddressInput extends Vue {
    public name: string = 'RegisteredAddressInput'

    @Prop({type: Object, default: () => {}}) address: any
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage

    kanjiPrefecture: string | null = null

    async created() {
        //Shopify returns prefecture name in Romaji by default, convert it Kanji
        if (!this.kanjiPrefecture) {
            await getAddressByZip(this.address.node.zip.replace('-', ''))
                .then(({prefecture}) => {
                    this.kanjiPrefecture = prefecture
                })
                .catch(() => {
                    this.setErrorMessage({
                        message: 'incorrect zip',
                    })
                })
        }
    }
}
</script>

<template>
    <label class="container">
        {{ address.node.zip }}
        {{ kanjiPrefecture }}
        {{ address.node.city }}
        {{ address.node.address1 }}
        {{ address.node.address2 !== 'undefined' ? address.node.address2 : '' }}
        <slot></slot>
    </label>
</template>

<style scoped>
.container {
    max-width: calc(100% - 9rem);
}
</style>
