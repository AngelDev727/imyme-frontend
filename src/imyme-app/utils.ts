const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

interface ProductData {
    id: string
    product_id: string | null
    shopifyId: string
    price?: number
    discountPrice?: number
    type: string
    title: string
    image: string
    logo: string
}

interface ProductDataSubscription {
    id: string
    product_id: string | null
    price?: number
    type: string
    serum_type?: string
    title: string
    name: string
    image: string
    logo: string
    subscription_id: number
    next_charge_scheduled_at: string
    order_interval_frequency: number
    properties: Array<Property>
}

interface Property {
    name: string
    value: string
}

interface ProductDataOrderHistory {
    type: string
    title: string
    image: string
    logo: string
    ordered_at: string
    properties: any[]
    fulfillment_status: string
    fulfillments: any[]
}

interface LineItem {
    id: string
    product_id: string
    variant_id: string
    quantity: string
    properties: any[] | boolean
    price: string
    title: string
    type: string
    shopifyId: string
    discountPrice?: number
    discountTitle: string
    image: string
    logo: string
}

interface DiscountObject {
    price: number
    discountPrice: number
    discountTitle: string
}

export function decodeBase64Id(id: string): string {
    const decodedId = window.atob(id)
    const v_id = decodedId.split('/').reverse()[0]
    return v_id
}

export function formatPhoneNumber(number: number): string {
    try {
        const parsedNumber = phoneUtil.parseAndKeepRawInput(number, 'JP')
        return phoneUtil.format(parsedNumber, PNF.E164)
    } catch(e) {
        return e
    }
}

export function parsePhoneNumber(number: number): string {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(number, 'JP')
    return phoneUtil.format(parsedNumber, PNF.NATIONAL)
}

export function getDiscountedInfo(
    type: string,
    price: number,
    types?: string[],
): DiscountObject {
    if (type === 'one-time-proomtion') return {price: price, discountPrice: 0, discountTitle: `石けん無料`}
    if (type === 'brightening powder') return {price: price, discountPrice: +price * 0.9, discountTitle: `10%オフ`}
    if (type === 'total care set') return {price: price, discountPrice: price * 0.8, discountTitle: `20%オフ`}
    if (type == 'serum') {
        return {
            price: price,
            discountPrice: +price * 0.7,
            discountTitle: `セラム30%オフ`,
        }
    // } else if (types && !types.find(el => el == 'serum')) {
    //     return {
    //         price: price,
    //         discountPrice: +price * 0.7,
    //         discountTitle: `石けん30%オフ`,
    //     }
    } else {
        return {price: price, discountPrice: 0, discountTitle: `石けん無料`}
    }
}

export function filterProductData(
    product: any,
    cart: boolean = false,
): ProductData {
    const variant =
        product.variants && product.variants.edges
            ? product.variants.edges.find(({node}) => {
                  return node.availableForSale
              })
            : null
    const id: string = variant ? variant.node.id : null
    return {
        id: product.id,
        product_id: id,
        shopifyId: product.shopify_id,
        type: product.type,
        title: product.title,
        image: product.images.edges[0].node.originalSrc,
        logo: product.logo,
    }
}

export function filterProductDataSubscription(
    product: any,
): ProductDataSubscription {
    const variant =
        product.variants && product.variants.edges
            ? product.variants.edges.find(({node}) => {
                  return node.availableForSale
              })
            : null
    const id: string = variant ? variant.node.id : null
    return {
        id: product.id,
        product_id: id,
        price: product.priceRange.minVariantPrice.amount,
        type: product.type,
        serum_type: product.serumType,
        title: product.title,
        name: product.name,
        image: product.images.edges[0].node.originalSrc,
        logo: product.logo,
        subscription_id: product.subscription_id,
        next_charge_scheduled_at: product.next_charge_scheduled_at,
        order_interval_frequency: product.order_interval_frequency,
        properties: product.properties,
    }
}

export function filterProductDataOrderHistory(
    product: any,
): ProductDataOrderHistory {
    return {
        type: product.type,
        title: product.title,
        image: product.images.edges[0].node.originalSrc,
        logo: product.logo,
        ordered_at: product.ordered_at,
        properties: product.properties,
        fulfillment_status: product.fulfillment_status,
        fulfillments: product.fulfillments,
    }
}

export function getProductData(
    productId: string,
    cart: boolean = false,
): ProductData {
    const storageItem = sessionStorage.getItem(productId)
    const currentItem: string = storageItem !== null ? storageItem : '{}'
    return filterProductData(JSON.parse(currentItem), cart)
}

export function formatPrice(price: number): string {
    price = Math.floor(price)
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const oneTimePromotionItem = {
    id: 'f1c9f871-bf3d-440e-99de-4bfdc33370c0',
    name: '101',
}

export const limitedProductInfo = {
    '263a2364-0404-47a4-81b3-dd4435480151': {
        name: '4001',
        title: '真空低温抽出サクラセラム<br />抗酸化と保湿感がUP！',
        banner: '',
        discount: ''
    },
    'f2bf6132-0023-4af0-9fca-a36e49a4366a': {
        name: '4002',
        title: '季節のオススメを体験！<br />真空低温抽出サクラセラム&石けんトライアルセット',
        banner: 'sakura_serum_banner.png',
        discount: ''
    },
    '476883d8-aaf0-414a-8cd8-b9a4cc7acb22': {
        name: '5001',
        title: '200本限定！<br />真空低温抽出ローズセラム',
        banner: 'rose_serum_banner.png',
        discount: ''
    },
    '5603dae3-efab-4029-a24f-0c710a36e509': {
        name: '6001',
        title: '200本限定！<br />真空低温抽出シロキクラゲセラム',
        banner: 'tremella_fuciformis_serum_banner.png',
        discount: ''
    },
    '85ca5c8f-3b9e-4649-a231-ae1b051730e0': {
        name: '1101',
        title: '200本限定！<br />真空低温抽出リンゴエキスセラム',
        banner: 'apple_serum_banner.png',
        discount: ''
    },
    'c0ba32f2-9a22-43c0-be48-a4a621f4d5f7': {
        name: 'B01',
        title: 'ハリや透明感を実現する<br />"究極の美肌パウダー"',
        banner: '',
        discount: 'あり'
    },
    '0c7cb54d-6ca3-419c-a363-c010bacc6425': {
        name: '7001',
        title: '200本限定！<br />月桃セラムでハリ、ツヤ肌へ導く',
        banner: 'alpinia_serum_banner.png',
        discount: ''
    },
    '093f9cb8-2385-48c5-b61f-c7f82ec34fce': {
        name: '泡立てネット',
        title: '',
        banner: '',
        discount: ''
    },
}

export const limitedPromotionInfo = {
    'total care set': {
        id: '',
        title: 'トータルケアセット',
        type: 'total care set',
        price: 16060,
        discountPrice: 0,
        discountTitle: '',
        discountRate: 0.8,
        image: '/img/careimg.53430fe5.png',
        logo: '',
        product_id: '',
        shopifyId: '',
        items: [
            {
                id: 'c0ba32f2-9a22-43c0-be48-a4a621f4d5f7',
                name: 'B01'
            },
            {
                id: '093f9cb8-2385-48c5-b61f-c7f82ec34fce',
                name: '泡立てネット'
            }
        ]
    },
    'trial set': {
        id: '',
        title: 'トライアルセット',
        type: 'trial set',
        price: 1980,
        discountPrice: 0,
        discountTitle: '',
        discountRate: 0,
        image: '/img/trialset.a5f3d819.jpg',
        logo: '',
        product_id: '',
        properties: {
            promotion: "false"
        },
        shopifyId: '',
        items: [
            {
                id: '093f9cb8-2385-48c5-b61f-c7f82ec34fce',
                name: '泡立てネット'
            }
        ]
    }
}

export function getLimitedPromotionInfo(promotionName: string): {[key: string]: any} {
    return limitedPromotionInfo[promotionName]
}

export function getLimitedProductInfo(productId: string): {[key: string]: string} {
    return limitedProductInfo[productId]
}

export function canDisplayLimitedProductBanner(productId: string): boolean {
    const limitedProductInfo = getLimitedProductInfo(productId)
    return limitedProductInfo ? limitedProductInfo.banner ? true : false : false
}

export const productTypeName = {
    'serum': 'セラム',
    'skin lotion': 'セラム',
    'soap': '石けん',
    'cleansing oil': 'クレンジングオイル',
    'brightening powder': 'ブライトニングパウダー',
}

export function getProductTypeName(productType: string): string {
    return productTypeName[productType]
}

export const codInfo = {
    taxRate: 0.1,
    title: 'CT',
    financial_status: 'pending',
    tags: 'COD',
    country: 'Japan',
}

export function getCodFee(totalPrice: number, taxin: boolean): string {
    let codFee = 0
    totalPrice = taxin ? totalPrice : totalPrice * (1 + codInfo.taxRate)

    if (totalPrice < 10000) {
        codFee = 300
    } else if (10000 <= totalPrice && totalPrice < 30000) {
        codFee = 400
    } else if (30000 <= totalPrice && totalPrice < 100000) {
        codFee = 600
    } else if (100000 <= totalPrice && totalPrice < 300000) {
        codFee = 1000
    } else {
        codFee = 1000
    }
    return formatPrice(codFee)
}

export const hiddenEssenceIdList = {
    '14': {
        name: 'プロパンジオール',
    },
    '47': {
        name: 'クエン酸',
    },
    '64': {
        name: 'クエン酸Na',
    },
    '68': {
        name: '水',
    },
    '69': {
        name: 'BG',
    },
    '100': {
        name: 'BHT',
    },
    '101': {
        name: 'BHA',
    },
    '123': {
        name: 'PEG-60水添ヒマシ油',
    },
    '124': {
        name: '1,2－ヘキサンジオール',
    },
    '166': {
        name: '水酸化ナトリウム',
    },
    '191': {
        name: 'ペンチレングリコール',
    },
}

export function isVisibleEssence(essenceId: string|number): boolean {
    const hiddenEssence = hiddenEssenceIdList[essenceId]
    return hiddenEssence && hiddenEssence.name ? false : true
}

export const prefectures = {
	'北海道':  'Hokkaidō',
	'青森県':  'Aomori',
	'岩手県':  'Iwate',
	'秋田県':  'Akita',
	'宮城県':  'Miyagi',
	'山形県':  'Yamagata',
	'福島県':  'Fukushima',
	'茨城県':  'Ibaraki',
	'栃木県':  'Tochigi',
	'群馬県':  'Gunma',
	'埼玉県':  'Saitama',
	'千葉県':  'Chiba',
	'東京都':  'Tōkyō',
	'神奈川県': 'Kanagawa',
	'山梨県':  'Yamanashi',
	'長野県':  'Nagano',
	'新潟県':  'Niigata',
	'静岡県':  'Shizuoka',
	'愛知県':  'Aichi',
	'岐阜県':  'Gifu',
	'三重県':  'Mie',
	'富山県':  'Toyama',
	'石川県':  'Ishikawa',
	'福井県':  'Fukui',
	'京都府':  'Kyōto',
	'滋賀県':  'Shiga',
	'奈良県':  'Nara',
	'和歌山県': 'Wakayama',
	'大阪府':  'Ōsaka',
	'兵庫県':  'Hyōgo',
	'岡山県':  'Okayama',
	'広島県':  'Hiroshima',
	'山口県':  'Yamaguchi',
	'鳥取県':  'Tottori',
	'島根県':  'Shimane',
	'香川県':  'Kagawa',
	'徳島県':  'Tokushima',
	'高知県':  'Kōchi',
	'愛媛県':  'Ehime',
	'福岡県':  'Fukuoka',
	'佐賀県':  'Saga',
	'長崎県':  'Nagasaki',
	'大分県':  'Ōita',
	'熊本県':  'Kumamoto',
	'宮崎県':  'Miyazaki',
	'鹿児島県': 'Kagoshima',
	'沖縄県':  'Okinawa',
}

export function getRomajiPrefecture(kanjiPrefectures: string): string {
    return prefectures[kanjiPrefectures]
}
