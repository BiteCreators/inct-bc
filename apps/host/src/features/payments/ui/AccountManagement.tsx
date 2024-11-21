import { Typography } from '@packages/shared/ui'
import { LoaderBlock } from '@packages/shared/ui/loader/LoaderBlock'

import { paymentsSlice } from '..'
import { useAppDispatch, useAppSelector } from '../../../common/lib/hooks/reduxHooks'
import { paymentsApi } from '../../../entities/payments'
import { AccountTypeCard } from './AccountTypeCard'
import { CurrentSubscriptionCard } from './CurrentSubscriptionCard'
import { PayPalPaymentButton } from './PayPalPaymentButton'
import { StripePaymentButton } from './StripePaymentButton'
import { SubscriptionTypeCard } from './SubscriptionTypeCard'

// const data: any = {
//   data: [
// {
//   autoRenewal: true,
//   dateOfPayment: '2024-11-12',
//   endDateOfSubscription: '2024-11-19',
//   subscriptionId: '1',
//   userId: 1,
// },
// {
//   autoRenewal: false,
//   dateOfPayment: '2024-11-14',
//   endDateOfSubscription: '2024-11-15',
//   subscriptionId: '12',
//   userId: 2,
// },
// {
//   autoRenewal: true,
//   dateOfPayment: '2024-11-13',
//   endDateOfSubscription: '2024-12-13',
//   subscriptionId: '123',
//   userId: 3,
// },
//   ],
//   hasAutoRenewal: true,
// }

export const AccountManagement = () => {
  const { data, isLoading } = paymentsApi.useGetCurrentPaymentQuery()
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)

  const dispatch = useAppDispatch()

  let disableAccountTypeOption = false

  const subscriptionTypesText =
    accountType === 'Business' ? 'Change your subscription:' : 'Your subscription costs:'

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
          <SubscriptionTypeCard text={subscriptionTypesText} />
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
