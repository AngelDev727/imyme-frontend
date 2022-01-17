export interface UserState {
    user: any
}

export interface User {
    addresses?: Edges
    defaultAddress?: Address
    displayName?: string
    email?: string
    firstName?: string
    id?: string
    lastName?: string
    phone?: string
}

interface Address {
    address1: string
    address2: string
    city: string
    company: null
    country: string
    countryCodeV2: string
    firstName: string
    id: string
    lastName: string
    name: string
    phone: string
    province: string
    provinceCode: string
    zip: string
}

interface Edges {
    edges: Array<Node>
}

interface Node {
    node: Address
}
