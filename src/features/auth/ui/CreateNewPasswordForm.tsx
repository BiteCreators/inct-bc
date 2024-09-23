import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormInput } from '@/common/components/form/FormInput'
import Typography from '@/common/components/typography/Typography'
import {
  recoveryPasswordSchema,
  recoveryPasswordSchemaData,
} from '@/features/auth/lib/schemas/recoveryPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

export const CreateNewPasswordForm = () => {
  const router = useRouter()
  const { code, email } = router.query
  const [checkRecoveryCode] = authApi.useCheckRecoveryCodeMutation()

  useEffect(() => {
    if (code && email) {
      checkRecoveryCode({ recoveryCode: code })
        .unwrap()
        .then(res => console.log(res))
    }
  }, [checkRecoveryCode, code, email])

  console.log(code)
  const { control, formState, handleSubmit } = useForm<recoveryPasswordSchemaData>({
    defaultValues: {
      confirmationPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
    resolver: zodResolver(recoveryPasswordSchema),
  })
  const submit: SubmitHandler<recoveryPasswordSchemaData> = data => {
    console.log('Form Data:', data)
  }

  return (
    <Card className={'p-6 flex flex-col gap-6 max-w-96 w-screen'}>
      <Typography variant={'h1'}>Create New Password</Typography>
      <form className={'flex flex-col gap-6 '} noValidate onSubmit={handleSubmit(submit)}>
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
        <Button disabled={!formState.isValid} type={'submit'}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
