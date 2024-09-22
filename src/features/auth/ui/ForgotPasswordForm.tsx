import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useForgotPasswordMutation } from '@/app/inct.api'
import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormInput } from '@/common/components/form/FormInput'
import { Recaptcha } from '@/common/components/reCaptcha/Recaptcha'
import Typography from '@/common/components/typography/Typography'
import {
  forgotPasswordData,
  forgotPasswordScheme,
} from '@/features/auth/lib/schemas/forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

export const ForgotPasswordForm = () => {
  const [forgotPassword, { error, isError, isLoading, isSuccess }] = useForgotPasswordMutation()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const { control, handleSubmit, setValue } = useForm<forgotPasswordData>({
    defaultValues: {
      baseUrl: baseUrl,
      email: '',
    },
    resolver: zodResolver(forgotPasswordScheme),
  })
  const onRecaptchaChange = (token: null | string) => {
    if (token) {
      setValue('recaptcha', token)
    }
  }
  const submit: SubmitHandler<forgotPasswordData> = data => {
    forgotPassword(data)
  }

  return (
    <Card className={'p-6 flex flex-col gap-6 max-w-96 w-screen'}>
      <Typography className={'text-center'} variant={'h1'}>
        Forgot Password
      </Typography>
      <form className={'flex flex-col gap-6'} onSubmit={handleSubmit(submit)}>
        <FormInput
          control={control}
          label={'email'}
          name={'email'}
          placeholder={'email@yandex.ru'}
          required
        />
        <Typography className={'text-light-900 -mt-6'} variant={'small-text'}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>
        <Button type={'submit'}>Send Link</Button>
        <Button type={'button'} variant={'text'}>
          <Link href={'/auth/sign-in'}>Back to Sign In</Link>
        </Button>
        <Recaptcha
          className={'self-center'}
          onChange={onRecaptchaChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
          theme={'dark'}
        />
      </form>
    </Card>
  )
}
