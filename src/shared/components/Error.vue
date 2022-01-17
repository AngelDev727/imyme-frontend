<template>
    <transition
        duration="5000"
        :css="false"
        @enter="$enter"
        @after-enter="$afterEnter"
        @leave="$leave"
    >
        <div v-if="error" class="error">
            <span class="error--message">{{ alternativeErrorMessage }}</span>
            <button
                v-if="alternativeErrorMessage == '郵便番号が間違っています'"
                class="btn btn-blue flex-center w-30 mr-1"
                @click="fixZip"
            >
                修正する
            </button>
            <button v-else class="error--dismiss-button" @click="dismissError">
                X
            </button>
        </div>
    </transition>
</template>

<script lang="ts">
import errorMessageDictionary from '@/shared/errorMessageDictionary'
import {clearAccessToken} from '@/shared/auth'
import {Vue, Component, Watch} from 'vue-property-decorator'
import {State, Mutation, Action} from 'vuex-class'
import {
    ApplicationState,
    ApplicationError,
} from '@/shared/store/modules/application/types'
import * as Sentry from '@sentry/browser'

@Component
export default class Error extends Vue {
    public name: string = 'Error'

    alternativeErrorMessage: string | null = null
    @State('application') application!: ApplicationState
    @Mutation('application/SET_ERROR_MESSAGE') SET_ERROR_MESSAGE
    @Action('resetState') resetState

    get error(): ApplicationError | null {
        return this.application.error
    }

    get redirectTo() {
        return this.$route.name
    }

    @Watch('error', {immediate: false})
    onErrorChange(val: any) {
        if (val) {
            const message = this.setMessage(val)

            if (errorMessageDictionary[message]) {
                this.alternativeErrorMessage = errorMessageDictionary[message]
            } else {
                this.alternativeErrorMessage =
                    errorMessageDictionary['catchAll']
            }

            setTimeout(() => {
                this.dismissError()
            }, 7000)
        }
    }

    setMessage(val) {
        let message
        //api errors
        if (val.error && val.error.response) {
            message =
                val.error.response.data.message ||
                val.error.response.data.detail
            const status = val.error.response.status

            if (status && status === 401) {
                clearAccessToken()
                sessionStorage.clear()
                this.resetState()
                this.$router.push({name: 'login'})
            }
            return message
        }

        if (Array.isArray(val.error)) {
            message = val.error[0].message
            return message
        }

        //shopify api errors
        if (typeof val.error === 'string') {
            message = val.error
            return message
        }

        //other errors
        if (val.error && val.error.message) {
            message = val.error.message
            return message
        }
        if (val.message) {
            message = val.message
            return message
        }
        //network errors
        // - network error
        if (val.error && val.error.response && !val.error.response.status) {
            message = 'there was a network error'
            return message
        }
        // - failed to fetch
        if (val == 'Failed to fetch') {
            message = 'there was a network error'
            return message
        }

        //Sentry log - print all unknown errors to Sentry
        if (!message) {
            //log to sentry
            Sentry.withScope(scope => {
                scope.setExtra('errorMessageObj', val)
                Sentry.captureException(val)
            })
        }
    }

    dismissError() {
        this.SET_ERROR_MESSAGE(null)
    }

    fixZip() {
        this.$router.push({
            name: 'edit-details',
            query: {next: this.redirectTo},
        })
        this.SET_ERROR_MESSAGE(null)
    }
}
</script>
