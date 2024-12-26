import React, { useState } from 'react'

import { PAYMENT_PROVIDERS } from '@/entities/payments/types/payments.type'
import { PaymentsModals } from '@/features/payments/ui/PaymentsModals'
import { Alert } from '@byte-creators/ui-kit'
import { PaypalSvg } from '@byte-creators/ui-kit/icons'
import { cn } from '@byte-creators/utils'

import { useSubmitPayment } from '../lib/hooks/useSubmitPayment'

type Props = {
  className?: string
}

export const PayPalPaymentButton = ({ className }: Props) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentFailed, setPaymentFailed] = useState(false)
  const { error, handleSubmit, isLoading } = useSubmitPayment({
    onFailure: () => setPaymentSuccess(true),
    onSuccess: () => setPaymentFailed(true),
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
      <PaymentsModals
        paymentFailed={paymentFailed}
        paymentSuccess={paymentSuccess}
        setPaymentFailed={setPaymentFailed}
        setPaymentSuccess={setPaymentSuccess}
      />
    </>
  )
}
