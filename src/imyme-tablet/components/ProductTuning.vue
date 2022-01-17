<script>
import ProductTuningEssence from '@tablet/components/ProductTuningEssence'
export default {
    name: 'ProductTuning',

    components: {
        ProductTuningEssence,
    },

    props: {
        essences: {
            type: Array,
            required: true,
        },
        editMode: {
            type: Boolean,
            required: false,
            default: true,
        },
    },

    data() {
        return {
            essenceModifications: [],
            isValidChild: false,
        }
    },

    computed: {
        childRecipeId() {
            let id = null
            this.$store.state.tablet.modifications.forEach(mod => {
                let e = mod.essences.filter(essence => essence.level !== 'none')
                e = e.map(essence => {
                    return {
                        id: essence.id,
                        level: essence.level,
                        name: essence.name,
                    }
                })
                let m = this.essenceModifications.map(essence => {
                    return {
                        id: essence.id,
                        level: essence.level,
                        name: essence.name,
                    }
                })
                if (JSON.stringify(e) === JSON.stringify(m)) {
                    id = mod.id
                }
            })
            return id
        },
    },

    watch: {
        childRecipeId() {
            if (this.childRecipeId) {
                this.$store.commit(
                    'tablet/SET_CHILD_RECIPE',
                    this.childRecipeId,
                )
                this.isValidChild = true
                this.$emit('is-valid', this.isValidChild)
            } else {
                this.isValidChild = false
                this.$emit('is-valid', this.isValidChild)
            }
        },
    },

    created() {
        if (this.essences.length > 0) {
            this.essenceModifications = this.essences.map(essence => {
                return {
                    ...essence,
                }
            })
            this.$store.commit('tablet/SET_TUNING', this.essenceModifications)
        }
    },

    methods: {
        changeEssenceAmount(id, level) {
            this.essenceModifications = this.essenceModifications.map(
                essence => {
                    if (essence.id === id) {
                        essence.level = level
                    }
                    return essence
                },
            )
            this.$store.commit('tablet/SET_TUNING', this.essenceModifications)
            if (this.childRecipeId) {
                this.$store.commit(
                    'tablet/SET_CHILD_RECIPE',
                    this.childRecipeId,
                )
                this.isValidChild = true
                this.$emit('is-valid', this.isValidChild)
            } else {
                this.isValidChild = false
                this.$emit('is-valid', this.isValidChild)
            }
        },
    },
}
</script>

<template>
    <section :class="editMode ? 'p-1' : ''">
        <h5 v-if="editMode" class="pb-1 text-center text-subheading ls-1">成分のチューニングができます</h5>
        <div class="essence-section text-center bg-body p-1">
            <ProductTuningEssence
                v-for="essence in essences"
                :key="essence.index"
                :essence="essence"
                :edit-mode="editMode"
                @changeEssenceAmount="changeEssenceAmount"
            />
        </div>
    </section>
</template>
