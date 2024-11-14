import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { Card, RadioGroup, Typography } from '@/common/ui'
import { TYPE_DESCRIPTIONS, paymentsApi } from '@/entities/payments'
import { paymentsSlice } from '@/features/payments'

export const SubscriptionTypeCard = ({ text }: { text: string }) => {
  const { data: subscriptionTypes } = paymentsApi.useGetCostPaymentQuery()
  const dispatch = useAppDispatch()

  if (subscriptionTypes) {
    const options = subscriptionTypes?.data.map(type => {
      let label = ''

      switch (type.typeDescription) {
        case TYPE_DESCRIPTIONS.DAY:
          label = `$${type.amount} per 1 day`
          break
        case TYPE_DESCRIPTIONS.WEEKLY:
          label = `$${type.amount} per 7 days`
          break
        case TYPE_DESCRIPTIONS.MONTHLY:
          label = `$${type.amount} per 1 month`
          break
      }

      return { label, value: type.typeDescription }
    })

    return (
      <>
        <Typography className={'font-weight600 mt-7'} variant={'h3'}>
          Your subscription costs:
        </Typography>
        <Card className={'flex flex-col mt-2'}>
          <form noValidate>
            <RadioGroup<TYPE_DESCRIPTIONS>
              defaultValue={options[0]?.value}
              onChange={value => dispatch(paymentsSlice.actions.setNewSubscriptionType(value))}
              options={options}
            />
          </form>
        </Card>
      </>
    )
  }
}
