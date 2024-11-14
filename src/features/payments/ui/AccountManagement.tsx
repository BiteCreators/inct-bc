import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Loader, Typography } from '@/common/ui'
import { LoaderBlock } from '@/common/ui/loader/LoaderBlock'
import { paymentsApi } from '@/entities/payments'
import { CurrentPaymentResponse } from '@/entities/payments/types/payments.type'

import { paymentsSlice } from '../model/payments.slice'
import { AccountTypeCard } from './AccountTypeCard'
import { CurrentSubscriptionCard } from './CurrentSubscriptionCard'
import { PayPalPaymentButton } from './PayPalPaymentButton'
import { StripePaymentButton } from './StripePaymentButton'
import { SubscriptionTypeCard } from './SubscriptionTypeCard'

// const data: any = {
//   data: [
//     // {
//     //   autoRenewal: true,
//     //   dateOfPayment: '2024-12-30',
//     //   endDateOfSubscription: '2024-12-14',
//     //   subscriptionId: '1',
//     //   userId: 1,
//     // },
//     // {
//     //   autoRenewal: false,
//     //   dateOfPayment: '2024-12-30',
//     //   endDateOfSubscription: '2024-11-15',
//     //   subscriptionId: '12',
//     //   userId: 2,
//     // },
//     {
//       autoRenewal: true,
//       dateOfPayment: '2024-12-30',
//       endDateOfSubscription: '2024-11-20',
//       subscriptionId: '123',
//       userId: 3,
//     },
//   ],
//   hasAutoRenewal: false,
// }

export const AccountManagement = () => {
  const { data, isLoading } = paymentsApi.useGetCurrentPaymentQuery()
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)

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
