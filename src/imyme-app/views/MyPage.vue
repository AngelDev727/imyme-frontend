<template>
    <div id="my-page" class="cart max-page-w">
        <div class="roseserum">
            <div class="roseserum-wrapper">
                <div class="roseserum-title">
                    <h3>沖縄で愛される月桃で素肌美人</h3>
                    <p>
                        季節の変わり目に敏感になりやすい肌にオススメ！真空低温で抽出した月桃の純度の高い成分をふんだんに使い、ダメージを受けやすい肌にハリとツヤもたらします。
                    </p>
                    <p><span>※全肌タイプの方にご利用いただけます。</span></p>
                    <p>
                        <router-link
                            :to="{
                                name: 'product',
                                query: {
                                    id: '0c7cb54d-6ca3-419c-a363-c010bacc6425',
                                },
                                params: $route.params
                            }"
                            class="roseBtn"
                            >詳細はこちら >>>
                        </router-link>
                    </p>
                </div>
                <div class="roseserum-img">
                    <img
                        src="@app/assets/images/shellginger.png"
                        alt="月桃セラム"
                        class="kikurageImg"
                    />
                </div>
            </div>
        </div>
        <MyTotalHistory />
        <MySubscription />
        <AddressDisplay
            v-if="user && user.defaultAddress"
            :user="user"
            :address="user.defaultAddress"
        >
            <router-link
                :to="{name: 'edit-details'}"
                class="edit--button"
                tag="button"
            >
                <svg class="icon-stroke icon-btn">
                    <use xlink:href="#icon-return" />
                </svg>
                編集
            </router-link>
        </AddressDisplay>
        <MyPaymentMethod />
        <MyOrderHistory />
        <MyPageActions />
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {User} from '@/shared/store/modules/user/types'
import MyTotalHistory from '@app/components/MyPage/MyTotalHistory.vue'
import MySubscription from '@app/components/MyPage/MySubscription.vue'
import AddressDisplay from '@app/components/AddressDisplay.vue'
import MyPaymentMethod from '@app/components/MyPage/MyPaymentMethod.vue'
import MyPageActions from '@app/components/MyPage/MyPageActions.vue'
import MyOrderHistory from '@app/components/MyPage/MyOrderHistory.vue'
// import {clearAccessToken} from '@/shared/auth'

@Component({
    components: {
        AddressDisplay,
        MyPageActions,
        MyTotalHistory,
        MySubscription,
        MyPaymentMethod,
        MyOrderHistory,
    },
})
export default class MyPage extends Vue {
    public name: string = 'MyPage'

    @State(state => state.user.user) user!: User
    async mounted() {
        const {
            params: {override = false},
        } = this.$route
        const sessionAnswerId = sessionStorage.getItem('answerId')
        if (!override) {
            if (!sessionAnswerId || sessionAnswerId === 'null') {
                this.$router.push({
                    name: 'top',
                    params: {override: true.toString()},
                })
            }
        }
    }
}
</script>
<style scoped>
.roseserum-title h3 {
    font-size: 4.8vw;
    color: #e67f90;
    font-weight: bold;
    padding-bottom: 1.2vw;
    padding-top: 2.1vw;
}
.roseserum-title h3:before,
.roseserum-title h3:after {
    position: absolute;
    display: inline-block;
    content: '';
    top: 8vw;
    width: 6vw;
    height: 2px;
    background-color: #e67f90;
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg);
}
.roseserum-title h3:before {
    left: 2vw;
}
.roseserum-title h3:after {
    right: 16vw;
    -webkit-transform: rotate(-60deg);
    transform: rotate(-60deg);
}
.roseserum-title p span {
    font-size: 2.6vw;
    font-weight: 500;
}
.roseserum {
    background-color: #fef7f6;
    padding: 3.2vw 4.8vw;
    position: relative;
    margin-bottom: 3.2vw;
}
.roseserum::before {
    background: repeating-linear-gradient(
        -45deg,
        #e67f90,
        #e67f90 5px,
        #f3b5bf 0,
        #f3b5bf 10px
    ); /* ストライプ */
    content: '';
    height: 2vw;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
}
.roseserum::after {
    background: repeating-linear-gradient(
        -45deg,
        #e67f90,
        #e67f90 5px,
        #f3b5bf 0,
        #f3b5bf 10px
    ); /* ストライプ */
    content: '';
    height: 2vw;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
.roseserum-title {
    margin: 0 auto;
}
.roseserum-title p {
    color: #4f4f4f;
    font-size: 3vw;
    font-weight: bold;
    letter-spacing: 0.1em;
    line-height: 3.8vw;
}
.kikurageImg {
    width: 14vw;
    height: auto;
}
.roseserum-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
}
.roseBtn {
    width: 60vw;
    background-color: #e67f90;
    padding: 1vw 2.1vw;
    border-radius: 20vw;
    display: block;
    margin: 1.2vw auto 0 auto;
}
.roseserum-title p a.roseBtn {
    color: #ffffff;
    text-align: center;
}
</style>
