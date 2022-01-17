<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import LimitedProductDetail from '@app/components/Product/LimitedProductDetail.vue'
import EssenceModal from '@shared/components/EssenceModal.vue'

@Component({
    components: {
        LimitedProductDetail,
        EssenceModal,
    },
})
export default class LimitedProductSection extends Vue {
    public name: string = 'LimitedProductSection'

    get productId() {
        if (this.$route.query.id) {
            return this.escapeQuery(this.$route.query.id) as string
        } else {
            this.$router.push({name: 'top'})
        }
    }

    escapeQuery(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };
}
</script>

<template>
    <div v-if="productId">
        <div class="my-2">
            <LimitedProductDetail :product_id="productId" />
        </div>
        <EssenceModal />
    </div>
</template>
