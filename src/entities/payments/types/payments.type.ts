export type SubscriptionsRequest = {
  amount: number
  baseUrl: string
  paymentType: string
  typeSubscription: string
}

export type CostPaymentResponse = {
  data: {
    amount: number
    typeDescription: string
  }[]
}

export type CurrentPaymentResponse = {
  data: SubscriptionData[]
  hasAutoRenewal: boolean
}
export type SubscriptionData = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}
export type MyPaymentsResponse = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}[]
