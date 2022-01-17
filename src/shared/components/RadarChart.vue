<template>
    <div class="graph">
        <svg style="height:0;width:0;">
            <defs>
                <linearGradient
                    id="myLinearGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                    spreadMethod="pad"
                >
                    <stop offset="25%" stop-color="#fcb5af" stop-opacity="1" />
                    <stop offset="75%" stop-color="#fcb5af" stop-opacity="1" />
                </linearGradient>
            </defs>
        </svg>
        <svg class="graph-d" :class="radarChartContext" />
        <svg class="icon-stroke graph-i">
            <use xlink:href="#icon-graph" />
        </svg>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class RadarChart extends Vue {
    public name: string = 'RadarChart'

    @Prop({type: Number, default: 10}) readonly height!: number
    @Prop({type: Number, default: 10}) readonly width!: number
    @Prop({type: Number, default: 50}) readonly radius!: number
    @Prop({type: String, required: true}) readonly radarChartContext!: string
    @Prop({type: Array, required: true, default: [1, 2, 3, 4, 5]})
    readonly innerData!: number[]
    @Prop({type: Number, default: 0}) readonly radiusOffset!: number

    elHeight: number = 0
    elWidth: number = 0
    elRadius: number = 0

    mounted() {
        if (this.innerData) {
            this.elHeight = this.$el.clientHeight
            this.elWidth = this.$el.clientWidth
            this.elHeight < this.elWidth
                ? (this.elRadius = this.$el.clientHeight / 2.92)
                : (this.elRadius = this.$el.clientWidth / 2.92)

            this.determineRadarChartPoints(1, 1, this.innerData)

            this.$nextTick(() => {
                window.addEventListener('resize', this.resizeWithWindowSize)
            })
        }
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeWithWindowSize)
    }

    determineRadarChartPoints(h, w, data) {
        const chart = document.getElementsByClassName(this.radarChartContext)
        const total = data.length
        const points = data
            .map((stat, i) => {
                const point = this.valueToPoint(
                    5,
                    this.elRadius + this.radiusOffset,
                    stat,
                    i,
                    total,
                )
                return point.x + ',' + point.y
            })
            .join(' ')

        const points2: string[] = []
        const steps = 6
        for (let index = 0; index < steps; index++) {
            points2[index] = data
                .map((stat, i) => {
                    const point = this.valueToPoint(
                        5,
                        (this.elRadius / steps) * index,
                        stat,
                        i,
                        total,
                    )
                    return point.x + ',' + point.y
                })
                .join(' ')
        }

        const linePoints = Array(total)
            .fill(w / 2)
            .map((stat, i) => {
                const point = this.valueToPoint(h, w, stat, i, total)
                return point.x + ',' + point.y
            })
            .join(' ')

        chart[0].innerHTML = `

                                <g style="transform: translate(${this.elWidth /
                                    2}px,${this.elHeight /
            2}px) rotateZ(-36deg);">
                                    <polygon points="${points}" style="fill:#FCAEB5; stroke:none;">
                                        <animate attributeType="XML" attributeName="points" from="${linePoints}" to="${points}" dur="0.4s"></animate>
                                    </polygon>

                                    <polygon points="${
                                        points2[1]
                                    }" style="fill:#FCAEB5; stroke:none;">
                                        <animate attributeType="XML" attributeName="points" from="${linePoints}" to="${
            points2[1]
        }" dur="0.4s"></animate>
                                    </polygon>

                                    <polygon points="${
                                        points2[2]
                                    }" style="fill:#FCAEB5; stroke:none;">
                                        <animate attributeType="XML" attributeName="points" from="${linePoints}" to="${
            points2[2]
        }" dur="0.4s"></animate>
                                    </polygon>

                                    <polygon points="${
                                        points2[3]
                                    }" style="fill:#FCAEB5; stroke:none;">
                                        <animate attributeType="XML" attributeName="points" from="${linePoints}" to="${
            points2[3]
        }" dur="0.4s"></animate>
                                    </polygon>

                                    <polygon points="${
                                        points2[4]
                                    }" style="fill:#FCAEB5; stroke:none;">
                                        <animate attributeType="XML" attributeName="points" from="${linePoints}" to="${
            points2[4]
        }" dur="0.4s"></animate>
                                    </polygon>

                                    <polygon points="${
                                        points2[5]
                                    }" style="fill:#FCAEB5; stroke:none;">
                                        <animate attributeType="XML" attributeName="points" from="${linePoints}" to="${
            points2[5]
        }" dur="0.4s"></animate>
                                    </polygon>
                                </g>
                                `
    }
    valueToPoint(max, rad, value, index, total) {
        const maxV = max
        const maxR = rad
        const r = (maxR / maxV) * value
        const angle = ((Math.PI * 2) / total) * index + Math.PI / 2
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const tx = r * cos
        const ty = r * sin
        return {
            angle: angle,
            radius: r,
            x: tx,
            y: ty,
        }
    }
    resizeWithWindowSize() {
        this.elHeight = this.$el.clientHeight
        this.elWidth = this.$el.clientWidth
        this.elHeight < this.elWidth
            ? (this.elRadius = this.$el.clientHeight / 2.92)
            : (this.elRadius = this.$el.clientWidth / 2.92)

        this.determineRadarChartPoints(
            this.$el.clientHeight,
            this.$el.clientWidth,
            this.innerData,
        )
    }
}
</script>
