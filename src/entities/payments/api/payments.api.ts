import { inctagramApi } from '@/common/api/inct.api'
import {
  CostPaymentResponse,
  CurrentPaymentResponse,
  SubscriptionsRequest,
} from '@/entities/payments/types/payments.type'

export const paymentsApi = inctagramApi.injectEndpoints({
  endpoints: builders => ({
    cancelAutoRenewal: builders.mutation<void, void>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/subscriptions/canceled-auto-renewal',
      }),
    }),
    getCostPayment: builders.query<CostPaymentResponse, void>({
      query: () => ({
        url: 'v1/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
    getCurrentPayment: builders.query<CurrentPaymentResponse, void>({
      query: () => ({
        url: 'v1/subscriptions/current-payment-subscriptions',
      }),
    }),
    getMyPayment: builders.query<void, void>({
      query: () => ({
        url: 'v1/subscriptions/my-payments',
      }),
    }),
    subscriptions: builders.mutation<{ url: string }, SubscriptionsRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/subscriptions',
      }),
    }),
  }),
})
