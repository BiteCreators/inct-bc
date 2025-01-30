import React from 'react'

import { Alert } from '@byte-creators/ui-kit'
import { StripeSvgrepoCom4 } from '@byte-creators/ui-kit/icons'
import { PAYMENT_PROVIDERS, cn } from '@byte-creators/utils'

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
