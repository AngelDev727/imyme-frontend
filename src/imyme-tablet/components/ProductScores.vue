<script>
export default {
    name: 'ProductScores',

    filters: {
        formatText(label) {
            return label
        },
    },

    props: {
        scores: {
            type: Object,
            required: true,
        },
    },
}
</script>

<template>
    <div class="product-scores product-scores_tablet">
        <template v-for="(value, key) in scores">
            <h4 :key="key + 'title'">
                <div class="spaced-label spaced-label_tablet">
                    <span v-for="k in key" :key="k">
                        {{ k }}
                    </span>
                </div>
            </h4>
            <span
                :key="key + 'number'"
                class="product-score-value product-score-value_tablet"
            >
                <span>
                    {{ value }}
                </span>
            </span>
            <div :key="key + 'value'" class="spread">
                <i v-for="n in value" :key="n" class="circle__active small" />
                <i v-for="n in 5 - value" :key="n + value" class="circle" />
            </div>
        </template>
    </div>
</template>
