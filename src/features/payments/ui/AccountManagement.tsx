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
          <div className={'flex sm:gap-14 items-center w-full sm:justify-end justify-between'}>
            <PayPalPaymentButton />
            <Typography>or</Typography>
            <StripePaymentButton />
          </div>
        </>
      )}
    </div>
  )
}
