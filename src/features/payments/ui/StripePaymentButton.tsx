import React from 'react'

import { StripeSvgrepoCom4 } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { paymentsApi } from '@/entities/payments'
import { SubscriptionsRequest } from '@/entities/payments/types/payments.type'

type Props = {
  className?: string
} & Partial<SubscriptionsRequest>

export const StripePaymentButton = ({
  amount,
  baseUrl,
  className,
  paymentType,
  typeSubscription,
}: Props) => {
  const [createPaymentSubscription, { isLoading }] =
    paymentsApi.useCreatePaymentSubscriptionMutation()

  const handleStripeRedirect = async () => {
    try {
      const response = await createPaymentSubscription({
        amount: amount ?? 0,
        baseUrl: baseUrl ?? 'http://localhost:3000/',
        paymentType: paymentType ?? 'STRIPE',
        typeSubscription: typeSubscription ?? 'MONTHLY',
      }).unwrap()

      if (response.url) {
        window.location.href = response.url
      }
    } catch (err) {
      console.error('stripe redirect error: ' + err)
    }
  }

  return (
    <button
      className={cn([
        'w-20 h-11 bg-dark-500 px-3 rounded border border-dark-300 disabled:opacity-30',
        className,
      ])}
      disabled={isLoading}
      onClick={handleStripeRedirect}
    >
      <StripeSvgrepoCom4 height={30} viewBox={'2 3 24 9'} width={70} />
    </button>
  )
}
