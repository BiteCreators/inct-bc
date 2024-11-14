import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Typography } from '@/common/ui'
import { LoaderBlock } from '@/common/ui/loader/LoaderBlock'
import { paymentsApi } from '@/entities/payments'

import { paymentsSlice } from '../model/payments.slice'
import { AccountTypeCard } from './AccountTypeCard'
import { CurrentSubscriptionCard } from './CurrentSubscriptionCard'
import { PayPalPaymentButton } from './PayPalPaymentButton'
import { StripePaymentButton } from './StripePaymentButton'
import { SubscriptionTypeCard } from './SubscriptionTypeCard'

export const AccountManagement = () => {
  const { data, isLoading } = paymentsApi.useGetCurrentPaymentQuery()
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)
  //const { handleSubmit } = useSubmitPayment({ provider: PAYMENT_PROVIDERS.PAYPAL })

  const dispatch = useAppDispatch()

  let disableAccountTypeOption = false

  if (data?.data.length !== undefined && data?.data.length !== 0) {
    dispatch(paymentsSlice.actions.setAccountType('Business'))
    disableAccountTypeOption = true
  }

  return (
    <div className={'relative'}>
      {isLoading && <LoaderBlock />}
      {data?.data.length !== 0 && <CurrentSubscriptionCard />}
      <AccountTypeCard disableOption={disableAccountTypeOption} />
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
