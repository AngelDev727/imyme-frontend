<template>
    <div class="complete">
        <div class="icon-fit-container">
            <svg class="icon-stroke icon-stroke-thin">
                <use xlink:href="#icon-tablet-completion" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Completion',

    mounted() {
        this.clearData()
    },

    methods: {
        clearData() {
            sessionStorage.clear()
            localStorage.clear()
            this.$store.dispatch('resetState')
        },
    },
}
</script>
