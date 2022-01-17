<template>
    <div>
        <div v-if="flow" class="essence-backdrop" @click.self="closeModal"/>
        <transition name="pop" mode="out-in">
            <div v-if="flow" class="flow-modal px-2 py-2">
                <div class="flow-cross collapse-icon cross" @click="closeModal">
                    <div class="bar"/>
                    <div class="bar"/>
                    <div class="bar"/>
                </div>
                <div class="name-section">
                    <section id="flow" class="text-center m-0">
                        <div class="flow-text-flex mb-2">
                            <svg class="icon-stroke icon-stroke-bold">
                                <use xlink:href="#icon-flow"/>
                            </svg>
                            <span class="text-heading-small">
                                購入までの流れ
                            </span>
                        </div>
                        <div class="how-to-section-box">
                            <div class="how-to-section-container">
                                <div class="p-3 bg-body">
                                    <div class="step-header"><span class="step-number mr-3">
                                    1
                                </span><span class="text-regular text-left"><div class="text-small">
                                        スマホから15個の診断に答えて、
                                    </div><div class="text-small">
                                        あなたの名前を入力して登録。
                                    </div></span>
                                        <svg class="how-to-icon">
                                            <use xlink:href="#icon-survey"></use>
                                        </svg>
                                    </div>
                                    <div class="arrow-down"></div>
                                </div>
                                <div class="p-3 bg-body">
                                    <div class="step-header"><span class="step-number mr-3">
                                    2
                                </span><span class="text-regular text-left"><div class="text-small">
                                        分析結果から、あなたにぴったりの
                                    </div><div class="text-small">
                                        セラムをつくります。
                                    </div></span>
                                        <div class="how-to-icon">
                                            <img class="how-to-bottle-icon" src="@signage/assets/images/icon/imyme_vender_4_icon.png">
                                        </div>
                                    </div>
                                    <div class="arrow-down"></div>
                                </div>
                                <div class="p-3 bg-body">
                                    <div class="step-header"><span class="step-number mr-3">
                                    3
                                </span><span class="text-regular text-left"><div class="text-small">
                                        注文後製造致します。
                                    </div><div class="text-small">
                                        7-10日後にフレッシュなコスメを
                                    </div><div class="text-small">
                                        お届けします。
                                    </div></span>
                                        <svg class="how-to-icon">
                                            <use xlink:href="#icon-delivery"></use>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="how-to-section-qr">
                                <qrcode :value="qrCodeUrl" :options="{ width: 400 }"></qrcode>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import VueQrcode from '@chenfengyuan/vue-qrcode';

    Vue.component(VueQrcode.name, VueQrcode);

    const storeCode: string | undefined = process.env.VUE_APP_STORE_KEY;
    const qrCodeUrl = "https://imyme.jp?storeCode=" + storeCode;

    @Component({
        data() {
            return {
                xPos: 0,
                sectionWidth: 0,
                qrCodeUrl: qrCodeUrl
            }
        },
        computed: {
            flow() {
                return this.$store.state.products.flow;
            },
        },
    })

    export default class FlowModal extends Vue {
        closeModal() {
            this.$store.state.products.flow = false;
        }
    }
</script>
