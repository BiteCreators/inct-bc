import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/common/assets/icons/components'
import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormCheckbox } from '@/common/components/form/FormCheckbox'
import { FormInput } from '@/common/components/form/FormInput'
import { Trans } from '@/common/components/trans/Trans'
import Typography from '@/common/components/typography/Typography'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { SignUpFormData, createSignUpSchema } from '../lib/schemas/signUp.schema'
import { SignInButton } from './SignInButton'

export const SignUpForm = () => {
  const t = useScopedTranslation('Auth')

  const signUpSchema = createSignUpSchema(t)

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
    <Card className={'p-6 flex flex-col'}>
      <Typography className={'text-center'} variant={'h1'}>
        {t.signUp}
      </Typography>
      <div className={'flex gap-[60px] mx-auto mt-3'}>
        <Link href={'#'}>
          <GoogleSvgrepoCom1 height={'36px'} viewBox={'0 0 24 24'} width={'36px'} />
        </Link>
        <Link href={'#'}>
          <GithubSvgrepoCom31 height={'36px'} viewBox={'0 0 24 24'} width={'36px'} />
        </Link>
      </div>
      <form className={'flex flex-col gap-6 mt-6'} noValidate onSubmit={handleSubmit(submit)}>
        <FormInput control={control} label={t.username} name={'username'} required />
        <FormInput control={control} label={t.email} name={'email'} required />
        <FormInput
          control={control}
          inputType={'reveal'}
          label={t.password}
          name={'password'}
          required
        />
        <FormInput
          control={control}
          inputType={'reveal'}
          label={t.passwordConfirmation}
          name={'passwordConfirmation'}
          required
        />
        <div className={'flex gap-2 relative'}>
          <FormCheckbox control={control} name={'agreedToPrivacyPolicy'} required />
          {/*TODO: rewrite with updated input, remove this absolute positioning*/}
          <Typography className={'absolute top-[10px] left-[31px]'} variant={'small-text'}>
            <Trans
              tags={{
                '1': str => (
                  <Link className={'underline text-primary-300'} href={'#'}>
                    {str}
                  </Link>
                ),
                '2': str => (
                  <Link className={'underline text-primary-300'} href={'#'}>
                    {str}
                  </Link>
                ),
              }}
              text={t.privacyPolicy}
            />
          </Typography>
        </div>
        <Button className={'-mt-3'} type={'submit'}>
          {t.signUp}
        </Button>
      </form>
      <div className={'mt-[18px] flex gap-[6px] flex-col'}>
        <Typography className={'text-center '}>{t.doYouHaveAnAccount}</Typography>
        <SignInButton />
      </div>
    </Card>
  )
}
