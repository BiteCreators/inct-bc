import { inctagramApi } from '@/common/api/inct.api'
import { builders } from 'ast-types'

export const paymentsApi = inctagramApi.injectEndpoints({
  endpoints: builders => ({
    cancelAutoRenewal: builders.mutation<any, any>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/subscriptions/canceled-auto-renewal',
      }),
    }),
    getCostPayment: builders.query<any, any>({
      query: body => ({
        body,
        url: 'v1/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
    getCurrentPayment: builders.query<any, any>({
      query: body => ({
        body,
        url: 'v1/subscriptions/current-payment-subscriptions',
      }),
    }),
    getMyPayment: builders.query<any, any>({
      query: body => ({
        body,
        url: 'v1/subscriptions/my-payments',
      }),
    }),
    subscriptions: builders.mutation<any, any>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/subscriptions',
      }),
    }),
  }),
})
