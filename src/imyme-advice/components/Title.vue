<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import axios from 'axios'
// import setting from '../setting'

@Component
export default class Title extends Vue {
    public name: string = 'Title'
    @Prop()
    public dateSeasonText?: string
    public nameText?: string

    async created() {
        axios
            .get('http://shosmbp.local:9000/todo', {
                headers: {Authorization: 'Token ' + 'token'},
            })
            .then(response => {
                this.dateSeasonText = response.data.string
                this.nameText = response.data.string2
            })
    }
}
</script>

<template>
    <div>
        <p>{{ dateSeasonText }}</p>
        <p>{{ nameText }}</p>
    </div>
</template>
