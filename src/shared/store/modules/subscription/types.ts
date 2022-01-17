export interface SubscriptionState {
    subscription: any
    beforeCheckoutSerums: Array<Serum> | null
    beforeCheckoutSkinCode: string | null
}

export interface Serum {
    name: string,
    type: string
}
