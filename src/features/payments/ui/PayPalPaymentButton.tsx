import React from 'react'

import PaypalSvg from '@/common/assets/icons/components/PaypalSvg'
import { cn } from '@/common/lib/utils/cn'
import { Alert } from '@/common/ui'
import { PAYMENT_PROVIDERS } from '@/entities/payments/types/payments.type'

import { useSubmitPayment } from '../lib/hooks/useSubmitPayment'

type Props = {
  className?: string
  onFailure: () => void
  onSuccess: () => void
}

export const PayPalPaymentButton = ({ className, onFailure, onSuccess }: Props) => {
  const { error, handleSubmit, isLoading } = useSubmitPayment({
    onFailure,
    onSuccess,
    provider: PAYMENT_PROVIDERS.PAYPAL,
  })

  return (
    <>
      <button
        className={cn([
          'w-24 h-16 bg-dark-500 p-2.5 rounded border border-dark-300 disabled:opacity-30',
          className,
        ])}
        disabled={isLoading}
        onClick={handleSubmit}
      >
        <PaypalSvg height={43} viewBox={'2 3 20 10'} width={75} />
      </button>
      {!!error && <Alert message={error} purpose={'toast'} type={'error'} />}
    </>
  )
}
