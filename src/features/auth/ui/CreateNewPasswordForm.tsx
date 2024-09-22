import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormInput } from '@/common/components/form/FormInput'
import Typography from '@/common/components/typography/Typography'
import {
  forgotPasswordData,
  forgotPasswordScheme,
} from '@/features/auth/lib/schemas/forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const CreateNewPasswordForm = () => {
  const { control, handleSubmit, setValue } = useForm<any>({
    defaultValues: {
      confirmationPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(forgotPasswordScheme),
  })

  return (
    <Card className={'p-6 flex flex-col gap-6 max-w-96 w-screen'}>
      <Typography variant={'h1'}>Create New Password</Typography>
      <form className={'flex flex-col gap-6 '}>
        <FormInput
          control={control}
          label={'New password'}
          name={'newPassword'}
          type={'password'}
        ></FormInput>
        <FormInput
          control={control}
          label={'Password confirmation'}
          name={'passwordConfirmation'}
          type={'password'}
        ></FormInput>
        <Button type={'submit'}>Create new password</Button>
      </form>
    </Card>
  )
}
