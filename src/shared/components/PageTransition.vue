<template>
    <transition
        :name="transitionName"
        :mode="transitionMode"
        :enter-active-class="transitionEnterActiveClass"
        @beforeLeave="beforeLeave"
    >
        <!-- @afterEnter="afterEnter" -->
        <!-- @enter="enter" -->
        <slot />
    </transition>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Action} from 'vuex-class'

@Component
export default class PageTransition extends Vue {
    public name: string = 'PageTransition'

    @Prop({type: Boolean, required: false, default: false}) showSplash!: boolean
    @Prop({type: String, required: false, default: 'fade'}) tName!:
        | string
        | null
    @Prop({type: String, required: false, default: 'out-in'}) mode!:
        | string
        | null
    transitionName: string | null = ''
    transitionMode: string | null = this.mode
    transitionEnterActiveClass: string | null = ''
    @Action('application/loadingPromiseAdd') loadingPromiseAdd

    created() {
        this.$router.beforeEach((to, from, next) => {
            let transitionName =
                to.meta.transitionName || from.meta.transitionName || this.tName

            if (transitionName === 'slide') {
                const toPath = to.path.split('/')
                const fromPath = from.path.split('/')

                transitionName =
                    parseInt(toPath[toPath.length - 1]) <
                    parseInt(fromPath[fromPath.length - 1])
                        ? 'slide-right'
                        : 'slide-left'
            }

            this.transitionEnterActiveClass = `${transitionName}-enter-active`

            if (to.meta.transitionName === 'zoom') {
                this.transitionMode = 'in-out'
                this.transitionEnterActiveClass = 'zoom-enter-active'
                document.body.style.overflow = 'hidden'
            }

            if (from.meta.transitionName === 'zoom') {
                this.transitionMode = null
                this.transitionEnterActiveClass = null
                document.body.style.overflow = ''
            }

            this.transitionName = transitionName

            next()
        })
    }

    beforeLeave(element) {
        if (this.showSplash) {
            const p = new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, 500)
            })
            this.loadingPromiseAdd([p])
        }
    }
}
</script>
