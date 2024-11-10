import { Card, Checkbox, Loader, Typography } from '@/common/ui'
import { paymentsApi } from '@/entities/payments'

export const CurrentSubscriptionCard = () => {
  const { data, isLoading } = paymentsApi.useGetCurrentPaymentQuery()

  if (isLoading) {
    return <Loader />
  }

  if (!data?.data[0]) {
    return null
  }

  const expireAt = new Date(data.data[0].endDateOfSubscription).getDate()
  const nextPayment = new Date(data.data[0].dateOfPayment).getDate()

  return (
    <>
      <Typography className={'font-weight600 ,b'} variant={'h3'}>
        Current Subscription:
      </Typography>
      <Card className={'flex mt-2'}>
        <div className={'flex flex-col mx-4 my-3 gap-5'}>
          <Typography className={'text-light-900'}>Expire at</Typography>
          <Typography className={'font-weight600'}>Next payment</Typography>
        </div>
        <div className={'flex flex-col ml-12 my-3 gap-5'}>
          <Typography className={'text-light-900'}>{expireAt}</Typography>
          <Typography className={'font-weight600'}>{nextPayment}</Typography>
        </div>
      </Card>
      <Checkbox
        className={'mt-3'}
        text={<Typography className={'font-weight600 mt-3'}>Auto-Renewal</Typography>}
      />
    </>
  )
}
