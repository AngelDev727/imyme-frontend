<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class EmptyCart extends Vue {
    public name: string = 'EmptyCart'
}
</script>

<template>
    <div class="py-5 text-center">
        <svg class="icon-stroke icon-xl mx-auto mt-5 mb-0">
            <use xlink:href="#icon-bag" />
        </svg>
        <div class="pt-3 pb-1 text-large text-light">
            買い物カゴに商品が入っていません。
        </div>
        <div class="pt-3 pb-1 text-large text-light lh-2">
            現在、買い物カゴには商品が
            <br />
            入っていません。
            <br />
            ぜひ、imymeで自分にピッタリの
            <br />
            コスメを見つけてください。
        </div>
        <div class="pt-3 pb-1 text-large text-light">
            ご利用をお待ちしております。
        </div>
        <span class="previous--question--button">
            <router-link
                tag="button"
                class="btn-circle m-auto"
                :to="{name: 'top'}"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-back" />
                </svg>
            </router-link>
        </span>
    </div>
</template>
