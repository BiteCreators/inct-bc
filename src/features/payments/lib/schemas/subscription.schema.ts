import { LocaleType, PAYMENT_PROVIDERS, SUBSCRIPTION_TYPES } from '@byte-creators/utils'
import { z } from 'zod'

export const createSubscriptionSchema = (t: LocaleType['Payments']) => {
  return z.object({
    amount: z.number({ required_error: 'amount is required' }),
    baseUrl: z.string({ required_error: 'base url is required' }),
    paymentType: z.nativeEnum(PAYMENT_PROVIDERS, { required_error: 'payment type is required' }),
    typeSubscription: z.nativeEnum(SUBSCRIPTION_TYPES, {
      required_error: 'subscription type is required',
    }),
  })
}

export type SubscriptionFormData = z.infer<ReturnType<typeof createSubscriptionSchema>>
