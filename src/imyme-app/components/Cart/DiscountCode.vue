<script lang="ts">
import {Vue, Component, Prop, Watch, Ref} from 'vue-property-decorator'
import {State, Action, Mutation, Getter} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import {
    getDiscountedInfo,
    getLimitedPromotionInfo,
    formatPrice,
} from '@/imyme-app/utils'

@Component
export default class DiscountCode extends Vue {
    public name: string = 'DiscountCode'

    @Prop({type: Boolean, default: true}) operable!: boolean
    @Prop({type: Boolean, default: false}) selectedTotalCareSet!: boolean
    @State(state => state.user.user) user!: User
    @State(state => state.checkout.rechargeObject) rechargeObject!: any
    @Action('checkout/createRechargeCheckout') createRechargeCheckout
    @Action('checkout/fetchDiscountCode') fetchDiscountCode
    @Action('checkout/getCodAppliedDiscount') getCodAppliedDiscount
    @Mutation('checkout/SET_RECHARGE_OBJECT') setRechargeObject
    @Mutation('checkout/SET_DISCOUNT_CODE') setDiscountCode
    @Getter('checkout/getRechargeObjectTypes') getRechargeObjectTypes
    @Getter('checkout/isOneTimePromotion') isOneTimePromotion
    @Getter('checkout/getCheckout') getCheckout
    @Getter('checkout/getDiscountCode') getDiscountCode
    @Getter('checkout/isAppliedDiscount') isAppliedDiscount
    @Getter('checkout/getPromotionIsInCart') getPromotionIsInCart
    @Ref('discountCode') readonly discountCode!: HTMLElement

    inputDiscountCode: string = ''
    invalidDiscountCode: boolean = false
    appliedDiscount: boolean = false
    processing: boolean = false

    get isDiscountCodeNotInput() {
        return !this.inputDiscountCode
    }
    get discountPrice() {
        return this.isAppliedDiscount
            ? this.getCheckout.applied_discount.amount
            : 0
    }

    async created() {
        if (this.isAppliedDiscount && this.getDiscountCode) {
            this.setInputDiscountCode()
            this.applyDiscount()
        }
    }
    @Watch('selectedTotalCareSet')
    async onSelectedTotalCareSetChanged() {
        if (
            this.selectedTotalCareSet &&
            this.isAppliedDiscount &&
            this.getDiscountCode
        ) {
            await this.removeDiscount()
            this.showInvalidDiscountCode()
        } else if (this.invalidDiscountCode) {
            this.invalidDiscountCode = !this.invalidDiscountCode
        }
    }
    @Watch('rechargeObject.line_items')
    async onLineItemsChanged() {
        if (this.isAppliedDiscount && this.getDiscountCode) {
            this.setInputDiscountCode()
            this.applyDiscount()
        }
    }
    @Watch('inputDiscountCode')
    onInputDiscountCodeChanged() {
        if (this.invalidDiscountCode) {
            this.invalidDiscountCode = !this.invalidDiscountCode
        }
    }
    @Watch('getDiscountCode')
    async deleteDiscountCode(val) {
        if (val && (val.code === 'serum' || val.code === 'soap')) {
            await this.removeDiscount()
        }
    }
    async lineItems() {
        const lineItems = await Promise.all(
            this.rechargeObject.line_items
                .filter(({type}) => !getLimitedPromotionInfo(type))
                .map(async item => {
                    const {discountPrice} = getDiscountedInfo(
                        this.isOneTimePromotion
                            ? 'one-time-proomtion'
                            : item.type,
                        item.price,
                        this.getRechargeObjectTypes,
                    )

                    if (item.properties.promotion === 'true') {
                        return {
                            variant_id: item.variant_id,
                            quantity: item.quantity,
                            properties: item.properties,
                            price: discountPrice,
                        }
                    } else {
                        return {
                            variant_id: item.variant_id,
                            quantity: item.quantity,
                            properties: item.properties || {
                                promotion: 'false',
                            },
                            price: item.price,
                        }
                    }
                }),
        )
        return lineItems
    }
    async applyDiscount() {
        this.startProcessing()

        if (this.selectedTotalCareSet) {
            this.showInvalidDiscountCode()
            this.endProcessing()
            return
        }

        const checkoutInfo = {
            rechargeObject: {
                email: this.user ? this.user.email : undefined,
                line_items: await this.lineItems(),
                discount_code: this.inputDiscountCode
                    ? this.inputDiscountCode
                    : null,
            },
            showErrors: false,
        }
        await this.createRechargeCheckout(checkoutInfo)

        if (this.isAppliedDiscount) {
            const codAppliedDiscountInfo = {
                userId: this.user ? this.user.id : undefined,
                code: this.inputDiscountCode ? this.inputDiscountCode : null,
            }
            const codOrderAppliedDiscount = await this.getCodAppliedDiscount(
                codAppliedDiscountInfo,
            )

            await this.fetchDiscountCode(this.inputDiscountCode)

            if (
                codOrderAppliedDiscount &&
                this.getDiscountCode &&
                this.getDiscountCode.oncePerCustomer
            ) {
                // Already used a discount code that can only be used once
                await this.invalidateDiscount()
                this.showInvalidDiscountCode()
            } else {
                if (this.getPromotionIsInCart) {
                    this.removePromotion()
                }
                this.invalidDiscountCode = false
                this.toggleToDisplayAppliedDiscount()
            }
        } else {
            this.showInvalidDiscountCode()
        }

        this.endProcessing()
    }
    async invalidateDiscount() {
        const checkoutInfo = {
            rechargeObject: {
                email: this.user ? this.user.email : undefined,
                line_items: await this.lineItems(),
                discount_code: null,
            },
            showErrors: false,
        }
        await this.createRechargeCheckout(checkoutInfo)

        this.setDiscountCode(null)
    }
    async removeDiscount() {
        await this.invalidateDiscount()
        this.inputDiscountCode = ''
        this.invalidDiscountCode = false
        this.appliedDiscount = false
    }
    removePromotion() {
        const {line_items} = this.rechargeObject
        const lineItems: any[] = []
        line_items.forEach(item => {
            if (item.properties.promotion === 'true') {
                lineItems.push({
                    ...item,
                    properties: {promotion: 'false'},
                })
            } else {
                lineItems.push({...item})
            }
        })

        const rechargeObject = {
            ...this.rechargeObject,
            line_items: lineItems,
        }
        this.setRechargeObject(rechargeObject)
    }
    setInputDiscountCode() {
        this.inputDiscountCode = this.getDiscountCode.code
    }
    toggleToDisplayAppliedDiscount() {
        this.appliedDiscount = true
    }
    showInvalidDiscountCode() {
        this.invalidDiscountCode = true
        this.focusInputDiscountCode()
    }
    focusInputDiscountCode() {
        this.discountCode.focus()
    }
    formatPrice(price) {
        return formatPrice(price)
    }
    startProcessing() {
        this.processing = true
    }
    endProcessing() {
        this.processing = false
    }
}
</script>

<template>
    <div v-if="appliedDiscount">
        <div class="discount">
            <span class="text" role="heading">
                <span class="dli-check" />
                {{ inputDiscountCode }}
                <span
                    v-if="operable"
                    class="dli-close"
                    @click="removeDiscount"
                />
            </span>
            <span class="discount-price">
                <span> - ¥{{ formatPrice(discountPrice) }} </span>
            </span>
        </div>
    </div>
    <div v-else>
        <template v-if="operable">
            <div class="flex">
                <input
                    id="discount-code"
                    ref="discountCode"
                    v-model="inputDiscountCode"
                    class="discount-code"
                    type="text"
                    placeholder="ギフトコード"
                    :class="{'code-error': invalidDiscountCode}"
                />
                <button
                    v-if="processing"
                    class="btn-discount-code active"
                    disabled="disabled"
                >
                    適用中
                </button>
                <button
                    v-else
                    class="btn-discount-code"
                    :disabled="isDiscountCodeNotInput"
                    :class="[isDiscountCodeNotInput ? 'disabled' : 'active']"
                    @click="applyDiscount"
                >
                    適用
                </button>
            </div>
            <p
                v-if="invalidDiscountCode && !processing"
                class="code-error-message"
            >
                ご入力いただいたギフトコードは有効ではありません。適用条件をご確認ください。
            </p>
        </template>
    </div>
</template>

<style scoped>
button {
    margin-top: 0vw;
}
.flex {
    display: flex;
}
.discount-code {
    border: 0;
    width: 100%;
    height: 5rem;
    padding: 1rem;
    color: #787878;
    letter-spacing: 0.2rem;
    font-size: 1.5em;
    border-radius: 5px;
}
.discount-code:focus {
    border: 2px solid #1878b9;
    outline: none;
}
.discount-code::placeholder {
    color: #bdbdbd;
}
.code-error {
    border: 2px solid #d41a19;
}
.code-error:focus {
    border: 2px solid #d41a19;
}
.btn-discount-code {
    width: 10rem;
    height: 5rem;
    border-radius: 5px;
    margin-left: 0.8em;
}
.active {
    background-color: #1878b9;
    color: #fff;
}
.disabled {
    background-color: #ccc;
}
.code-error-message {
    padding: 0 1rem;
    color: #d41a19;
}
.discount {
    position: relative;
    padding: 1rem 2rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.discount .text {
    font-size: 2em;
    color: #1878b9;
}
.discount > .discount-price {
    font-size: 2.5em;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #1878b9;
}
.dli-close {
    display: inline-block;
    vertical-align: middle;
    color: #000;
    line-height: 1;
    width: 1em;
    height: 0.2em;
    background: currentColor;
    border-radius: 0.1em;
    position: relative;
    transform: rotate(45deg);
}
.dli-close::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    transform: rotate(90deg);
}
.dli-check {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    width: 1em;
    height: 0.45em;
    border: 0.1em solid currentColor;
    border-top: 0;
    border-right: 0;
    box-sizing: border-box;
    transform: translateY(-25%) rotate(-45deg);
}
</style>
