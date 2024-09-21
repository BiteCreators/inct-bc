'use client'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button/Button'
import { Recaptcha } from '@/common/components/reCaptcha/Recaptcha'
import { SignUpFormData, signUpSchema } from '@/features/auth/lib/schemas/signUp.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta } from '@storybook/react'
import { z } from 'zod'

const meta = {
  component: Recaptcha,
} satisfies Meta<typeof Recaptcha>

const recaptchaScheme = z.object({
  recaptcha: z.string().min(1, 'Please complete the reCAPTCHA'), // Поле для reCAPTCHA
})

export const ReСaptcha = {
  render: () => {
    const { control, handleSubmit, setValue } = useForm({
      resolver: zodResolver(recaptchaScheme),
    })
    const [recaptchaToken, setRecaptchaToken] = useState<null | string>(null)

    const onRecaptchaChange = (token: null | string) => {
      setRecaptchaToken(token)
      setValue('recaptcha', token) // Устанавливаем значение для reCAPTCHA в форме
    }

    const submit = (data: any) => {
      alert('SUCCESSFUL')
    }

    return (
      <form
        className={'bg-dark-100 w-96 h-[200px] flex rounded-2 justify-around flex-col items-center'}
        onSubmit={handleSubmit(submit)}
      >
        <Recaptcha
          badge={'inline'}
          hl={'en'}
          onChange={onRecaptchaChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
          theme={'dark'}
        />
        <Button onClick={() => {}} type={'submit'}>
          SUBMIT
        </Button>
      </form>
    )
  },
}
export default meta
