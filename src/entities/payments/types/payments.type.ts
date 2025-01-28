import { SUBSCRIPTION_TYPES } from '@byte-creators/utils'

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
  typeDescription: SUBSCRIPTION_TYPES
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
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}

export type AccountType = 'Business' | 'Personal'
