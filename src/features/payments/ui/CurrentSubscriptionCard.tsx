import { Alert, Card, Checkbox, Typography } from '@/common/ui'
import { paymentsApi } from '@/entities/payments'
import { getSubscriptionDates } from '@/features/payments/lib/getSubscriptionDates'
import { useSubscriptionManagement } from '@/features/payments/lib/hooks/useSubscriptionManagement'

export const CurrentSubscriptionCard = () => {
  const { data, isLoading } = paymentsApi.useGetCurrentPaymentQuery()
  const { apiError, autoRenewalAlert, handleCheckboxChange, setAutoRenewalAlert } =
    useSubscriptionManagement()

  // const data: any = {
  //   data: [
  //     {
  //       autoRenewal: true,
  //       dateOfPayment: '2024-12-30',
  //       endDateOfSubscription: '2024-12-14',
  //       subscriptionId: '1',
  //       userId: 1,
  //     },
  //     {
  //       autoRenewal: false,
  //       dateOfPayment: '2024-12-30',
  //       endDateOfSubscription: '2024-11-15',
  //       subscriptionId: '12',
  //       userId: 2,
  //     },
  //     {
  //       autoRenewal: true,
  //       dateOfPayment: '2024-12-30',
  //       endDateOfSubscription: '2024-11-20',
  //       subscriptionId: '123',
  //       userId: 3,
  //     },
  //   ],
  //   hasAutoRenewal: true,
  // }

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
          <Typography className={'text-light-900'}>Expire At</Typography>
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
