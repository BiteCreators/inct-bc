import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Typography } from '@/common/ui'
import { paymentsSlice } from '@/features/payments'

import { AccountTypeCard } from './AccountTypeCard'
import { CurrentSubscriptionCard } from './CurrentSubscriptionCard'
import { PayPalPaymentButton } from './PayPalPaymentButton'
import { StripePaymentButton } from './StripePaymentButton'
import { SubscriptionTypeCard } from './SubscriptionTypeCard'

export const AccountManagement = () => {
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)

  return (
    <div>
      <CurrentSubscriptionCard />
      <AccountTypeCard />
      {accountType === 'Business' && (
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
