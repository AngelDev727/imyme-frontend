<template>
    <nav v-scroll="handleScroll" class="navbar navbar__tablet">
        <router-link class="m-auto" :to="{name: 'home'}">
            <svg class="icon-fill icon-stroke navbar--logo__tablet">
                <use xlink:href="#icon-logo-and-name-hoz" />
            </svg>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',

    computed: {
        loading() {
            return this.$store.state.application.promises
        },
    },

    watch: {
        loading() {
            if (this.loading.length != 0)
                this.$store.dispatch('application/loadingPromiseStart')
        },
    },

    methods: {
        handleScroll: function(evt, el) {
            if (window.scrollY <= 20) {
                el.setAttribute(
                    'style',
                    'background-color: rgba(255,255,255,0);',
                )
            } else if (window.scrollY > 30) {
                el.setAttribute(
                    'style',
                    'background-color: rgba(255,255,255,1);',
                )
            }
        },
    },
}
</script>
