<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class Breadcrumbs extends Vue {
    public name: string = 'Breadcrumbs'

    @Prop({type: Array, default: () => []}) breadcrumbs
}
</script>

<template>
    <div v-if="breadcrumbs.length > 0" class="breadcrumbs-container">
        <ul class="breadcrumbs">
            <li v-for="(breadcrum, i) in breadcrumbs" :key="i">
                <router-link v-if="breadcrum.path" :to="breadcrum.path">
                    {{ breadcrum.text }}
                </router-link>
                <span v-else>
                    {{ breadcrum.text }}
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.breadcrumbs-container {
    margin: 1em auto;
    padding: 0em 15em;
    color: #111;
    max-width: 1400px;
    width: auto;
    font-size: 1rem;
}
.breadcrumbs-container a {
    text-decoration: none;
    color: #333;
}
.breadcrumbs-container .breadcrumbs {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
.breadcrumbs-container li {
    display: inline-block;
    position: relative;
    padding-right: calc(16px + 8px);
    margin-right: 8px;
    color: #333;
}
.breadcrumbs-container li::before {
    content: "›";
    width: 1em;
    height: 1em;
    line-height: 1em;
    text-align: center;
    font-size: 1em;
    color: inherit;
    position: absolute;
    top: 50%;
    right: 0;
    -webkit-transform: translateY(-60%);
    transform: translateY(-60%);
}
.breadcrumbs-container li:last-child {
    margin-right: 0;
    padding-right: 0;
    color: #111;
}
.breadcrumbs-container li:last-child::before {
    content: normal;
}
@media only screen and (max-width: 750px) {
    .breadcrumbs-container {
        margin: 0.5em auto;
        padding: 0;
        color: #111;
        width: auto;
        font-size: 1.6rem;
    }
    .breadcrumbs-container ul{
        padding-inline-start: 10px;
        padding-inline-end: 10px;
    }
}
</style>
