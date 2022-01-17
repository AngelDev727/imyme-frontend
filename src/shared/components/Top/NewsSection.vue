<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action} from 'vuex-class'
import dayjs from 'dayjs'

@Component
export default class NewsSection extends Vue {
    public name: string = 'NewsSection'

    newsPosts: any[] | null = null
    @Action('social/getBlogPosts') getBlogPosts

    created() {
        this.getPosts()
    }

    async getPosts() {
        const posts = await this.getBlogPosts({
            blogHandle: 'ニュース',
        })
        this.newsPosts = posts.reverse()
    }

    formatDate(date) {
        return dayjs(date).format('YYYY.MM.DD')
    }
}
</script>

<template>
    <section class="text-center m-0">
        <h2 id="news" class="text-uppercase">
            news & infomation
            <p class="sub-title">お知らせ</p>
        </h2>
        <div class="notion-container">
            <div v-for="(article, i) in newsPosts" :key="`title-${i}`">
                <span>
                    {{ formatDate(article.node.publishedAt) }}
                </span>
                <p>
                    {{ article.node.title }}
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.notion-container {
    margin: 0 auto;
    width: fit-content;
}
.notion-container > div {
    display: flex;
}
.notion-container > div > * {
    display: inline-block;
    text-align: left;
}
.notion-container span {
    float: left;
    line-height: 25px;
    margin-left: 20px;
    width: 100px;
}
.notion-container p {
    width: calc(100% - 100px);
}
</style>
