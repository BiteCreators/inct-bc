import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Typography } from '@/common/ui'
import { PayPalPaymentButton } from '@/features/payments/ui/PayPalPaymentButton'
import { StripePaymentButton } from '@/features/payments/ui/StripePaymentButton'

import { paymentsSlice } from '../model/payments.slice'
import { AccountTypeCard } from './AccountTypeCard'
import { CurrentSubscriptionCard } from './CurrentSubscriptionCard'
import { SubscriptionTypeCard } from './SubscriptionTypeCard'

export const AccountManagement = () => {
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)
  //const { handleSubmit } = useSubmitPayment({ provider: PAYMENT_PROVIDERS.PAYPAL })

  return (
    <div>
      <CurrentSubscriptionCard />
      <AccountTypeCard />
      {accountType === 'Buisness' && (
        <>
          <SubscriptionTypeCard />
          <div className={'h-10 flex gap-3 items-center w-full justify-end my-10'}>
            <PayPalPaymentButton />
            <Typography>or</Typography>
            <StripePaymentButton />
          </div>
        </>
      )}
    </div>
  )
}
