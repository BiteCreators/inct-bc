import React, { useState } from 'react'

import PaypalSvg from '@/common/assets/icons/components/PaypalSvg'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { cn } from '@/common/lib/utils/cn'
import { Alert } from '@/common/ui'
import { paymentsApi } from '@/entities/payments'
import { SubscriptionsRequest } from '@/entities/payments/types/payments.type'

type Props = {
  className?: string
} & Partial<SubscriptionsRequest>

export const PayPalPaymentButton = ({
  amount,
  baseUrl,
  className,
  paymentType,
  typeSubscription,
}: Props) => {
  const [createPaymentSubscription, { isLoading }] =
    paymentsApi.useCreatePaymentSubscriptionMutation()
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Payments')

  const handlePayPalRedirect = async () => {
    try {
      const response = await createPaymentSubscription({
        amount: amount ?? 0,
        baseUrl: baseUrl ?? 'http://localhost:3000/',
        paymentType: paymentType ?? 'PAYPAL',
        typeSubscription: typeSubscription ?? 'MONTHLY',
      }).unwrap()

      if (response.url) {
        window.location.href = response.url
      }
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  return (
    <>
      <button
        className={cn([
          'w-24 h-16 bg-dark-500 p-2.5 rounded border border-dark-300 disabled:opacity-30',
          className,
        ])}
        disabled={isLoading}
        onClick={handlePayPalRedirect}
      >
        <PaypalSvg height={43} viewBox={'2 3 20 10'} width={75} />
      </button>
      {!!apiError && <Alert message={apiError} purpose={'toast'} type={'error'} />}
    </>
  )
}
