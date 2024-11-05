import React, { ChangeEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Card, Checkbox, FormCheckbox, Input, RadioGroup, Typography } from '@/common/ui'
import { LoaderBlock } from '@/common/ui/loader/LoaderBlock'
import { Radio } from '@/common/ui/radio-group/Radio'
import { paymentsApi } from '@/entities/payments'
import { RecoveryPasswordFormData } from '@/features/auth/lib/schemas/recoveryPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {}
export const MyPayments = ({}: Props) => {
  const { data, isLoading } = paymentsApi.useGetMyPaymentsQuery()
  const [currentValue, setCurrentValue] = useState('1')

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      accountType: '',
    },
    mode: 'onChange',
  })
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <Typography className={'font-weight600 ,b'} variant={'h3'}>
        {' '}
        Current Subscription:
      </Typography>
      <Card className={'flex'}>
        <div className={'flex flex-col mx-4 my-3 gap-5'}>
          <Typography className={'text-light-900'}>Expire at</Typography>
          <Typography className={'font-weight600'}>Expire at</Typography>
        </div>
        <div className={'flex flex-col ml-12 my-3 gap-5'}>
          <Typography className={'text-light-900'}>Next payment</Typography>
          <Typography className={'font-weight600'}>Next payment</Typography>
        </div>
      </Card>
      <Checkbox
        className={'mt-5'}
        text={<Typography className={'font-weight600 mt-5'}>Auto-Renewal</Typography>}
      />
      <Typography className={'font-weight600'} variant={'h3'}>
        {' '}
        Current Subscription:
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card className={'flex flex-col'}>
          <Controller
            control={control}
            name={'accountType'}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCurrentValue(e.currentTarget.value)
                }
                options={[
                  { label: 'Personal', value: '1' },
                  { label: 'Business', value: '2' },
                ]}
              />
            )}
          />
        </Card>

        {currentValue === '2' && (
          <>
            <Typography className={'font-weight600'} variant={'h3'}>
              Current Subscription:
            </Typography>
            <Card className={'flex flex-col'}>
              <RadioGroup
                options={[
                  { label: '$10 per 1 Day', value: '1' },
                  { label: '$10 per 1 Day', value: '2' },
                  { label: '$10 per 1 Day', value: '3' },
                ]}
              />
            </Card>
          </>
        )}
      </form>
      <div className={'h-10 flex gap-3 items-center'}>
        <Button onClick={handleSubmit(onSubmit)} type={'submit'}>
          {' '}
          pipal
        </Button>
        <Typography>or</Typography>
        <Button> strips</Button>
      </div>
    </div>
  )
}
