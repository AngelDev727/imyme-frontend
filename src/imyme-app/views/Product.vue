<template>
    <div class="results max-page-w">
        <LimitedProductSection />
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import LimitedProductSection from '@app/components/Product/LimitedProductSection.vue'

@Component({
    components: {
        LimitedProductSection,
    },
})

export default class Product extends Vue {}
</script>
