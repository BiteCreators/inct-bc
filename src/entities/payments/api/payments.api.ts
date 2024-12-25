import { inctagramApi } from '@/common/api/inct.api'
import {
  CostPaymentResponse,
  CurrentPaymentResponse,
  MyPaymentsResponse,
  SubscriptionsRequest,
} from '@/entities/payments/types/payments.type'

export const paymentsApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    cancelAutoRenewal: builder.mutation<void, void>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/subscriptions/canceled-auto-renewal',
      }),
    }),
    createPaymentSubscription: builder.mutation<{ url: string }, SubscriptionsRequest>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/subscriptions',
      }),
    }),
    getCostPayment: builder.query<CostPaymentResponse, void>({
      query: () => ({
        url: 'v1/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
    getCurrentPayment: builder.query<CurrentPaymentResponse, void>({
      query: () => ({
        url: 'v1/subscriptions/current-payment-subscriptions',
      }),
    }),
    getMyPayments: builder.query<MyPaymentsResponse, void>({
      query: () => ({
        url: 'v1/subscriptions/my-payments',
      }),
    }),
  }),
})
