<template>
    <div id="app">
        <Icons />
        <NavBar v-if="currentRoot" />
        <error />
        <splash />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script>
import NavBar from '@tablet/components/NavBar'
import Icons from '@shared/components/Icons'
import Splash from '@shared/components/Splash'
import Error from '@shared/components/Error'

export default {
    name: 'App',

    components: {
        NavBar,
        Icons,
        Splash,
        Error,
    },

    computed: {
        survey() {
            return this.$store.state.survey.survey_obj
        },
        user() {
            return this.$store.state.user.user
        },
        answerId() {
            return this.$store.state.survey.answerId
        },
        currentRoot() {
            return !(this.$route.path == '/')
        },
    },

    watch: {
        survey() {
            sessionStorage.setItem('surveyAnswers', JSON.stringify(this.survey))
        },
        answerId() {
            sessionStorage.setItem('answerId', JSON.stringify(this.answerId))
        },
    },

    created() {
        this.$store.dispatch('user/getUser')
        if (sessionStorage.getItem('surveyAnswers')) {
            this.$store.commit(
                'survey/SET_SURVEY',
                JSON.parse(sessionStorage.getItem('surveyAnswers')),
            )
        }
        if (sessionStorage.getItem('answerId')) {
            this.$store.commit(
                'survey/SET_ANSWER_ID',
                JSON.parse(sessionStorage.getItem('answerId')),
            )
        }
    },
}
</script>
