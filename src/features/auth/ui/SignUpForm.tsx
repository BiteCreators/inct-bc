import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormCheckbox } from '@/common/components/form/FormCheckbox'
import { FormInput } from '@/common/components/form/FormInput'
import Typography from '@/common/components/typography/Typography'
import { zodResolver } from '@hookform/resolvers/zod'

import { SignUpFormData, signUpSchema } from '../lib/schemas/signUp.schema'

export const SignUpForm = () => {
  const { control, handleSubmit } = useForm<SignUpFormData>({
    defaultValues: {
      agreedToPrivacyPolicy: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const submit: SubmitHandler<SignUpFormData> = data => {
    alert(`
    ${data.email}   
    ${data.username}   
    ${data.password}   
    ${data.passwordConfirmation}   
    ${data.agreedToPrivacyPolicy}   
    `)
  }

  return (
    <Card className={'p-6 flex flex-col gap-6'}>
      <Typography className={'text-center'} variant={'h1'}>
        Sing Up
      </Typography>
      <form className={'flex flex-col gap-6'} onSubmit={handleSubmit(submit)}>
        <FormInput control={control} label={'username'} name={'username'} required />
        <FormInput control={control} label={'email'} name={'email'} required />
        <FormInput
          control={control}
          inputType={'reveal'}
          label={'password'}
          name={'password'}
          required
        />
        <FormInput
          control={control}
          inputType={'reveal'}
          label={'password confirmation'}
          name={'passwordConfirmation'}
          required
        />
        <FormCheckbox
          control={control}
          name={'agreedToPrivacyPolicy'}
          required
          text={'I agree to Terms of service and Privacy policy'}
        />
        <Button>Sign Up</Button>
      </form>
      <Typography className={'text-center'}>Do you have an account?</Typography>
      <Button variant={'text'}>Log in</Button>
    </Card>
  )
}
