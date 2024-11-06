import React, { ChangeEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button, Card, Checkbox, RadioGroup, Typography } from '@/common/ui'

type Props = {}
export const MyPayments = ({}: Props) => {
  const [currentValue, setCurrentValue] = useState('1')

  const { control, handleSubmit } = useForm({
    defaultValues: {
      currentSubscription: '1',
      price: '',
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
      <Card className={'flex mt-2'}>
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
        className={'mt-3'}
        text={<Typography className={'font-weight600 mt-3'}>Auto-Renewal</Typography>}
      />
      <Typography className={'font-weight600 mt-5'} variant={'h3'}>
        {' '}
        Current Subscription:
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card className={'flex flex-col  mt-2'}>
          <Controller
            control={control}
            name={'currentSubscription'}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setCurrentValue(e.currentTarget.value)
                  field.onChange(e.currentTarget.value)
                }}
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
            <Typography className={'font-weight600 mt-7'} variant={'h3'}>
              Current Subscription:
            </Typography>
            <Card className={'flex flex-col mt-2'}>
              <Controller
                control={control}
                name={'price'}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e.currentTarget.value)
                    }}
                    options={[
                      { label: '$10 per 1 Day', value: '3' },
                      { label: '$10 per 1 Day', value: '4' },
                      { label: '$10 per 1 Day', value: '5' },
                    ]}
                  />
                )}
              />
            </Card>
          </>
        )}
      </form>
      <div className={'h-10 flex gap-3 items-center w-full justify-end my-10'}>
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
