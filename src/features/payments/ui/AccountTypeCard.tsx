import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Card, RadioGroup, Typography } from '@/common/ui'
import { AccountType } from '@/entities/payments'

import { paymentsSlice } from '../model/payments.slice'

export const AccountTypeCard = () => {
  //TODO: add defautl value for radio group
  const accountType = useAppSelector(paymentsSlice.selectors.selectAccountType)
  const dispatch = useAppDispatch()

  return (
    <>
      <Typography className={'font-weight600 mt-5'} variant={'h3'}>
        Account type:
      </Typography>
      <Card className={'flex flex-col  mt-2'}>
        <RadioGroup
          onChange={e =>
            //TODO: add typing for radio group
            dispatch(paymentsSlice.actions.setAccountType(e.target.value as AccountType))
          }
          options={[
            { label: 'Personal', value: 'Personal' },
            { label: 'Buisness', value: 'Buisness' },
          ]}
        />
      </Card>
    </>
  )
}
