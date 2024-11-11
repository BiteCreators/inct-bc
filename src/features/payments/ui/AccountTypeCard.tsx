import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Card, RadioGroup, Typography } from '@/common/ui'
import { paymentsSlice } from '@/features/payments'

export const AccountTypeCard = () => {
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)
  const dispatch = useAppDispatch()

  return (
    <>
      <Typography className={'font-weight600 mt-5'} variant={'h3'}>
        Account type:
      </Typography>
      <Card className={'flex flex-col  mt-2'}>
        <RadioGroup
          defaultValue={accountType}
          onChange={value => dispatch(paymentsSlice.actions.setAccountType(value))}
          options={[
            { label: 'Personal', value: 'Personal' },
            { label: 'Business', value: 'Business' },
          ]}
        />
      </Card>
    </>
  )
}
