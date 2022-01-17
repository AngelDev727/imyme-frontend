<template>
    <div class="clean-list mt-1 mb-3">
        <div class="list-item text-center mb-1">
            <s>
                <span class="text-regular text-black lh-2">
                    &nbsp;&nbsp;&nbsp;合成防腐剤&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
            </s>
        </div>
        <div class="list-item text-center mb-1">
            <s>
                <span class="text-regular text-black lh-2">
                    &nbsp;&nbsp;&nbsp;乳化剤&nbsp;&nbsp;&nbsp;
                </span>
            </s>
        </div>
        <div class="list-item text-center mb-1">
            <s>
                <span class="text-regular text-black lh-2">
                    &nbsp;&nbsp;&nbsp;合成香料&nbsp;&nbsp;&nbsp;
                </span>
            </s>
        </div>
        <div class="list-item text-center mb-1">
            <s>
                <span class="text-regular text-black lh-2">
                    &nbsp;&nbsp;&nbsp;エタノール&nbsp;&nbsp;&nbsp;
                </span>
            </s>
        </div>
        <div class="list-item text-center mb-1">
            <s>
                <span class="text-regular text-black lh-2">
                    &nbsp;&nbsp;&nbsp;合成色素&nbsp;&nbsp;&nbsp;
                </span>
            </s>
        </div>
        <div class="list-item text-center mb-1">
            <s>
                <span class="text-regular text-black lh-2">
                    石油由来合成界面活性剤
                </span>
            </s>
        </div>
        <div class="list-item text-center mb-1">
            <s>
                <span class="text-regular text-black lh-2">
                    &nbsp;&nbsp;合成ポリマー&nbsp;&nbsp;&nbsp;
                </span>
            </s>
        </div>
        <div class="list-item text-center mb-1">
            <s>
                <span class="text-regular text-black lh-2">
                    &nbsp;&nbsp;&nbsp;シリコン&nbsp;&nbsp;&nbsp;
                </span>
            </s>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class SubsectionClean extends Vue {
    public name: string = 'SubsectionCrossedOut'
}
</script>
