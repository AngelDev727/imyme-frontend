export interface ProductsState {
    products: any
    essence: any
    flow: Boolean
    productModal: string | null
    productTimer: object | null
}

interface Essence {
    allergy: Allergy
    allergy_id: string
    createdAt: string
    deviceId: number
    id: number
    image: string
    name: string
    name_en: string
    nozzle: number
    overview: string
    updatedAt: Date
}

interface Allergy {
    createdAt: Date
    id: string
    name: string
    updatedAt: Date
}
