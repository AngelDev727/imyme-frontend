<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {getProductTypeName} from '@/imyme-app/utils'
import ChangeSerumDetail from '@app/components/ChangeSerum/ChangeSerumDetail.vue'
import ChangeSerumModal from '@app/components/ChangeSerum/ChangeSerumModal.vue'
import {Results} from '@/shared/store/modules/survey/types'
import {Action, State} from 'vuex-class'

@Component({
    components: {
        ChangeSerumDetail,
        ChangeSerumModal,
    },
})
export default class SerumChange extends Vue {
    public name: string = 'SerumChange'

    @State(state => state.survey.results) results!: Results | null
    @Action('products/getProductInfo') getProductInfo

    showModal = false
    product: any = []
    changeFlg: any = false
    beforeItemList: any = []
    afterItemList: any = []
    afterProductInfoList: any[] = []
    paymentMethod: string = ''

    get recommendations() {
        return this.results ? this.results.recommends : null
    }

    created() {
        this.product = this.$route.params.product
        this.changeFlg = this.$route.params.change_flg
        this.paymentMethod = this.$route.params.paymentMethod
        if (!this.changeFlg) {
            this.$router.push({
                name: 'mypage',
            })
        } else {
            this.setItemIdList()
            this.setAfterProductInfoList()
        }
    }

    setItemIdList() {
        this.beforeItemList = this.product.map(item => {
            return {
                id: item.id,
                serum_type: item.serum_type,
            }
        })

        if (this.recommendations) {
            const recommends =
                this.product[0].type === 'serum'
                    ? this.recommendations.serum
                    : this.recommendations.soap
            this.afterItemList = recommends.map(item => {
                return {
                    id: item.id,
                    serum_type: item.type,
                }
            })
        }
    }

    async setAfterProductInfoList() {
        for (const item of this.afterItemList) {
            let productInfo = ''
            const storageItem = sessionStorage.getItem(item.id)
            if (!storageItem) {
                productInfo = await this.getProductInfo(item.id)
            } else {
                productInfo = JSON.parse(storageItem)
            }

            this.afterProductInfoList.push(productInfo)
        }
    }

    formatSchedule(next_charge_date) {
        const picked = next_charge_date.match(/^\d{4}-\d{2}-\d{2}/)
        return picked ? picked[0].replace(/-/g, '.') : '---'
    }

    openModal() {
        this.showModal = true
    }

    closeModal() {
        this.showModal = false
    }

    get isAvailable() {
        let available = true
        for (const afterProductInfo of this.afterProductInfoList) {
            available = afterProductInfo.variants.edges.find(({node}) => {
                return node.availableForSale
            })
            if (!available) {
                return available
            }
        }
        return available
    }

    get productTypeName() {
        return getProductTypeName(this.product[0].type)
    }
}
</script>

<template>
    <div>
        <div v-if="changeFlg">
            <div class="max-page-w serumchange">
                <h3>次回のお届けを<br />新しい処方に変更いたします。</h3>
                <p>
                    <span class="warning-txt">
                        ※変更前と変更後の{{ productTypeName }}をご確認ください。
                    </span>
                </p>
                <div class="changeserum-before">
                    <h3>変更前</h3>
                </div>
                <ChangeSerumDetail
                    :product-list="beforeItemList"
                    :is-before-item="true"
                />
                <div class="triangle-content">
                    <div class="triangle"></div>
                    <div class="triangle"></div>
                </div>
                <div class="changeserum-after">
                    <h3>変更後</h3>
                </div>
                <ChangeSerumDetail
                    :product-list="afterItemList"
                    :is-before-item="false"
                />
                <div
                    v-if="isAvailable"
                    class="btn btn-gray w-90 mx-auto m-3 p-1"
                    @click="openModal"
                >
                    <span class="m-auto">
                        次回注文{{ productTypeName }}を変更する
                    </span>
                </div>
                <div v-else class="btn btn-gray w-60 mx-auto m-3 p-1">
                    <span class="m-auto">在庫切れ</span>
                </div>
                <div class="next-order pb-1">
                    <div class="next-order-waku">
                        <p>次回注文日は</p>
                        <p class="next-order-date">
                            {{
                                formatSchedule(
                                    product[0].next_charge_scheduled_at,
                                )
                            }}
                        </p>
                        <p>です。お待ちください。</p>
                    </div>
                </div>
            </div>
        </div>
        <ChangeSerumModal
            v-if="showModal"
            :subscription-id-list="product.map(item => item.subscription_id)"
            :before-item-id-list="beforeItemList.map(item => item.id)"
            :after-item-id-list="afterItemList.map(item => item.id)"
            :type="product[0].type"
            :payment-method="paymentMethod"
            @close="closeModal"
        />
    </div>
</template>

<style scoped>
.btn-gray {
    font-size: 4.2vw;
}
.next-order-waku {
    background-color: #f1f4f5;
    width: 90vw;
    padding: 3.2vw;
    margin: 3.2vw auto;
    text-align: center;
}
p.next-order-date {
    font-size: 5vw;
    letter-spacing: 0.2em;
    color: #333;
    font-weight: bold;
}
.serumchange {
    margin-top: 24vw;
}
.serumchange h3 {
    letter-spacing: 0.2em;
    padding: 1.4vw 0;
}
.changeserum-before,
.changeserum-after {
    background-color: #f1f4f5;
    width: calc(100% - 4rem);
    margin: 3.2vw auto;
}
.triangle-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4.8vw 0 0 0;
}
.triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid #f1f4f5;
    padding: 2.8vw 0;
}
span.warning-txt {
    display: block;
    font-size: 1.6vw;
    text-align: center;
}
</style>
