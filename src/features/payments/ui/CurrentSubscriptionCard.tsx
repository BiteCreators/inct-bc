import React from 'react'

import { Alert, Card, Checkbox, Loader, Typography } from '@/common/ui'
import { paymentsApi } from '@/entities/payments'
import { useSubscriptionManagement } from '@/features/payments/lib/hooks/useSubscriptionManagement'

export const CurrentSubscriptionCard = () => {
  const { data, isLoading } = paymentsApi.useGetCurrentPaymentQuery()
  const { apiError, autoRenewalAlert, handleCheckboxChange, setAutoRenewalAlert } =
    useSubscriptionManagement()

  if (isLoading) {
    return <Loader />
  }

  // const data: CurrentPaymentResponse = {
  //   data: [
  //     {
  //       autoRenewal: false,
  //       dateOfPayment: '2024-11-11T11:08:16.663Z',
  //       endDateOfSubscription: '2024-12-11T11:08:16.663Z',
  //       subscriptionId: 'subid1',
  //       userId: 1431,
  //     },
  //   ],
  //   hasAutoRenewal: true,
  // }

  if (!data?.data[0]) {
    return <Typography className={'text-light-900'}>You have no active subscriptions</Typography>
  }
  const expireAt = new Date(data.data[0].endDateOfSubscription).toLocaleDateString('ru-RU')
  const nextPayment = new Date(data.data[0].dateOfPayment).toLocaleDateString('ru-RU')

  const isCheckboxChecked = data.data[0].autoRenewal
  const isCheckboxDisabled = !data.hasAutoRenewal

  return (
    <>
      <Typography className={'font-weight-600'} variant={'h3'}>
        Current Subscription:
      </Typography>
      <Card className={'flex mt-2'}>
        <div className={'flex flex-col mx-4 my-3 gap-5'}>
          <Typography className={'text-light-900'}>Expire at</Typography>
          <Typography className={'font-weight-600'}>Next payment</Typography>
        </div>
        <div className={'flex flex-col ml-12 my-3 gap-5'}>
          <Typography className={'text-light-900'}>{expireAt}</Typography>
          <Typography className={'font-weight-600'}>{nextPayment}</Typography>
        </div>
      </Card>
      <Checkbox
        checked={isCheckboxChecked}
        className={'mt-3'}
        disabled={isCheckboxDisabled}
        onChange={() => handleCheckboxChange(isCheckboxChecked)}
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
