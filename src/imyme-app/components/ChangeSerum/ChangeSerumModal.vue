<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {State, Action, Mutation} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import {Results} from '@/shared/store/modules/survey/types'
import {Serum} from '@/shared/store/modules/subscription/types'
import {decodeBase64Id, getProductTypeName} from '@/imyme-app/utils'

@Component
export default class ChangeSerumModal extends Vue {
    public name: string = 'ChangeSerumModal'

    @Prop({type: Array, required: true}) subscriptionIdList!: Array<string | number>
    @Prop({type: Array, required: true}) beforeItemIdList!: Array<string>
    @Prop({type: Array, required: true}) afterItemIdList!: Array<string>
    @Prop({type: String, required: true}) type!: string
    @Prop({type: String, required: true}) paymentMethod!: string
    @State(state => state.user.user) user!: User
    @State(state => state.survey.results) results!: Results
    @Action('products/getProductInfo') getProductInfo
    @Action('checkout/getUserSubscriptionsRecharge') getUserSubscriptionsRecharge
    @Action('checkout/getSubscriptionsCod') getSubscriptionsCod
    @Action('checkout/updateSubscriptionProductRecharge') updateSubscriptionProductRecharge
    @Action('checkout/updateSubscriptionCodProduct') updateSubscriptionCodProduct
    @Action('subscription/setUserSubscription') setUserSubscription
    @Mutation('application/SET_ERROR_MESSAGE') setErrorMessage

    processing: boolean = false
    chosenChangeSerumReason: string = '1'
    changeSerumReasonList = [
        {
            id: '1',
            label: '最新で出ているぴったりの' + this.productTypeName + 'が良いから',
        },
        {
            id: '2',
            label: '前回の' + this.productTypeName + 'に満足できなかったから',
        },
        {
            id: '3',
            label: '肌状況が変わったから',
        },
    ]
    recommendSerumInfo: Array<Serum> = []
    resultSkinCode: string = ''

    mounted() {
        if (this.isOneTypeOfSerum) {
            this.afterItemIdList = this.duplicateAfterItemId
        }
    }

    async saveChangeSerum() {
        this.startProcessing()

        const afterItemShopifyVariantIdList = await this.toShopifyVariantIdList(this.afterItemIdList)
        if (!afterItemShopifyVariantIdList) {
            this.setErrorMessage({
                message: 'Out of stock',
            })
            this.$emit('close')
            return
        }

        try {
            const userId = this.user ? this.user.id : null

            if (this.paymentMethod === 'cod') {
                const afterItemShopifyProductIdList = await this.toShopifyProductIdList(this.afterItemIdList)
                const subscriptionInfo = {
                    subscriptionIdList: this.subscriptionIdList,
                    shopifyCustomerId: userId ? decodeBase64Id(userId) : '',
                    beforeItemProductIdList: this.beforeItemIdList,
                    afterItemShopifyProductIdList: afterItemShopifyProductIdList,
                    afterItemShopifyVariantIdList: afterItemShopifyVariantIdList,
                    reason: this.chosenChangeSerumReason,
                }
                await this.updateSubscriptionCodProduct(subscriptionInfo)
            } else {
                const subscriptionInfo = {
                    subscriptionIdList: this.subscriptionIdList,
                    shopifyCustomerId: userId ? decodeBase64Id(userId) : '',
                    beforeItemProductIdList: this.beforeItemIdList,
                    afterItemShopifyVariantIdList: afterItemShopifyVariantIdList,
                    reason: this.chosenChangeSerumReason,
                }
                await this.updateSubscriptionProductRecharge(subscriptionInfo)
            }
            await this.getUserSubscriptionsRecharge(userId)
            await this.getSubscriptionsCod(userId)

            if (this.type === 'serum') {
                if (this.recommendations) {
                    this.recommendSerumInfo = this.recommendations.serum.map(
                        item => {
                            const serum: Serum = {
                                name: item.name,
                                type: item.type,
                            }
                            return serum
                        },
                    )
                }

                if (this.skinMapping) {
                    this.resultSkinCode = this.skinMapping.skinCode
                }

                const serumSubscriptionInfo = {
                    customerId: userId,
                    serum: this.recommendSerumInfo,
                    skinCode: this.resultSkinCode,
                }
                await this.setUserSubscription(serumSubscriptionInfo)
            }

            this.$router.push({name: 'change_serum_confirm_thanks'})
        } catch {
            this.$emit('close')
        }

        this.endProcessing()
        this.$emit('close')
    }

    startProcessing() {
        this.processing = true
    }

    endProcessing() {
        this.processing = false
    }

    async toShopifyVariantIdList(idList) {
        const shopifyVariantIdList: number[] = []
        for (const id of idList) {
            const productInfo = await this.getProductInfo(id)
            const productInfoVariants = productInfo.variants.edges.find(
                ({node}) => {
                    return node.availableForSale
                },
            )
            if (!productInfoVariants) {
                return
            } else {
                shopifyVariantIdList.push(
                    parseInt(decodeBase64Id(productInfoVariants.node.id)),
                )
            }
        }
        return shopifyVariantIdList
    }

    async toShopifyProductIdList(idList) {
        const shopifyProductIdList: number[] = []
        for (const id of idList) {
            const productInfo = await this.getProductInfo(id)
            shopifyProductIdList.push(
                parseInt(decodeBase64Id(productInfo.shopify_id)),
            )
        }
        return shopifyProductIdList
    }

    get productTypeName() {
        return getProductTypeName(this.type)
    }

    get recommendations() {
        return this.results ? this.results.recommends : null
    }

    get skinMapping() {
        return this.results ? this.results.skinMapping : null
    }

    get isOneTypeOfSerum() {
        return (
            this.type === 'serum' &&
            this.afterItemIdList &&
            this.afterItemIdList.length === 1
        )
    }

    get duplicateAfterItemId() {
        this.afterItemIdList.forEach(afterItemId =>
            this.afterItemIdList.push(afterItemId),
        )
        return this.afterItemIdList
    }
}
</script>

<template>
    <div class="max-page-w serumchange">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <h3>
                            <span class="line">
                                変更理由を教えてください。
                            </span>
                        </h3>
                        <p>
                            <span class="warning-txt">
                                ※確定ボタンを押すまではまだ変更を完了してません。
                            </span>
                        </p>
                        <div class="modal-container-box">
                            <div
                                v-for="changeSerumReason in changeSerumReasonList"
                                :key="changeSerumReason.id"
                            >
                                <div class="modal-container-box-input">
                                    <input
                                        :id="changeSerumReason.id"
                                        v-model="chosenChangeSerumReason"
                                        :value="changeSerumReason.id"
                                        type="radio"
                                        name="changeSerumReason"
                                        class="radio-input"
                                    />
                                    <label :for="changeSerumReason.id">
                                        {{ changeSerumReason.label }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button
                            class="btn w-90 mx-auto mt-3 mb-1"
                            :class="[processing ? '' : 'btn-blue']"
                            :disabled="processing"
                            @click="saveChangeSerum"
                        >
                            <span v-if="processing" class="m-auto submit-btn">
                                変更内容を保存中
                            </span>
                            <span v-else class="m-auto submit-btn">
                                回答して{{ productTypeName }}変更を確定する
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}
.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
.modal-container {
    width: 90vw;
    margin: 0px auto;
    padding: 6.2vw 4.8vw;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    z-index: 9999999;
}
span.warning-txt {
    display: block;
    font-size: 1.6vw;
    text-align: center;
    padding: 1.8vw 0;
}
h3 {
    color: #484848;
    text-align: center;
    line-height: 8.8vw;
}
span.line {
    background: linear-gradient(transparent 60%, #ffede2 60%);
}
span.submit-btn {
    font-size: 3.8vw;
}
.radio-input {
    display: none;
}
.radio-input + label {
    padding-left: 20px;
    position: relative;
    margin-right: 20px;
}
.radio-input + label::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    border: 1px solid #999;
    border-radius: 50%;
}
.radio-input:checked + label::after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 3px;
    width: 2.4vw;
    height: 2.4vw;
    background: #ffaa8e;
    border-radius: 50%;
}
.modal-container-box {
    padding: 6.4vw 0 5vw 0;
}
.modal-container-box-input {
    padding: 3.2vw 2.1vw;
    z-index: 99999999;
}
.modal-container-box-input label {
    font-size: 3.8vw;
    color: #484848;
}
</style>
