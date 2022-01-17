<template>
    <div class="product-wrap">
        <div class="fltlft">
            <img
                src="@app/assets/images/trialSet/productimg01.jpg"
                alt="パーソナライズセラム一例"
            />
        </div>
        <div class="fltrt">
            <h4>
                オンライン肌カウンセリングで回答された結果から、<br class="pc" />
                ひとりひとりに合う成分とレシピでおつくりする、4 in 1
                スキンケア。
            </h4>
            <p>
                植物成分90%（植物生体水、植物オイル）＋サイエンス成分を、肌悩みに合わせて処方します。<br />
                トライアルセットでお届けするのは、全顔用の1本。<br />
                2週間、しっかりとご自身のお肌でご体感ください。
            </p>
            <div class="square-wrap">
                <h5>
                    セット内容
                </h5>
                <ul class="square-wrap_txt">
                    <li>
                        パーソナライズセラム 全顔用 1本
                    </li>
                    <li>
                        ミニサイズ洗顔ソープ 9g
                    </li>
                    <li>
                        泡立てネット 1枚
                    </li>
                </ul>
            </div>

            <div class="trialcaution">
                通常サイズのご注文時<br />
                2種類のパーソナライズセラムが届く場合がございます。<br />
                Tゾーンは脂っぽく、頬は乾燥するなどの肌の部位によって状態が異なるにはそれぞれの部位ごとに適した成分とレシピが処方され、2種類のパーソナライズセラムを1本ずつお届けします。<br />
                それ以外の肌タイプの方には、1種類のパーソナライズセラムを2本お届けします。<br />
                ※ トライアルセットの場合は、全顔用1本をお届けします。
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-wrap {
    font-size: 16px;
    margin: 0 auto;
    overflow: hidden;
    width: fit-content;
}
.product-wrap .fltlft {
    float: left;
    margin-right: 10px;
}
.product-wrap .fltlft img {
    width: 500px;
}
.product-wrap .fltrt {
    float: left;
    max-width: 600px;
    width: calc(100% - 510px);
}
.product-wrap h4 {
    font-size: 1em;
    font-weight: bold;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    text-transform: none;
}
.product-wrap p {
    font-size: 1em;
    line-height: normal;
    margin-block-start: 1em;
    margin-block-end: 1em;
}
.square-wrap {
    margin: 10px auto;
    overflow: hidden;
    width: auto;
}
.square-wrap h5 {
    font-size: 0.83em;
    font-weight: bold;
    margin-block-start: 0em;
    margin-block-end: 0em;
    padding: 10px 0;
    text-align: left;
}
.square-wrap_txt {
    line-height: 1.4rem;
    list-style: disc;
    margin: 0px auto 10px;
    padding-inline-start: 40px;
}
.square-wrap_txt li {
    line-height: 1.4em;
}
.trialcaution {
    padding: 1em;
    font-size: 0.8em;
    background: #fff;
}
@media only screen and (max-width: 768px) {
    .product-wrap {
        width: 100%;
        min-width: 350px;
        margin: 2rem auto;
    }
    .product-wrap .fltlft {
        float: none;
        margin: 0 auto;
    }
    .product-wrap .fltlft img {
        width: 100%;
        margin: 0 auto;
    }
    .product-wrap .fltrt {
        float: none;
        width: 95%;
        margin: 0 auto;
    }
    .product-wrap .fltrt h4 {
        width: 95%;
        font-size: 1em;
        margin: 10px auto;
    }
    .product-wrap .fltrt p {
        width: 95%;
        font-size: 0.9em;
        margin: 0 auto 10px auto;
    }
    .square-wrap {
        width: auto;
        margin: 10px;
        padding: 0.5em;
        overflow: hidden;
        min-width: 350px;
    }
    .square-wrap h5 {
        text-align: center;
    }
    .square-wrap_txt {
        margin: 0px auto 5px;
        padding: 5px 0;
        width: 90%;
    }
    .trialcaution {
        padding: 1em;
        font-size: 0.8em;
        background: #fff;
    }
}
</style>
