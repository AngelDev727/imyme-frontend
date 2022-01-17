<template>
    <div class="answer--section-image">
        <div class="answers q-15 col-1 mt-2 answers-name">
            <div class="answer-icon">
                <img
                    src="@app/assets/images/product-icon.png"
                    alt="アイコンイメージ"
                    class="answer_iconImg"
                />
            </div>
            <div class="answer-content">
                <ul class="answer_name">
                    <li><p>Serum000</p></li>
                    <li>
                        <span class="input-container name">
                            <span class="answer_name_txt">to</span>
                            <input
                                v-model="nickname"
                                class="answer--input underline"
                                type="text"
                                required
                                :class="{'input-err': errors.nickname}"
                                placeholder="半角英数字で入力"
                                maxlength="10"
                            />
                        </span>
                    </li>
                    <li><p>imyme</p></li>
                </ul>
            </div>
        </div>
        <div :class="{'input-err': errors.nickname}" class="input-err-message">
            - {{ errors.nicknameMessage }}
        </div>
        <div class="question--question mt-1">
            <h5>生まれた年月は</h5>
        </div>
        <div class="answers q-15 col-2">
            <div class="input-container year">
                <div id="test-select-year" class="form--select underline">
                    <select
                        v-model="dobYear"
                        name="dob-year"
                        class="answer--input q-15"
                        required
                    >
                        <option
                            v-for="n in 100"
                            :key="2019 - n"
                            :value="(2019 - n).toString()"
                        >
                            {{ 2019 - n }}
                        </option>
                    </select>
                </div>
                <span class="moji q-15 mb-1 mr-1">
                    年
                </span>
            </div>
            <div class="input-container month">
                <div id="test-select-month" class="form--select underline">
                    <select
                        v-model="dobMonth"
                        name="dob-month"
                        class="answer--input q-15 m-1"
                        :class="{'input-err': errors.dobMonth}"
                        required
                    >
                        <option v-for="n in 12" :key="n" :value="n.toString()">
                            {{ n }}
                        </option>
                    </select>
                </div>
                <span class="moji q-15 mb-1 mr-1">
                    月
                </span>
            </div>
        </div>
        <div class="question--question mt-1">
            <h5>性別は</h5>
        </div>
        <div class="answers q-15-gender col-3">
            <input
                id="q20-a1"
                v-model="checkedAnswers"
                class="answer--checkbox"
                type="radio"
                value="MAN"
                required
                name="gender"
            />
            <label
                for="q20-a1"
                class="answer--answer flex-item-g ml-0"
                :class="{'input-err': errors.checkedAnswers}"
            >
                <span class="m-auto text-regular">
                    MAN
                </span>
            </label>
            <input
                id="q20-a2"
                v-model="checkedAnswers"
                class="answer--checkbox"
                type="radio"
                value="WOMAN"
                name="gender"
            />
            <label
                for="q20-a2"
                class="answer--answer flex-item-g"
                :class="{'input-err': errors.checkedAnswers}"
            >
                <span class="m-auto text-regular">
                    WOMAN
                </span>
            </label>
            <input
                id="q20-a3"
                v-model="checkedAnswers"
                class="answer--checkbox"
                type="radio"
                value="GENDER"
                name="gender"
            />
            <label
                for="q20-a3"
                class="answer--answer flex-item-g mr-0"
                :class="{'input-err': errors.checkedAnswers}"
            >
                <span class="m-auto text-regular">
                    GENDER
                </span>
            </label>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import {State, Action} from 'vuex-class'
import {SurveyState} from '@/shared/store/modules/survey/types'
import {User} from '@/shared/store/modules/user/types'

interface ErrorsObject {
    checkedAnswers: boolean
    nickname: boolean
    dobYear: boolean
    dobMonth: boolean
    nicknameMessage: string
}

@Component
export default class Question15 extends Vue {
    checkedAnswers: any[] = []
    nickname: string = ''
    dobYear: string = ''
    dobMonth: string = ''
    errors: ErrorsObject = {
        checkedAnswers: false,
        nickname: false,
        dobYear: false,
        dobMonth: false,
        nicknameMessage: '',
    }
    @State('survey') surveyState!: SurveyState
    @State(state => state.user.user) user!: User
    @Action('tablet/getCustomerByRemoteId') getCustomerByRemoteId

    get currentQuestion() {
        return this.$route.params.question
    }
    get survey() {
        return this.surveyState.survey_obj.selection
    }

    @Watch('checkedAnswers')
    onCheckedAnswersChanged() {
        this.checkErrors()
        if (
            !this.errors.checkedAnswers &&
            !this.errors.nickname &&
            !this.errors.dobMonth &&
            !this.errors.dobYear
        ) {
            this.$emit('update-answer', [
                this.checkedAnswers,
                this.nickname,
                this.dobYear,
                this.dobMonth,
            ])
        } else {
            this.$emit('update-answer', [])
        }
    }
    @Watch('dobYear')
    onDobYearChanged() {
        this.checkErrors()
        if (
            !this.errors.checkedAnswers &&
            !this.errors.nickname &&
            !this.errors.dobMonth &&
            !this.errors.dobYear
        ) {
            this.$emit('update-answer', [
                this.checkedAnswers,
                this.nickname,
                this.dobYear,
                this.dobMonth,
            ])
        } else {
            this.$emit('update-answer', [])
        }
    }
    @Watch('dobMonth')
    onDobMonthChanged() {
        this.checkErrors()
        if (
            !this.errors.checkedAnswers &&
            !this.errors.nickname &&
            !this.errors.dobMonth &&
            !this.errors.dobYear
        ) {
            this.$emit('update-answer', [
                this.checkedAnswers,
                this.nickname,
                this.dobYear,
                this.dobMonth,
            ])
        } else {
            this.$emit('update-answer', [])
        }
    }
    @Watch('nickname')
    onNocknameChanged() {
        this.checkErrors()
        if (
            !this.errors.checkedAnswers &&
            !this.errors.nickname &&
            !this.errors.dobMonth &&
            !this.errors.dobYear
        ) {
            this.$emit('update-answer', [
                this.checkedAnswers,
                this.nickname,
                this.dobYear,
                this.dobMonth,
            ])
        } else {
            this.$emit('update-answer', [])
        }
    }

    created() {
        if (this.survey[`q${this.currentQuestion}`]) {
            const q15Answers = this.survey[`q${this.currentQuestion}`]
            this.checkedAnswers = q15Answers[0]
            this.nickname = q15Answers[1]
            this.dobYear = q15Answers[2]
            this.dobMonth = q15Answers[3]
        } else {
            this.getCustomer()
        }
    }

    checkErrors() {
        const reg = new RegExp(/[!"#$%&'()*+\-.,/:;<=>?@[\\\]^_`{|}~]/g)
        if (this.checkedAnswers.length == 0) {
            this.errors.checkedAnswers = true
        } else {
            this.errors.checkedAnswers = false
        }
        if (this.nickname.length <= 1) {
            this.errors.nickname = true
            this.nickname.length <= 1
                ? (this.errors.nicknameMessage = 'at least 2 characters')
                : ''
        } else if (this.nickname.length > 10) {
            this.errors.nickname = true
            this.errors.nicknameMessage = 'within 10 characters'
        } else if (
            !/^[A-Za-z0-9]*$/.test(this.nickname)
        ) {
            this.errors.nickname = true
            this.errors.nicknameMessage = 'alphabet or number characters only'
        } else if (reg.test(this.nickname)) {
            this.errors.nickname = true
            this.errors.nicknameMessage = 'alphabet or number characters only'
        } else {
            this.errors.nickname = false
        }
        if (
            parseInt(this.dobYear) < 1900 ||
            parseInt(this.dobYear) > new Date().getFullYear()
        ) {
            this.errors.dobYear = true
        } else {
            this.errors.dobYear = false
        }
        if (parseInt(this.dobMonth) < 1 || parseInt(this.dobMonth) > 12) {
            this.errors.dobMonth = true
        } else {
            this.errors.dobMonth = false
        }
    }

    async getCustomer() {
        if (this.user && this.user.id) {
            const customer = await this.getCustomerByRemoteId(this.user.id)
            this.nickname = customer.name
        }
    }
}
</script>
<style>
.answer--section-image .answers .name {
    width: 90%;
    font-size: 0.8em;
    margin: 0;
    display: flex;
}
.answers q-15 col-1 {
    justify-content: flex-end;
}
.answer_iconImg {
    display: block;
    margin: 0 auto;
}
.answer-icon {
    display: block;
    margin: 1% auto 0 auto;
    width: 30%;
}
.answer-content {
    width: 70%;
}
.answers-name {
    border-radius: 8px;
}
ul.answer_name li {
    font-size: 1.4em;
    padding: 2%;
}
ul.answer_name li span.answer_name_txt {
    font-size: 2em;
    padding-right: 10px;
}
.answer--section-image .answers.q-15 {
    display: flex;
}
.answer_iconImg {
    width: 85%;
}
::placeholder {
    font-size: 0.5em;
}
@media only screen and (min-width: 414px) {
    .answer_iconImg {
        width: 70%;
    }

    .answers-name{
        border-radius: 8px;
    }
    ul.answer_name li{
        font-size: 1.4em;
        padding: 2%;
    }
    ul.answer_name li span.answer_name_txt{
        font-size: 2.0em;
        padding-right: 10px;
    }
    .answer--section-image .answers.q-15{
        display: flex;
    }
    .answer_iconImg{
        width: 85%;
    }
    .answer--section-image .answers.q-15-gender{
        height: 10%;
    }
    @media only screen and (min-width: 414px) {
        .answer_iconImg{
            width: 70%;
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1026px){
        .answer_iconImg{
            width: 60%;
            margin: 10% auto;
        }
    }
    h5{
        font-size: 1.2em;
    }
    @media only screen and (min-width: 75em) {
        html {
            font-size: 65%;
        }
    }
}
@media only screen and (min-width: 768px) and (max-width: 1026px) {
    .answer_iconImg {
        width: 60%;
        margin: 10% auto;
    }
}
</style>
