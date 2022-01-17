<template>
    <div class="brand">
        <div class="story-wrap">
            <h2>
                <img src="@app/assets/images/trialSet/img01.jpg" alt="" />
            </h2>
            <h3>
                imymeを選ぶ理由
            </h3>
            <p>
                <!-- eslint-disable -->
                imymeのパーソナライズセラムの主原材料は、植物生体水と植物オイル。<br />
                水をほとんど使用せず※1 、ひとりひとりの肌悩みや食生活、生活習慣に合わせてお作りします。<br />
                製造過程で植物抽出目的以外に、原材料として水を使用しないため、雑菌繁殖抑制に使用する 防腐剤や保存料を加える必要がありません。<br />
                これにより、 皮膚常在菌を守り つつ、植物本来のちからを、肌に摂り入れ ※2 キメの整った健康な素肌を育てることができるのです。<br />
                ※1 水は植物抽出のために使われているものです。<br />
                ※2 角質層まで
                <!-- eslint-enable -->
            </p>
        </div>
        <div class="free-wrap">
            <h3>
                8つの不使用
            </h3>
            <p>
                肌本来の機能を最大限に活かすために、常在菌のバランスを崩す成分は一切使用しません。
            </p>
            <div class="free-wrap-container">
                <div class="free-wrap4-item-bl">合成防腐剤</div>
                <div class="free-wrap4-item-bl">石油由来合成界面活性剤</div>
                <div class="free-wrap4-item-bl">エタノール</div>
                <div class="free-wrap4-item-bl">合成色素</div>
                <div class="free-wrap4-item-bl">シリコン</div>
                <div class="free-wrap4-item-bl">合成ポリマー</div>
                <div class="free-wrap4-item-bl">乳化剤</div>
                <div class="free-wrap4-item-bl">グリセリン</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.brand {
    font-size: 16px;
}
h2 {
    font-size: 1.5em;
    margin-block-end: 0.83em;
    margin-block-start: 0.83em;
}
h3 {
    font-size: 1.2em;
    font-weight: bold;
    margin-block-end: 0em;
    margin-block-start: 0em;
    text-align: center;
    text-transform: none;
}
.story-wrap {
    margin: 0 auto;
}
.story-wrap img {
    width: 100%;
}
.story-wrap p {
    font-size: 0.9em;
    line-height: 2em;
    margin: 0 auto;
    text-align: center;
    width: 80%;
}
.free-wrap {
    margin: 0 auto;
    background: #efefef;
    padding: 10px;
    margin: 20px auto;
}
.free-wrap p {
    font-size: 1em;
    line-height: normal;
    margin: 0 auto 10px;
    text-align: center;
}
.free-wrap-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.free-wrap4-item-bl {
    margin: 0px auto 10px;
    padding: 20px 10px;
    width: 22%;
    background-color: #aaa;
    color: #fff;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    .story-wrap {
        width: 100%;
        margin: 2em auto;
    }
    .story-wrap img {
        width: 100%;
    }
    .story-wrap p {
        font-size: 0.87em;
        line-height: 2.07em;
        text-align: left;
        width: 80%;
        margin: 0 auto;
    }
    .free-wrap {
        width: 95%;
        margin: 1em auto 3em;
        background: #efefef;
        padding: 20px 10px;
    }
    .free-wrap p {
        width: 80%;
        margin: 0 auto 10px;
        text-align: center;
        font-size: 0.87em;
    }
}

@media not all and (min-width: 1200px) {
    .free-wrap4-item-bl {
        width: 90%;
        margin: 0px auto 10px;
        padding: 10px;
    }
}
</style>
