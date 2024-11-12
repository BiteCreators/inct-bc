import React, { useState } from 'react'

import { StripeSvgrepoCom4 } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Alert } from '@/common/ui'
import { PAYMENT_PROVIDERS } from '@/entities/payments/types/payments.type'

import { useSubmitPayment } from '../lib/hooks/useSubmitPayment'

type Props = {
  className?: string
}

export const StripePaymentButton = ({ className }: Props) => {
  const { error, handleSubmit, isLoading } = useSubmitPayment({
    provider: PAYMENT_PROVIDERS.STRIPE,
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
        <StripeSvgrepoCom4 height={43} viewBox={'6 2.5 12 11'} width={75} />
      </button>
      {!!error && <Alert message={error} purpose={'toast'} type={'error'} />}
    </>
  )
}
