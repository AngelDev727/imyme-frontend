<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class Video extends Vue {
    public name: string = 'Video'
}
</script>

<template>
    <div class="m-1">
        <div class="aspect-ratio aspect-ratio--16-9">
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Dao1cmrGJu4?modestbranding=1&showinfo=0&controls=0"
            />
        </div>
    </div>
</template>
