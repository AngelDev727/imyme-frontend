<template>
    <svg
        v-if="colors && colors.length > 0 && layout"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 32 32"
        xml:space="preserve"
    >
        <path
            :style="`fill: ${layout.fifth};`"
            d="M16.94249,24.69006c-.31979-.06519-.63268-.14183-.94249-.22362-.30981.08179-.6227.15843-.94249.22362a17.12709,17.12709,0,0,1-3.42637.34262,5.83649,5.83649,0,0,0,8.73772,0A17.12818,17.12818,0,0,1,16.94249,24.69006Z"
        />
        <path
            :style="`fill: ${layout.fourth_l};`"
            d="M15.05751,24.69006c.31979-.06519.63268-.14183.94249-.22362a15.53306,15.53306,0,0,1-5.97192-3.03206,6.65665,6.65665,0,0,0,1.60306,3.5983A17.12709,17.12709,0,0,0,15.05751,24.69006Z"
        />
        <path
            :style="`fill: ${layout.fourth_r};`"
            d="M16.94249,24.69006a17.12818,17.12818,0,0,0,3.42637.34262,6.65665,6.65665,0,0,0,1.60306-3.5983A15.53306,15.53306,0,0,1,16,24.46644C16.30981,24.54823,16.6227,24.62487,16.94249,24.69006Z"
        />
        <path
            :style="`fill: ${layout.third};`"
            d="M21.97192,21.43438c.00352-.0265.00764-.05278.01087-.07943a12.03619,12.03619,0,0,1-2.27436-.28933A11.80376,11.80376,0,0,1,16,19.53458a11.8023,11.8023,0,0,1-3.70843,1.531,12.0362,12.0362,0,0,1-2.27421.28933c.00308.02665.0072.05293.01072.07943A15.53306,15.53306,0,0,0,16,24.46644,15.53306,15.53306,0,0,0,21.97192,21.43438Z"
        />
        <path
            :style="`fill: ${layout.second_l};`"
            d="M16,19.53458a11.35936,11.35936,0,0,1-4.32848-4.99824,14.06212,14.06212,0,0,0-1.71627,5.88794,7.73231,7.73231,0,0,0,.06211.93067,12.0362,12.0362,0,0,0,2.27421-.28933A11.8023,11.8023,0,0,0,16,19.53458Z"
        />
        <path
            :style="`fill: ${layout.second_r};`"
            d="M16,19.53458a11.80376,11.80376,0,0,0,3.70843,1.531,12.03619,12.03619,0,0,0,2.27436.28933,7.76349,7.76349,0,0,0,.062-.93067,14.06089,14.06089,0,0,0-1.71627-5.88779A11.35942,11.35942,0,0,1,16,19.53458Z"
        />
        <path
            :style="`fill: ${layout.first};`"
            d="M16,19.53458a11.35942,11.35942,0,0,0,4.32848-4.99809c-1.57531-3.25267-3.745-6.5408-4.29339-9.50151a.03518.03518,0,0,0-.07033,0c-.54855,2.96063-2.71807,6.24876-4.29324,9.50136A11.35936,11.35936,0,0,0,16,19.53458Z"
        />
    </svg>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class IconColorDrop extends Vue {
    public name: string = 'IconColorDrop'

    @Prop({
        type: Array,
        default: () => [
            '#90c08c',
            '#dc9c91',
            '#d9e066',
            '#abb33b',
            '#e5b9bd',
            '#9a85b8',
            '#a19fcb',
        ],
    })
    colors!: string[]
    layout?: object = undefined

    created() {
        this.layoutColors(this.colors)
    }

    layoutColors(colors) {
        switch (colors.length) {
            case 1:
                this.layout = {
                    first: colors[0],
                    second_r: colors[0],
                    second_l: colors[0],
                    third: colors[0],
                    fourth_r: colors[0],
                    fourth_l: colors[0],
                    fifth: colors[0],
                }
                break
            case 2:
                this.layout = {
                    first: colors[0],
                    second_r: colors[1],
                    second_l: colors[1],
                    third: colors[0],
                    fourth_r: colors[1],
                    fourth_l: colors[1],
                    fifth: colors[0],
                }
                break
            case 3:
                this.layout = {
                    first: colors[0],
                    second_r: colors[1],
                    second_l: colors[1],
                    third: colors[2],
                    fourth_r: colors[0],
                    fourth_l: colors[0],
                    fifth: colors[2],
                }
                break
            case 4:
                this.layout = {
                    first: colors[0],
                    second_r: colors[1],
                    second_l: colors[3],
                    third: colors[2],
                    fourth_r: colors[1],
                    fourth_l: colors[3],
                    fifth: colors[2],
                }
                break
            case 5:
                this.layout = {
                    first: colors[0],
                    second_r: colors[1],
                    second_l: colors[1],
                    third: colors[2],
                    fourth_r: colors[3],
                    fourth_l: colors[3],
                    fifth: colors[4],
                }
                break
            case 6:
                this.layout = {
                    first: colors[0],
                    second_r: colors[2],
                    second_l: colors[1],
                    third: colors[3],
                    fourth_r: colors[4],
                    fourth_l: colors[4],
                    fifth: colors[5],
                }
                break
            case 7:
                this.layout = {
                    first: colors[0],
                    second_r: colors[2],
                    second_l: colors[1],
                    third: colors[3],
                    fourth_l: colors[5],
                    fourth_r: colors[4],
                    fifth: colors[6],
                }
                break
            default:
                console.error('invalid number of colors')
        }
    }
}
</script>
