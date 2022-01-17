<script>
export default {
    name: 'ProductTuningEssence',

    props: {
        essence: {
            type: Object,
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
            customAmount: 'middle',
        }
    },

    watch: {
        customAmount() {
            if (this.editMode) {
                this.$emit(
                    'changeEssenceAmount',
                    this.essence.id,
                    this.customAmount,
                )
            }
        },
    },

    mounted() {
        this.customAmount = this.essence.level
    },
}
</script>

<template>
    <div class="essence__tuning px-1">
        <img
            class="essence-img__tuning"
            :src="essence.image || 'https://via.placeholder.com/90x90'"
            alt="temp"
        />

        <h4 class="text-center">
            <small>{{ essence.name }}</small>
        </h4>

        <div class="lh-1 py-1">
            {{ essence.overview }}
        </div>

        <div class="toggle-group">
            <div class="customize-circle-sm" />
            <div class="customize-toggle essence-tuner">
                <div>
                    <input
                        v-if="editMode"
                        :id="`essence-${essence.name}-1`"
                        v-model="customAmount"
                        type="radio"
                        :name="essence.name"
                        value="low"
                    />
                    <input
                        v-else
                        :id="`essence-${essence.name}-1`"
                        v-model="essence.level"
                        type="radio"
                        :name="essence.name"
                        value="low"
                        disabled
                        @click.prevent=""
                    />
                    <label
                        class="customize-circle customize-circle-md"
                        :for="`essence-${essence.name}-1`"
                    />
                </div>
                <div class="customize-fill" />
                <div>
                    <input
                        v-if="editMode"
                        :id="`essence-${essence.name}-2`"
                        v-model="customAmount"
                        type="radio"
                        :name="essence.name"
                        value="middle"
                    />
                    <input
                        v-else
                        :id="`essence-${essence.name}-2`"
                        v-model="essence.level"
                        type="radio"
                        :name="essence.name"
                        value="middle"
                        disabled
                        @click.prevent=""
                    />
                    <label
                        class="customize-circle customize-circle-md"
                        :for="`essence-${essence.name}-2`"
                    />
                </div>
                <div class="customize-fill" />
                <div>
                    <input
                        v-if="editMode"
                        :id="`essence-${essence.name}-3`"
                        v-model="customAmount"
                        type="radio"
                        :name="essence.name"
                        value="high"
                    />
                    <input
                        v-else
                        :id="`essence-${essence.name}-3`"
                        v-model="essence.level"
                        type="radio"
                        :name="essence.name"
                        value="high"
                        disabled
                        @click.prevent=""
                    />
                    <label
                        class="customize-circle customize-circle-md"
                        :for="`essence-${essence.name}-3`"
                    />
                </div>
            </div>
            <div class="customize-circle-lg" />
        </div>
    </div>
</template>
