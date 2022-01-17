<template>
    <section v-if="pictures && pictures.length > 0" class="m-0 pb-3 pt-5">
        <h3
            id="imyme"
            class="py-3 text-lowercase text-heading-small text-underlined link"
        >
            <a
                href="https://www.instagram.com/explore/tags/imyme/"
                target="_blank"
            >
                #imyme
            </a>
        </h3>
        <div class="text-center mx-3 social-images-container">
            <img
                v-for="(picture, index) in pictures"
                :key="picture"
                v-lazy="picture"
                class="insta-pic essence-fade-in link"
                :class="'insta-pic' + (index - pictures.length)"
            />
        </div>
    </section>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {State, Action} from 'vuex-class'
import {SocialState} from '@/shared/store/modules/social/types'

@Component
export default class SocialSection extends Vue {
    public name: string = 'SocialSection'
    @State('social') social!: SocialState
    @Action('social/getInstagramPictures') getInstagramPictures

    get pictures(): any[] {
        return this.social.instagramPictures
    }

    created() {
        this.getInstagramPictures()
    }
}
</script>
