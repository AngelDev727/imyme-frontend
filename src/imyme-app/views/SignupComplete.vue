<template>
    <section class="pb-2">
        <h1 class="bg-social py-1">
            Signup Complete
        </h1>
        <div class="p-2">
            <p class="text-center pb-2">
                We sent an email to you, confirm your account by clicking on the
                link in the email
            </p>
            <div class="flex-row flex-center">
                <router-link class="btn w-70" :to="{name: 'top'}">
                    <svg class="icon-stroke icon-btn">
                        <use xlink:href="#icon-next" />
                    </svg>
                    <span class="m-auto">
                        Home
                    </span>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class SignupComplete extends Vue {
    public name: string = 'SignupComplete'
}
</script>
