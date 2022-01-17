<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class ChangeSerumThanks extends Vue {
    public name: string = 'ChangeSerumThanks'
}
</script>

<template>
    <div>
        <div class="max-page-w serumchange">
            <h3>ありがとうございます。<br />処方の変更を承りました。</h3>
            <div class="changeserum-after">
                <h4>
                    お届け準備をしております。<br />次回注文日までしばらく<br />お待ちください。
                </h4>
                <img
                    src="@app/assets/images/change/delivery-truck-color.svg"
                    alt="キャンペーンタイトル"
                    class="thanksImg"
                />
            </div>
            <router-link
                class="btn btn-gray-waku w-90 mx-auto m-3 p-1"
                :to="{name: 'mypage'}"
            >
                <span class="m-auto">マイページに戻る</span>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.btn-gray {
    font-size: 4.2vw;
}
.serumchange {
    margin-top: 24vw;
}
.serumchange h3 {
    letter-spacing: 0.2em;
    padding: 1.4vw 0;
}
.serumchange h4 {
    letter-spacing: 0.2em;
    padding: 1.4vw 0;
    font-size: 2em;
}
p.next-order-date {
    font-size: 5vw;
    letter-spacing: 0.2em;
    color: #333;
    font-weight: bold;
}
.thanksImg {
    width: 30vw;
    display: block;
    margin: 0 auto;
}
.changeserum-before-wrapper {
    background-color: #ffffff;
}
.changeserum-after {
    background-color: #f1f4f5;
    padding: 4.8vw 8.2vw;
    width: 95vw;
    margin: 3.2vw auto;
}
</style>
