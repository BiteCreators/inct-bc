export type SubscriptionsRequest = {
  amount: number
  baseUrl: string
  paymentType: string
  typeSubscription: string
}

export type CostPaymentResponse = {
  data: CostPayment[]
}
export type CostPayment = {
  amount: number
  typeDescription: string
}

export type CurrentPaymentResponse = {
  data: Subscription[]
  hasAutoRenewal: boolean
}
export type Subscription = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type MyPaymentsResponse = MyPayment[]

export type MyPayment = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: number
  subscriptionId: string
  subscriptionType: SubscriptionType
  userId: number
}

enum SubscriptionType {
  DAY = '1 day',
  MONTHLY = '1 month',
  WEEKLY = '7 days',
}
enum PaymentType {
  CREDIT_CARD = 'Credit card',
  PAYPAL = 'PayPal',
  STRIPE = 'Stripe',
}
