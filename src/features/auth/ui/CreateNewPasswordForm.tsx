import React from 'react'

import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormInput } from '@/common/components/form/FormInput'
import { Loader } from '@/common/components/loader/Loader'
import Typography from '@/common/components/typography/Typography'
import { useCreateNewPassword } from '@/features/auth/model/useCreateNewPassword'

export const CreateNewPasswordForm = () => {
  const { control, handleSubmit, handlerNewPassword, isValid, loading } = useCreateNewPassword()

  if (loading) {
    return <Loader />
  }

  return (
    <Card className={'p-6 flex flex-col gap-6 max-w-96 w-screen'}>
      <Typography variant={'h1'}>Create New Password</Typography>
      <form
        className={'flex flex-col gap-6 '}
        noValidate
        onSubmit={handleSubmit(handlerNewPassword)}
      >
        <FormInput
          control={control}
          inputType={'reveal'}
          label={'New password'}
          name={'newPassword'}
          required
        ></FormInput>
        <FormInput
          control={control}
          inputType={'reveal'}
          label={'Password confirmation'}
          name={'confirmationPassword'}
          required
        ></FormInput>
        <Button disabled={!isValid} type={'submit'}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
