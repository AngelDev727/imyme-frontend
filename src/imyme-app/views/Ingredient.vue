<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Footer from '@shared/components/Top/Footer.vue'

@Component({
    components: {
        Footer,
    },
})
export default class Ingredient extends Vue {
    public name: string = 'Ingredient'
}
</script>

<template>
    <div class="ingredient">
        <section id="ingredient-page">
            <div class="ingredient-page-title">
                <div class="message-container">
                    <div class="txt-box">
                        <img
                            src="@app/assets/images/ingredient/IngredientMessageTxt.png"
                        />
                        <h1>
                            imymeの主原材料は、植物生体水と植物オイル。<br />
                            低温真空抽出法で取り出しているから、<br />
                            植物の栄養を壊さず、良質な成分を肌に届けます。
                        </h1>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="ingredient-container">
                <div class="ingredient-txt-box">
                    <div class="ingredient-txt">
                        <h3>全成分中の90%以上が</h3>
                        <h2>植物生体水＋植物オイル</h2>
                        <p>
                            imymeのパーソナルセラムの成分には、
                            <span class="annotationcolor">高濃度</span>
                            の「植物生体水」「植物オイル」などの植物エキスが、水で薄めず、そのまま配合されています。<br />
                            水を配合しないことで、
                            <span class="annotationcolor">雑菌の増殖が抑制</span>
                            されるため、
                            <span class="annotationcolor">防腐剤や保存剤などの添加物</span>
                            を必要としません。<br />
                            そのため、肌へのストレスを軽減し、
                            <span class="annotationcolor">肌の常在菌を守り</span>
                            、育てます。<br /><br />
                            ただし、防腐剤などの添加物を配合していないため、
                            <span class="annotationcolor">使用期限以内に使い切っていただく</span>
                            ことが重要です。<br /><br />
                            いつでも
                            <span class="annotationcolor">新鮮な品質</span>
                            でお届けします。<br />
                        </p>
                        <div class="annotation">
                            ※
                            成分中に記載している「水」は、植物抽出のために使用されているものです。
                        </div>
                    </div>
                </div>
                <div class="ingredient-img-box">
                    <div class="ingredient-img">
                        <img
                            src="@app/assets/images/ingredient/reference.jpg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div id="product" class="container-ingredient">
                <h4>imymeのレシピ例</h4>
            </div>

            <div class="container-product">
                <div class="ingredient-product-img">
                    <img src="@app/assets/images/ingredient/product01.png" />
                </div>
                <div class="product-discription">
                    <h2>
                        日焼けによるダメージと肌あれを癒し、<br />
                        強くしなやかな美肌ヘ
                    </h2>
                    <p class="product-name">
                        <span class="bld">imymeセラム0102</span>
                        40ml 2本<br class="sp" />
                        / 7,480円（税込価格）
                    </p>
                    <p class="productdetail">
                        日焼けによるダメージや過敏さ、不調、肌あれが気になる肌のためのレシピです。ピュアで清々しいのに甘い芳香に溢れるダマスクローズ水をベー
                        スに、
                        色鮮やかなサジーオイルをブレンド。あえて界面活性剤を使用していないために自然に2層式になっているimymeならではのシンボリックなセラムです。<br /><br />

                        高い保湿力を誇るスイゼンジノリ多糖体と、トラブルヘのバリア機能を高める天然ヒト型セラミドを組み合わせ、乾燥や年齢が気になる肌をみずみずしくしっとりと潤します。<br />
                        さらに浸透型ビタミンC誘導体APPSにより肌のハリ・弾力をアップ。<br />
                        パルミトレイン酸を豊富に含むサジーオイルは日焼けや老化
                        によるダメージに働きかけ、つややかな透明肌へと導きます。
                    </p>

                    <div class="ingredient-detail-box">
                        <dl>
                            <dt>使用法</dt>
                            <dd>
                                2層成分をよく振って均一にしてから適量を手にとり顔全体になじませます。
                            </dd>
                        </dl>
                        <dl>
                            <dt>全成分</dt>
                            <dd>
                                ダマスクローズ花水 / アロエベラ液汁 /
                                ホホバ種子油 / 水 /
                                ポファエラムノイデス果実油（サジーオイル） /
                                プロパンジオール / ハチミツ /
                                スイゼンジノリ多糖体 / セラミドAP / セラミドNP /
                                パルチミン酸アスコルビルリン椴3Na /
                                リンゴ果実エキス / スクアラン / アルブチン /
                                シアノコバラミン / BG / PEG-60水添ヒマシ油 /
                                クエン酸 / クエン酸Na / 1、2ーヘキサンジオール /
                                カプリルヒドロキサム酸
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

            <div class="container-product">
                <div class="ingredient-product-img">
                    <img src="@app/assets/images/ingredient/product02.png" />
                </div>
                <div class="product-discription">
                    <h2>
                        色ムラや色素沈着が気になる大人の肌に、<br class="pc" />
                        透明感と艶をもたらす
                    </h2>
                    <p class="product-name">
                        <span class="bld">imymeセラム0503</span>
                        30ml 2本<br class="sp" />
                        / 6,820円（税込価格）
                    </p>
                    <p class="productdetail">
                        色ムラや色素沈着など肌色の悩みに加え、ハリのなさなどエイジングも気になる肌のためのレシピです。高原や寒い地方に生えているシラカバから摂取した樹液水のベースに浮かぶのは、黄金の一雫といわれるプリンセピアオイル。あえて界面活性剤を使用していないために自然に2層式になっているimymeらしさに溢れるセラムです。<br /><br />

                        若さの源と呼ばれる希少なプリンセピアオイルはオリーブオイルの35倍以上のビタミンEとオメガ3、
                        6、9脂肪酸なども豊富に含み、ハリ、弾力に溢れるグロウな美肌へと導きます。さらに浸透型ビタミンC誘導体APPS、ハトムギエキス、美白成分アルブチンにより色ムラや色素沈着をしっかりとケア。透明感に溢れる肌へと近づけます。保湿力にすぐれたヒト型セラミドやスイゼンジノリ、ハチミツなどにより乾燥した肌に吸いつくようなうるおいを与え、輝かせます。
                    </p>

                    <div class="ingredient-detail-box">
                        <dl>
                            <dt>使用法</dt>
                            <dd>
                                2層成分をよく振って均一にしてから適量を手にとり顔全体になじませます。
                            </dd>
                        </dl>
                        <dl>
                            <dt>全成分</dt>
                            <dd>
                                シラカバ樹液 / ダマスクローズ水 /
                                マカデミアナッツ油 / 水 / プリンセピアオイル /
                                プロパンジオール / ハチミツ /
                                スイゼンジノリ多糖体 / セラミドAP / セラミドNP /
                                パルチミン酸アスコルビルリン酸3Na / スクアラン /
                                アルブチン（メラニン抑制効果） /
                                ハトムギ種子エキス / キハダ樹皮エキス / クエン酸
                                / クエン酸Na / キサンタンガム / BG /
                                PEG-60水添ヒマシ油 / クエン酸 / クエン酸Na /
                                1、2-ヘキサンジオール / カプリルヒドロキサム酸
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div id="essence" class="container-ingredient">
                <h4>imymeの成分一例</h4>
            </div>
            <div class="container-lst">
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient01.jpg" />
                    <p class="ingredient-name">ダマスクローズ水</p>
                    <p class="ingredient-discription">
                        希少な品種ダマスクローズから低温真空抽出法でダマスクバラエキスを抽出。植物の細胞を壊さず長時間かけて抽出した、生命力あふれるローズの恵みで、ゆらぎやすい女性の肌を整えます。
                    </p>
                </div>
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient02.jpg" />
                    <p class="ingredient-name">アロエベラ水</p>
                    <p class="ingredient-discription">
                        葉肉にアミノ酸、ビタミン、ミネラル、ムコ多糖類、酵素類など抗酸化作用のある成分が多く、火傷や傷の治療にも用いられるアロエベラ。紫外線ダメージのケアをはじめ、バリア機能や保湿力を高めます。
                    </p>
                </div>
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient03.jpg" />
                    <p class="ingredient-name">ホホバ種子油</p>
                    <p class="ingredient-discription">
                        人間の皮脂とよく似た構造のため、肌なじみが良く、精油のキャリアオイルとして最も多く使用されています。
                        高い保湿効果があり、ビタミンB、E、ミネラル、アミノ酸を含み、肌をすこやかに整えます。
                    </p>
                </div>

                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient04.jpg" />
                    <p class="ingredient-name">サジーオイル</p>
                    <p class="ingredient-discription">
                        健康やアンチエイジングのための成分を190種類以上含むとされる、ヒッポファエの果実と種子から採取したオイル。ビタミン類やパルミトレイン酸が豊富で、高い保湿効果や美白効果、日焼けや老化による弱った肌をサポートするパワーを期待できます。
                    </p>
                </div>
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient05.jpg" />
                    <p class="ingredient-name">スイゼンジノリ多糖体</p>
                    <p class="ingredient-discription">
                        澄んだ湧き水がある九州の一部地域でのみ自生している希少なラン藻。江戸時代では高級食材として珍重されたほど。
                        保水力はヒアルロン酸の約5倍とも言われています。サラッとしているのにうるおいが続き、乾燥から肌を守ります。
                    </p>
                </div>
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient06.jpg" />
                    <p class="ingredient-name">リンゴ果実エキス</p>
                    <p class="ingredient-discription">
                        リンゴの果実から抽出精製したエキス。多くの糖類と多糖類、ソルビトールによる保湿効果、リンゴ酸やクエン酸によるピーリング効果、タンニンによる穏やかな収斂作用、フラボノイド類による抗酸化作用などが。やさしく効率よく健やかな肌に導きます。
                    </p>
                </div>

                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient07.jpg" />
                    <p class="ingredient-name">シラカバ樹液</p>
                    <p class="ingredient-discription">
                        白樺樹液には身体とお肌が必要としている様々な成分が含まれています。特にカルシウム、マグネシウム、カリウムなどはみずみずしいお肌に欠かせないミネラルが豊富に含まれています。肌の保湿成分の生成を促進させ、肌の潤い循環を呼び起こします。
                    </p>
                </div>
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient08.jpg" />
                    <p class="ingredient-name">マカダミアナッツ油</p>
                    <p class="ingredient-discription">
                        マカダミアの実を圧搾して得られる植物オイル。肌の保護成分で年齢とともに減少するオレイン酸、パルミトレイン酸などが豊富で、酸化安定性に優れ、心地よい感触が特長。うるおいとツヤを与え、なめらかで柔らかい肌に整えます。
                    </p>
                </div>
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient09.jpg" />
                    <p class="ingredient-name">プリンセピアオイル</p>
                    <p class="ingredient-discription">
                        人間の皮脂とよく似た構造のため、肌なじみが良く、精油のキャリアオイルとして最も多く使用されています。
                        高い保湿効果があり、ビタミンB、E、ミネラル、アミノ酸を含み、肌をすこやかに整えます。
                    </p>
                </div>

                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient10.jpg" />
                    <p class="ingredient-name">チャカテキン</p>
                    <p class="ingredient-discription">
                        チャノキの葉から得られたカテキン混合物で、抗酸化、コラーゲン保護、メラニン生成抑制、収れん効果に優れています。お茶に含まれるカテキン類は抗炎症作用でも知られ、肌にとっても日焼けによるダメージ、エイジングケア効果が期待されています。
                    </p>
                </div>
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient11.jpg" />
                    <p class="ingredient-name">ゼラニウム油</p>
                    <p class="ingredient-discription">
                        ニオイテンジクアオイの葉から抽出した精油。バラに似た華やかさと新芽のような爽やかさを併せ持つ香りは、女性の心身の安定をもたらします。抗菌・抗炎症作用が高く、古くから万能スキンケアウォーターとしても使われ、乾燥肌も脂性肌もバランスのよい肌へ。
                    </p>
                </div>
                <div class="container-lst-item">
                    <img src="@app/assets/images/ingredient/ingredient12.jpg" />
                    <p class="ingredient-name">セイヨウシロヤナギ樹皮エキス</p>
                    <p class="ingredient-discription">
                        セイヨウシロヤナギの樹皮から抽出した成分で、強い鎮痛作用があるサリシン、収れん作用があるタンニン類、強い抗酸化作用があるフラボノイド類などを含有。頑固な古い角質をやさしく取り去り、肌艶を整えながら、肌のターンオーバーをサポートします。
                    </p>
                </div>
            </div>
        </section>
        <Footer />
    </div>
</template>

<style scoped>
.ingredient {
    color: #111;
    margin: 0;
    font-family: '游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic', 'メイリオ',
        sans-serif;
}
h1 {
    color: #222;
    font-size: 2.56rem;
    font-weight: 700;
    letter-spacing: initial;
    margin: 0.83em 0;
    text-align: right;
    text-transform: none;
}
h2 {
    font-size: 2.72rem;
    font-weight: 700;
    line-height: 3.84rem;
    margin: 0.83em 0;
    text-align: left;
}
h3 {
    font-size: 1.92rem;
    font-weight: 700;
    line-height: 1.6rem;
    margin: 1em 0;
    text-align: left;
}
h4 {
    font-size: 2.24rem;
    font-weight: 700;
    line-height: 5.4rem;
    margin: 1.33em 0;
    text-align: center;
    text-transform: none;
}
p {
    margin: 1em 0;
}
section:not(:last-child) {
    background: #fff;
    margin: 0 auto;
    width: 100%;
}
.bld {
    font-weight: 700;
    margin-right: 2.08rem;
}
.annotation {
    color: #444;
    font-size: 1.28rem;
    line-height: 2.08rem;
    margin-bottom: 3.2rem;
}
.annotationcolor {
    color: #b38512;
    font-weight: 700;
}
.message-container {
    margin: 0 auto;
    overflow: hidden;
    padding: 150px 0 40px;
}
.txt-box {
    box-sizing: initial;
    float: right;
    padding-right: 200px;
    text-align: right;
    width: 50%;
}
.txt-box img {
    width: 50%;
}
#ingredient-page {
    margin: 0 auto;
}
.ingredient-page-title {
    background: url(../assets/images/ingredient/main_ingredientBG.jpg) no-repeat
        center;
    background-size: cover;
    padding: 100px 20px 110px;
}
.ingredient-container {
    margin: 0 auto;
    overflow: hidden;
    padding: 40px 0 0 0;
    width: 80%;
}
.ingredient-txt-box {
    float: left;
    width: 50%;
}
.ingredient-txt {
    margin-right: 3.2rem;
    text-align: left;
}
.ingredient-txt p {
    font-size: 1.6rem;
    line-height: 3.04rem;
}
.ingredient-img-box {
    float: left;
    text-align: right;
    width: 50%;
}
.ingredient-img {
    padding: 30px 0 0;
}
.ingredient-img img {
    width: 100%;
}
.container-ingredient {
    margin: 0 auto;
    width: 80%;
}
.container-product {
    background: linear-gradient(0deg, transparent 9px, #ccc 10px),
        linear-gradient(90deg, transparent 9px, #ccc 10px);
    background-size: 10px 10px;
    clear: both;
    margin: 3.2rem auto;
    max-width: 1024px;
    overflow: hidden;
    padding: 3.2rem;
    width: 95%;
}
.ingredient-product-img {
    float: left;
    margin-right: 50px;
}
.product-name {
    color: #444;
    font-size: 1.44rem;
    line-height: 3.84rem;
    margin: 1em 0;
}
.ingredient-product-img img {
    height: 500px;
}
.product-discription {
    float: left;
    width: 60%;
}
.productdetail {
    box-sizing: content-box;
    font-size: 1.52rem;
    line-height: 2.72rem;
    margin-left: 1.6rem;
    width: 100%;
}
.container-lst {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    width: 80%;
}
.container-lst:after {
    content: '';
    display: block;
    height: 0;
    width: 32%;
}
.container-lst-item {
    width: 32%;
}
.container-lst-item img {
    background: #3d9fb1;
    width: 100%;
}
.container-lst-item .ingredient-name {
    border-bottom: 1px solid #111;
    font-size: 1.92rem;
    font-weight: 700;
    padding: 0 0 1.6rem 0;
}
.ingredient-discription {
    font-size: 1.52rem;
    line-height: 2.88rem;
}
.ingredient-detail-box {
    color: #444;
    font-size: 1.328rem;
    line-height: 2.4rem;
}
.ingredient-detail-box dl {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
}
.ingredient-detail-box dt {
    background-color: #fff0cc;
    flex-basis: 15%;
    padding: 5px;
}
.ingredient-detail-box dd {
    background-color: #fff;
    flex-basis: 80%;
    padding: 5px;
}
@media screen and (max-width: 599px) {
    h1 {
        font-size: 1.92rem;
        text-align: left;
    }
    .message-container {
        padding-left: 200px;
    }
    .txt-box {
        padding-right: 40px;
        width: 80%;
    }
    .txt-box img {
        width: 80%;
    }
    .ingredient-page-title {
        margin: 0;
        padding: 0;
    }
}
@media only screen and (max-width: 479px) {
    .annotation {
        font-size: 1.6rem;
        line-height: 2.6rem;
        margin-bottom: 4rem;
    }
    .message-container {
        box-sizing: initial;
        margin: 0 auto;
        max-width: 80%;
        padding: 150px 0 40px 50px;
    }
    .message-container h1 {
        font-size: 2.4rem;
    }
    .txt-box {
        background: rgba(255, 255, 255, 0.3);
        padding: 2%;
        width: 100%;
    }
    .txt-box img {
        width: 100%;
    }
    .ingredient-page-title {
        background-position: left 15% bottom 5%;
    }
    .ingredient-container {
        width: 100%;
    }
    .ingredient-txt-box {
        float: none;
        margin: 0 auto;
        width: 90%;
    }
    .ingredient-txt {
        margin-right: 0;
        width: 100%;
    }
    .ingredient-txt h3 {
        font-size: 2.4rem;
        line-height: 2.4rem;
    }
    .ingredient-txt h2 {
        font-size: 3.4rem;
        line-height: 4.8rem;
    }
    .ingredient-txt p {
        font-size: 2rem;
        line-height: 3.8rem;
    }
    .ingredient-img-box {
        float: none;
        text-align: center;
        width: 100%;
    }
    .container-ingredient h4 {
        font-size: 2.4rem;
        letter-spacing: 2rem;
        line-height: 6rem;
    }
    .container-product {
        box-sizing: initial;
        clear: both;
        margin: 0 auto;
        max-width: 400px;
        width: 90%;
    }
    .ingredient-product-img {
        height: 250px;
        margin: 0 10px 0 auto;
        text-align: center;
    }
    .product-name {
        font-size: 1.8rem;
        line-height: 4rem;
        margin-bottom: 50px;
    }
    .ingredient-product-img img {
        height: 230px;
    }
    .product-discription {
        float: none;
        width: 100%;
    }
    .product-discription h2 {
        font-size: 1.9rem;
        line-height: 4rem;
    }
    .productdetail {
        box-sizing: content-box;
        clear: both;
        font-size: 1.9rem;
        line-height: 3.8rem;
        margin-left: 0;
    }
    .ingredient-detail-box dt,
    .ingredient-detail-box dd {
        font-size: 1.66rem;
        line-height: 3rem;
    }
    .container-lst {
        width: 90%;
    }
    .container-lst:after,
    .container-lst-item {
        width: 48%;
    }
    .container-lst-item .ingredient-name {
        font-size: 1.8rem;
        padding-bottom: 1rem;
    }
    .ingredient-discription {
        font-size: 1.6rem;
        line-height: 3rem;
    }
    .ingredient-detail-box {
        margin: 0;
        width: 100%;
    }
    .ingredient-detail-box dl {
        flex-flow: column;
    }
    .ingredient-detail-box dd {
        flex-basis: 100%;
        margin-inline-start: 0px;
    }
}
</style>
