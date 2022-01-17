<template>
    <section id="whereIsLabo" class="text-center m-0 bg-body">
        <h1 id="labo" class="pt-5 pb-2 text-lowercase text-heading-regular">
            Where is LABO?
        </h1>
        <lazy-component>
            <img
                src="@app/assets/images/imyme_machine.jpg"
                alt="imyme location"
                style="width:100%"
                class="p-1"
            />
        </lazy-component>

        <transition
            duration="5000"
            :css="false"
            @enter="$enter"
            @after-enter="$afterEnter"
            @leave="$leave"
        >
            <div v-if="showMap" id="location" class="collapse-section">
                <div class="aspect-ratio aspect-ratio--16-9">
                    <LMap
                        style="height: 80%; width: 100%; filter: grayscale(1)"
                        :zoom="zoom"
                        :center="center"
                        @update:zoom="zoomUpdated"
                        @update:center="centerUpdated"
                        @update:bounds="boundsUpdated"
                    >
                        <LTileLayer :url="url" />
                        <LMarker
                            :lat-lng="markerLatLng"
                            :visible="true"
                            :icon="icon"
                        />
                    </LMap>
                </div>
                <div>
                    <span class="text-regular">
                        〒164-1234
                        <br />東京都港区北青山3-5-2
                    </span>
                </div>
            </div>
        </transition>

        <div
            id="location-icon"
            class="pb-5 collapse-icon arrow"
            :class="{cross: showMap}"
            @click="toggleMap"
        >
            <div class="bar" />
            <div class="bar" />
            <div class="bar" />
        </div>
    </section>
</template>

<script lang="ts">
import {LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet'
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {Vue, Component} from 'vue-property-decorator'

@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon,
    },
})
export default class LocationSection extends Vue {
    public name: string = 'LocationSection'

    zoom: number = 14
    showMap: boolean = false
    url: string = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    center: number[] = [35.6669997, 139.7068626]
    markerLatLng: number[] = [35.6669997, 139.7068626]
    bounds: any = null
    icon: any = new Icon({
        iconUrl: require('@app/assets/images/008_imyme-map-pin_64px.png'),
        iconSize: [32, 32],
        iconAnchor: [32, 32],
    })

    zoomUpdated(zoom) {
        this.zoom = zoom
    }
    centerUpdated(center) {
        this.center = center
    }
    boundsUpdated(bounds) {
        this.bounds = bounds
    }
    toggleMap() {
        this.showMap = !this.showMap
    }
}
</script>
