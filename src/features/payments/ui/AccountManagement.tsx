import { useState } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Alert, Typography } from '@/common/ui'

import { paymentsSlice } from '../model/payments.slice'
import { AccountTypeCard } from './AccountTypeCard'
import { CurrentSubscriptionCard } from './CurrentSubscriptionCard'
import { PayPalPaymentButton } from './PayPalPaymentButton'
import { StripePaymentButton } from './StripePaymentButton'
import { SubscriptionTypeCard } from './SubscriptionTypeCard'

export const AccountManagement = () => {
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentFailed, setPaymentFailed] = useState(false)

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true)
  }

  const handlePaymentFailed = () => {
    setPaymentFailed(true)
  }

  return (
    <div>
      <CurrentSubscriptionCard />
      <AccountTypeCard />
      {accountType === 'Business' && (
        <>
          <SubscriptionTypeCard />
          <div className={'h-10 flex gap-3 items-center w-full justify-end my-10'}>
            <PayPalPaymentButton onFailure={handlePaymentFailed} onSuccess={handlePaymentSuccess} />
            <Typography>or</Typography>
            <StripePaymentButton onFailure={handlePaymentFailed} onSuccess={handlePaymentSuccess} />
          </div>
        </>
      )}
      {paymentSuccess && (
        <Alert
          message={'Payment was successful!'}
          onClose={() => setPaymentSuccess(false)}
          purpose={'toast'}
          type={'success'}
        />
      )}
      {paymentFailed && (
        <Alert
          message={'Transaction failed, please try again'}
          onClose={() => setPaymentFailed(false)}
          purpose={'toast'}
          type={'error'}
        />
      )}
    </div>
  )
}
