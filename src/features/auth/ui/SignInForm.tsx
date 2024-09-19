import { SubmitHandler, useForm } from 'react-hook-form'

import { GoogleSvgrepoCom1 } from '@/common/assets/icons/components'
import GithubSvgrepoCom31 from '@/common/assets/icons/components/GithubSvgrepoCom31'
import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormInput } from '@/common/components/form/FormInput'
import Typography from '@/common/components/typography/Typography'
import { ForgotPassButton } from '@/features/auth/ui/ForgotPassButton'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { SignInFormData, signInSchema } from '../lib/schemas/signIn.schema'
import { SignUpButton } from './SignUpButton'

export const SignInForm = () => {
  const { control, handleSubmit } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  })

  const submit: SubmitHandler<SignInFormData> = data => {
    alert(`
    ${data.email}      
    ${data.password}   
    `)
  }

  return (
    <Card className={'p-6 flex flex-col'}>
      <Typography className={'text-center mb-3'} variant={'h1'}>
        Sing In
      </Typography>
      <div className={'flex gap-x-14 h-9 justify-center items-center mb-6'}>
        <Link href={'#'}>
          <GoogleSvgrepoCom1 height={'36px-'} viewBox={'0 0 24 24'} width={'36px'} />
        </Link>
        <Link href={'#'}>
          <GithubSvgrepoCom31 height={'36px-'} viewBox={'0 0 24 24'} width={'36px'} />
        </Link>
      </div>
      <form className={'flex flex-col gap-1 mb-5'} onSubmit={handleSubmit(submit)}>
        <FormInput control={control} label={'Email*'} name={'email'} required />
        <FormInput
          control={control}
          inputType={'reveal'}
          label={'Password*'}
          name={'password'}
          required
        />
        <ForgotPassButton
          className={'flex p-0 mt-3 mb-6 ml-auto text-sm text-light-900 font-weight400'}
        />
        <Button>Sign In</Button>
      </form>
      <Typography className={'text-center mb-2'}>Do you have an account?</Typography>
      <SignUpButton />
    </Card>
  )
}
