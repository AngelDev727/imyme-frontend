<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class UnsubscriptionConfirmation extends Vue {
    public name: string = 'UnsubscriptionConfirmation'
}
</script>

<template>
    <section class="bg-body unsubscribe-confirm">
        <div>
            <span class="unsubscribe-confirm-text">
                定期購入の解約を
            </span>
            <br />
            <span class="unsubscribe-confirm-text">
                受け付けました。
            </span>
        </div>
        <router-link
            tag="button"
            class="btn mb-2 w-center-70"
            :to="{name: 'top'}"
        >
            <svg class="icon-stroke icon-btn">
                <use xlink:href="#icon-next" />
            </svg>
            <span class="m-auto">
                Top へ
            </span>
        </router-link>
    </section>
</template>
