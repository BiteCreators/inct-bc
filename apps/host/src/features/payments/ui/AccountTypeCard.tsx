import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { paymentsSlice } from '@/features/payments'
import { Card, RadioGroup, Typography } from '@packages/shared/ui'

export const AccountTypeCard = ({ disableOption }: { disableOption: boolean }) => {
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)
  const dispatch = useAppDispatch()

  return (
    <>
      <Typography className={'font-weight600 mb-2'} variant={'h3'}>
        Account type:
      </Typography>
      <Card className={'flex flex-col mb-10'}>
        <RadioGroup
          defaultValue={accountType}
          onChange={value => dispatch(paymentsSlice.actions.setAccountType(value))}
          options={[
            { disabled: disableOption, label: 'Personal', value: 'Personal' },
            { label: 'Business', value: 'Business' },
          ]}
        />
      </Card>
    </>
  )
}
