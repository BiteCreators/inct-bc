import React from 'react'

import { useCreateNewPassword } from '@/features/auth/model/useCreateNewPassword'
import { Button, Card, FormInput, Typography } from '@byte-creators/ui-kit'
import { LoaderBlock } from '@byte-creators/ui-kit/dist/ui/loader/LoaderBlock'

export const CreateNewPasswordForm = () => {
  const { control, handleSubmit, isValid, loading, t } = useCreateNewPassword()

  return (
    <div className={'relative'}>
      {' '}
      {loading && <LoaderBlock />}
      <Card
        className={
          'p-6 flex flex-col gap-6 max-w-96 w-screen bg-transparent sm:bg-dark-500 sm:border-2 border-transparent sm:border-dark-300'
        }
      >
        <Typography className={'text-center'} variant={'h1'}>
          {t.createNewPassword}
        </Typography>
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
          <Button className={'mt-10 py-3 sm:py-2'} disabled={!isValid} type={'submit'}>
            {t.createNewPassword}
          </Button>
        </form>
      </Card>
    </div>
  )
}
