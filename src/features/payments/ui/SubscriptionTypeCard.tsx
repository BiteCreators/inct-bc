import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { paymentsApi } from '@/entities/payments'
import { paymentsSlice } from '@/features/payments'
import { Card, RadioGroup, Typography } from '@byte-creators/ui-kit'
import { SUBSCRIPTION_TYPES, useScopedTranslation } from '@byte-creators/utils'

export const SubscriptionTypeCard = ({ text }: { text: string }) => {
  const t = useScopedTranslation('Payments')
  const { data: subscriptionTypes } = paymentsApi.useGetCostPaymentQuery()
  const dispatch = useAppDispatch()

  if (subscriptionTypes) {
    const options = subscriptionTypes?.data.map(type => {
      let label = ''

      switch (type.typeDescription) {
        case SUBSCRIPTION_TYPES.DAY:
          label = `$${type.amount} ${t.oneDay}`
          break
        case SUBSCRIPTION_TYPES.WEEKLY:
          label = `$${type.amount} ${t.sevenDays}`
          break
        case SUBSCRIPTION_TYPES.MONTHLY:
          label = `$${type.amount} ${t.oneMonth}`
          break
      }

      return { label, value: type.typeDescription }
    })

    return (
      <>
        <Typography className={'font-weight600 mb-2'} variant={'h3'}>
          {t.yourSubscriptionCosts}
        </Typography>
        <Card className={'flex flex-col mb-6'}>
          <form noValidate>
            <RadioGroup<SUBSCRIPTION_TYPES>
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
