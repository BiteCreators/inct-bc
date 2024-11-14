import React, { useState } from 'react'

import { StripeSvgrepoCom4 } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Alert } from '@/common/ui'
import { PAYMENT_PROVIDERS } from '@/entities/payments/types/payments.type'
import { PaymentsModals } from '@/features/payments/ui/PaymentsModals'

import { useSubmitPayment } from '../lib/hooks/useSubmitPayment'

type Props = {
  className?: string
}

export const StripePaymentButton = ({ className }: Props) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentFailed, setPaymentFailed] = useState(false)
  const { error, handleSubmit, isLoading } = useSubmitPayment({
    onFailure: () => setPaymentSuccess(true),
    onSuccess: () => setPaymentFailed(true),
    provider: PAYMENT_PROVIDERS.STRIPE,
  })

  return (
    <>
      <button
        className={cn([
          'w-20 h-11 bg-dark-500 px-3 rounded border border-dark-300 disabled:opacity-30',
          className,
        ])}
        disabled={isLoading}
        onClick={handleSubmit}
      >
        <StripeSvgrepoCom4 height={30} viewBox={'2 3 24 9'} width={70} />
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
