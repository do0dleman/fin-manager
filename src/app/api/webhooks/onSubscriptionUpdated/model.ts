export interface OnSubscriptionUpdatedEvent {
  meta: Meta
  data: Data
}

export interface Meta {
  event_name: string
}
export interface Data {
  type: string
  id: string
  attributes: Attributes
  relationships: Relationships
  links: Links9
}

export interface Attributes {
  store_id: number
  customer_id: number
  order_id: number
  order_item_id: number
  product_id: number
  variant_id: number
  product_name: string
  variant_name: string
  user_name: string
  user_email: string
  status: "on_trial" | "active" | "paused" | "past_due" | "unpaid" | "cancelled" | "expired"
  status_formatted: string
  card_brand: string
  card_last_four: string
  pause: unknown
  cancelled: boolean
  trial_ends_at: string
  billing_anchor: number
  first_subscription_item: FirstSubscriptionItem
  urls: Urls
  renews_at: string
  ends_at: unknown
  created_at: string
  updated_at: string
  test_mode: boolean
}

export interface FirstSubscriptionItem {
  id: number
  subscription_id: number
  price_id: number
  quantity: number
  created_at: string
  updated_at: string
}

export interface Urls {
  update_payment_method: string
  customer_portal: string
}

export interface Relationships {
  store: Store
  customer: Customer
  order: Order
  "order-item": OrderItem
  product: Product
  variant: Variant
  "subscription-items": SubscriptionItems
  "subscription-invoices": SubscriptionInvoices
}

export interface Store {
  links: Links
}

export interface Links {
  related: string
  self: string
}

export interface Customer {
  links: Links2
}

export interface Links2 {
  related: string
  self: string
}

export interface Order {
  links: Links3
}

export interface Links3 {
  related: string
  self: string
}

export interface OrderItem {
  links: Links4
}

export interface Links4 {
  related: string
  self: string
}

export interface Product {
  links: Links5
}

export interface Links5 {
  related: string
  self: string
}

export interface Variant {
  links: Links6
}

export interface Links6 {
  related: string
  self: string
}

export interface SubscriptionItems {
  links: Links7
}

export interface Links7 {
  related: string
  self: string
}

export interface SubscriptionInvoices {
  links: Links8
}

export interface Links8 {
  related: string
  self: string
}

export interface Links9 {
  self: string
}
