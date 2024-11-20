'use client'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Meta } from '@storybook/react'
import { z } from 'zod'

import { Button } from '../button/Button'
import { Recaptcha } from './Recaptcha'

const meta = {
  component: Recaptcha,
} satisfies Meta<typeof Recaptcha>

const recaptchaScheme = z.object({
  recaptcha: z.string().min(1, 'Please complete the reCAPTCHA'),
})

export const ReСaptcha = {
  render: () => {
    const { control, handleSubmit, setValue } = useForm({
      resolver: zodResolver(recaptchaScheme),
    })

    const onRecaptchaChange = (token: null | string) => {
      setValue('recaptcha', token)
    }

    const submit = (data: any) => {
      alert(data)
    }

    return (
      <form
        className={'bg-dark-100 w-96 h-[200px] flex rounded-2 justify-around flex-col items-center'}
        onSubmit={handleSubmit(submit)}
      >
        <Recaptcha
          onChange={onRecaptchaChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
          theme={'dark'}
        />
        <Button type={'submit'}>SUBMIT</Button>
      </form>
    )
  },
}
export default meta
