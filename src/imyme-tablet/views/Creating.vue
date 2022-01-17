<template>
    <div class="creating">
        <svg class="icon-stroke icon-sm">
            <use xlink:href="#icon-tablet-drop" />
        </svg>
        <svg class="icon-stroke icon-sm">
            <use xlink:href="#icon-tablet-drop" />
        </svg>
        <svg class="icon-stroke icon-sm">
            <use xlink:href="#icon-tablet-drop" />
        </svg>
        <svg class="icon-stroke icon-sm">
            <use xlink:href="#icon-tablet-drop" />
        </svg>
        <svg class="icon-stroke icon-xl">
            <use xlink:href="#icon-logo" />
        </svg>
    </div>
</template>

<script>
import {clearInterval} from 'timers'
export default {
    name: 'Creating',

    data() {
        return {
            getOrderStatusTimer: 15000,
            checkOrderInterval: null,
        }
    },

    computed: {
        order() {
            return this.$route.params.id
        },
    },

    mounted() {
        if (!sessionStorage.getItem('orderStatusTimeout')) {
            sessionStorage.setItem('orderStatusTimeout', 40)
        }
        if (!sessionStorage.getItem('orderID') && this.order) {
            sessionStorage.setItem('orderID', this.order)
        }
        this.checkOrderInterval = window.setInterval(() => {
            this.getOrderStatus()
        }, this.getOrderStatusTimer)
    },

    methods: {
        redirect(redirectTo) {
            window.clearInterval(this.checkOrderInterval)
            sessionStorage.removeItem('orderStatusTimeout')
            sessionStorage.removeItem('orderID')
            this.$router.push({name: redirectTo})
        },
        getOrderStatus() {
            if (sessionStorage.getItem('orderID')) {
                const orderId = sessionStorage.getItem('orderID')
                this.$store
                    .dispatch('tablet/getOrderStatus', orderId)
                    .then(order => {
                        let timeout =
                            sessionStorage.getItem('orderStatusTimeout') - 1
                        sessionStorage.setItem('orderStatusTimeout', timeout)
                        if (timeout === 0) {
                            this.redirect('maintenance')
                        }
                        if (order.status === 'error') {
                            this.redirect('maintenance')
                        }
                        if (order.status === 'ready') {
                            this.redirect('completion')
                        }
                    })
            }
        },
    },
}
</script>
