import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormInput } from '@/common/components/form/FormInput'
import { Loader } from '@/common/components/loader/Loader'
import Typography from '@/common/components/typography/Typography'
import { useLoader } from '@/common/utils/hooks/useLoader'
import {
  recoveryPasswordSchema,
  recoveryPasswordSchemaData,
} from '@/features/auth/lib/schemas/recoveryPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const CreateNewPasswordForm = () => {
  const router = useRouter()
  const params = useSearchParams()

  useLoader()
  //console.log(params?.get('code'))
  const { code, email } = router.query

  const [loading, setLoading] = useState<boolean>(true)

  const [checkRecoveryCode, { isError, isLoading, isSuccess, isUninitialized }] =
    authApi.useCheckRecoveryCodeMutation()

  useEffect(() => {
    const checkCode = async () => {
      if (code) {
        try {
          const recoveryCode = Array.isArray(code) ? code[0] : code

          await checkRecoveryCode({ recoveryCode }).unwrap()
          setLoading(false)
        } catch (err) {
          router.push(`/auth/link-expired?email=${email}&code=${code}`)
        }
      }
    }

    checkCode()
  }, [code, email, router])

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

  if (loading) {
    return <Loader />
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
