import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { TYPE_DESCRIPTIONS, paymentsApi } from '@/entities/payments'
import { paymentsSlice } from '@/features/payments'
import { Card, RadioGroup, Typography } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'

export const SubscriptionTypeCard = ({ text }: { text: string }) => {
  const t = useScopedTranslation('Payments')
  const { data: subscriptionTypes } = paymentsApi.useGetCostPaymentQuery()
  const dispatch = useAppDispatch()

  if (subscriptionTypes) {
    const options = subscriptionTypes?.data.map(type => {
      let label = ''

      switch (type.typeDescription) {
        case TYPE_DESCRIPTIONS.DAY:
          label = `$${type.amount} ${t.oneDay}`
          break
        case TYPE_DESCRIPTIONS.WEEKLY:
          label = `$${type.amount} ${t.sevenDays}`
          break
        case TYPE_DESCRIPTIONS.MONTHLY:
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
