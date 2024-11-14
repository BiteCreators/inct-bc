import { Alert, Card, Checkbox, Loader, Typography } from '@/common/ui'
import { paymentsApi } from '@/entities/payments'
import { CurrentPaymentResponse } from '@/entities/payments/types/payments.type'

import { getSubscriptionDates } from '../lib/getSubscriptionDates'
import { useSubscriptionManagement } from '../lib/hooks/useSubscriptionManagment'

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

export const CurrentSubscriptionCard = () => {
  const { data } = paymentsApi.useGetCurrentPaymentQuery()
  const { apiError, autoRenewalAlert, handleCheckboxChange, setAutoRenewalAlert } =
    useSubscriptionManagement()

  const { expireAt, nextPayment } = data?.data
    ? getSubscriptionDates(data.data)
    : { expireAt: '', nextPayment: '' }

  const isCheckboxChecked = data?.hasAutoRenewal

  return (
    <>
      <Typography className={'font-weight-600'} variant={'h3'}>
        Current Subscription:
      </Typography>
      <Card className={'flex mt-2'}>
        <div className={'flex flex-col mx-4 my-3 gap-5'}>
          <Typography className={'text-light-900'}>Expire at</Typography>
          <Typography className={'font-weight-600'}>{expireAt}</Typography>
        </div>
        {isCheckboxChecked && (
          <div className={'flex flex-col ml-12 my-3 gap-5'}>
            <Typography className={'text-light-900'}>Next payment</Typography>
            <Typography className={'font-weight-600'}>{nextPayment}</Typography>
          </div>
        )}
      </Card>
      <Checkbox
        checked={isCheckboxChecked}
        className={'mt-3'}
        onChange={() => handleCheckboxChange(!!isCheckboxChecked)}
        text={<Typography className={'font-weight-600 mt-3'}>Auto-Renewal</Typography>}
      />
      {autoRenewalAlert && (
        <Alert
          message={'Automatic subscription renewal has been cancelled'}
          onClose={() => setAutoRenewalAlert(false)}
          purpose={'alert'}
          type={'success'}
        />
      )}
      {!!apiError && <Alert message={apiError} purpose={'toast'} type={'error'} />}
    </>
  )
}
