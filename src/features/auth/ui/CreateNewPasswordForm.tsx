import React from 'react'

import { Button, Card, FormInput, Loader, Typography } from '@/common/ui'
import { useCreateNewPassword } from '@/features/auth/model/useCreateNewPassword'

export const CreateNewPasswordForm = () => {
  const { control, handleSubmit, isValid, loading, t } = useCreateNewPassword()

  if (loading) {
    return <Loader />
  }

  return (
    <Card className={'p-6 flex flex-col gap-6 max-w-96 w-screen'}>
      <Typography variant={'h1'}>{t.createNewPassword}</Typography>
      <form className={'flex flex-col gap-6 '} noValidate onSubmit={handleSubmit}>
        <FormInput
          control={control}
          inputType={'reveal'}
          label={t.newPassword}
          name={'newPassword'}
          required
        ></FormInput>
        <FormInput
          control={control}
          inputType={'reveal'}
          label={t.passwordConfirmation}
          name={'confirmationPassword'}
          required
        ></FormInput>
        <Button disabled={!isValid} type={'submit'}>
          {t.createNewPassword}
        </Button>
      </form>
    </Card>
  )
}