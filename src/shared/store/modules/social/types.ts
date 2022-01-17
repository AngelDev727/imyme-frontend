export interface SocialState {
    instagramPictures: any[]
}

export interface ArticleText {
    authorV2: {
        name: string
    }
    name: string
    contentHtml: string
    image: ArticleNodeImage
    originalSrc: string
    publishedAt: string
    tags: string[]
    title: string
}

interface ArticleNodeImage {
    originalSrc: string
}
