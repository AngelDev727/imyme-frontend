<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Title from './components/Title.vue'

@Component({
    components: {
        Title,
    },
})
export default class App extends Vue {
    public name: string = 'App'
}
</script>

<template>
    <div id="app">
        <Title></Title>
    </div>
</template>
