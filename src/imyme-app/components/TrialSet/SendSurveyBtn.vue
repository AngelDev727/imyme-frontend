<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class SendSurveyBtn extends Vue {
    public name: string = 'SendSurveyBtn'

    surveyPath: Object = {
        name: 'survey',
        params: {
            question: 1,
            isTrial: true,
        }
    }
    width: number = 0

    mounted() {
        this.width = window.innerWidth
        window.addEventListener('resize', this.handleWidth)
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.handleWidth)
    }

    handleWidth() {
        this.width = window.innerWidth
    }
}
</script>

<template>
    <div v-if="width > 768" class="btn-counseling">
        <router-link :to="surveyPath">
            <img
                src="@app/assets/images/trialSet/btn-counseling.jpg"
                alt="オンラインカウンセリングで自分の肌に合うトライアルセットを探す"
            />
        </router-link>
    </div>
    <router-link v-else :to="surveyPath" class="btn">
        <span>オンライン肌カウンセリング</span><br />
        自分の肌に合うトライアルセットを見つける
    </router-link>
</template>

<style scoped>
.btn-counseling {
    margin: 0 auto;
    padding: 10px 0 40px;
    text-align: center;
    width: 700px;
}
.btn-counseling img {
    width: 100%;
}
.btn-counseling img:hover {
    opacity: 0.7;
    width: 100%;
}
.btn {
    background: #c6b78d;
    border-radius: 0.5rem;
    box-shadow: 0 5px 0 #c6b78d;
    -webkit-box-shadow: 0 5px 0 #c6b78d;
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: 2.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    line-height: 1.5;
    margin: 1rem auto;
    padding: 1rem;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    width: 80%;
}
.btn:hover {
    background: #c6b78d;
    box-shadow: 0 2px 0 #c6b78d;
    -webkit-box-shadow: 0 2px 0 #c6b78d;
    color: #fff;
    transform: translate(0, 3px);
    -webkit-transform: translate(0, 3px);
}
.btn span {
    background: #fff;
    border-radius: 4px;
    color: #c6b78d;
    display: inline-block;
    font-size: 2rem;
    margin-bottom: 0.5em;
    padding: 0.2rem 0.5rem;
    width: 90%;
}
</style>
