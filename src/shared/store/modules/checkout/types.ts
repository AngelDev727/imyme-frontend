export interface CheckoutState {
    checkout: any | null
    subscriptionChecked: boolean
    userSubscriptions: any[]
    message: string | null
    mockDiscount: string | null
    shippingAddress: string | null
    rechargeDiscount: string | null
    stripePaymentToken: StripePaymentToken | null
    rechargeObject: any
    promotion: boolean
    purchaseCount: PurchaseCount | null
    ordersHistory: OrderHistoryInfo[]
    ordersDiscounted: boolean
    ordersHistoryBoundaryDate: string | null
    userCodSubscriptions: CodProduct[]
    orderCycle: string | null
    paymentMethod: string | null
    discountCode: DiscountCode | null
}

export interface StripePaymentToken {
    id: string
}

export interface Checkout {
    applied_discount: null
    billing_address: null
    buyer_accepts_marketing: boolean
    completed_at: null
    created_at: Date
    discount_code: null
    email: string
    external_checkout_id: null
    external_checkout_source: null
    line_items: Array<LineItem>
    note: null
    note_attributes: null
    payment_processor: null
    payment_processor_customer_id: null
    payment_processor_transaction_id: null
    phone: null
    requires_shipping: boolean
    shipping_address: ShippingAddress | null
    shipping_line: null
    shipping_rate: null
    subtotal_price: string
    tax_lines: Array<TaxLine>
    taxes_included: boolean
    token: string
    total_price: string
    total_tax: string
    updated_at: string | Date
}

interface LineItem {
    charge_interval_frequency: null
    cutoff_day_of_month: null
    cutoff_day_of_week: null
    expire_after_specific_number_of_charges: null
    fulfillment_service: string
    grams: number
    image: string
    line_price: string
    order_day_of_month: null
    order_day_of_week: null
    order_interval_frequency: null
    order_interval_unit: null
    order_interval_unit_type: null
    original_price: string
    price: string
    product_id: number
    properties: {
        promotion: string
    }
    quantity: number
    recurring_price: null
    requires_shipping: boolean
    sku: string
    taxable: boolean
    title: string
    variant_id: number
    variant_title: string
    vendor: string
}

interface TaxLine {
    price: string
    rate: string
    title: string
}

interface ShippingAddress {
    address1: string
    address2: string
    city: string
    company: null
    country: string
    first_name: string
    last_name: string
    phone: string
    province: string
    zip: string
}

interface PurchaseCount {
    count: number
}

export interface OrderHistoryInfo {
    line_items: OrderHistoryLineItem[]
    fulfillments: OrderHistoryFulfillment[]
    created_at: string
    cancelled_at: string
}

interface OrderHistoryLineItem {
    title: string
    quantity: number
    product_id: number
    name: string
    properties: OrderHistoryLineItemProperty[]
    price: string
    fulfillment_status: string
}

export interface OrderHistoryFulfillment {
    status: string
    created_at: string
    updated_at: string
}

export interface OrderHistoryLineItemProperty {
    name: string
    value: string
}

export interface CodProduct {
    ID: string
    ItemProductID: number
    ItemVariantID: number
    ItemQuantity: number
    NextOrderDate: string
    OrderCycle: string
    IsExpired: boolean
}

export interface DiscountCode {
    code: string
    discountType: string
    value: number
    oncePerCustomer: boolean
}
