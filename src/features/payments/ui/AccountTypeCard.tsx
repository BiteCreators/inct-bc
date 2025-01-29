import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { paymentsSlice } from '@/features/payments'
import { Card, RadioGroup, Typography } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'

export const AccountTypeCard = ({ disableOption }: { disableOption: boolean }) => {
  const t = useScopedTranslation('Payments')
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)
  const dispatch = useAppDispatch()

  return (
    <>
      <Typography className={'font-weight600 mb-2'} variant={'h3'}>
        {t.accountType}
      </Typography>
      <Card className={'flex flex-col mb-10'}>
        <RadioGroup
          defaultValue={accountType}
          onChange={value => dispatch(paymentsSlice.actions.setAccountType(value))}
          options={[
            { disabled: disableOption, label: t.personal, value: 'Personal' },
            { label: t.business, value: 'Business' },
          ]}
        />
      </Card>
    </>
  )
}
