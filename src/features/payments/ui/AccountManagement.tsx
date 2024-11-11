import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Button, Typography } from '@/common/ui'
import { PAYMENT_PROVIDERS } from '@/entities/payments'

import { useSubmitPayment } from '../lib/hooks/useSubmitPayment'
import { paymentsSlice } from '../model/payments.slice'
import { AccountTypeCard } from './AccountTypeCard'
import { CurrentSubscriptionCard } from './CurrentSubscriptionCard'
import { SubscriptionTypeCard } from './SubscriptionTypeCard'

export const AccountManagement = () => {
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)
  //TODO: move these to buttons
  const { handleSubmit } = useSubmitPayment({ provider: PAYMENT_PROVIDERS.PAYPAL })

  return (
    <div>
      <CurrentSubscriptionCard />
      <AccountTypeCard />
      {accountType === 'Business' && (
        <>
          <SubscriptionTypeCard />
          <div className={'h-10 flex gap-3 items-center w-full justify-end my-10'}>
            <Button onClick={handleSubmit}>pipal</Button>
            <Typography>or</Typography>
            <Button> strips</Button>
          </div>
        </>
      )}
    </div>
  )
}
