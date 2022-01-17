<template>
    <transition-group
        ref="slotElement"
        tag="div"
        name="staggered-fade"
        @before-appear="beforeAppear"
        @appear="appear"
    >
        <slot />
    </transition-group>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class StaggeredTransition extends Vue {
    public name: string = 'StaggeredTransition'

    @Prop({type: Number, required: false, default: 150})
    readonly stagger!: number

    beforeAppear(el: HTMLElement): void {
        el.classList.add('staggered-fade')
    }

    appear(el: HTMLElement, done: Function): void {
        const delay = el.parentNode
            ? Array.from(el.parentNode.children).indexOf(el) * this.stagger
            : 0
        el.style.transitionDelay = `${delay}ms`
        el.style.animationDelay = `${delay + 300}ms;`
        done()
    }
}
</script>
