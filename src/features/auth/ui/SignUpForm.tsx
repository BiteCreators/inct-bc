import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/common/assets/icons/components'
import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormCheckbox } from '@/common/components/form/FormCheckbox'
import { FormInput } from '@/common/components/form/FormInput'
import { Modal } from '@/common/components/modal/Modal'
import { Trans } from '@/common/components/trans/Trans'
import Typography from '@/common/components/typography/Typography'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { handleAuthApiError } from '../lib/handle-auth-api-error'
import { SignUpFormData, createSignUpSchema } from '../lib/schemas/signUp.schema'
import { SignInButton } from './SignInButton'

export const SignUpForm = () => {
  const t = useScopedTranslation('Auth')

  const signUpSchema = createSignUpSchema(t)

  const { control, getValues, handleSubmit, setError } = useForm<SignUpFormData>({
    defaultValues: {
      agreedToPrivacyPolicy: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const [apiError, setApiError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const [register, { isLoading }] = authApi.useRegistrationMutation()

  const submit: SubmitHandler<SignUpFormData> = async ({ email, password, userName }) => {
    try {
      await register({ baseUrl: 'http://localhost:3000', email, password, userName }).unwrap()

      setUserEmail(getValues('email'))
      setIsModalOpen(true)
    } catch (error) {
      handleAuthApiError({ error, setApiError, setError, t })
    }
  }

  return (
    <Card className={'p-6 flex flex-col'}>
      {/* TODO: replace it with alert component */}
      <div>{apiError}</div>
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
        <FormInput control={control} label={t.username} name={'userName'} required />
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
        <FormCheckbox
          control={control}
          name={'agreedToPrivacyPolicy'}
          required
          text={
            <Typography variant={'small-text'}>
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
          }
        />
        <Button className={'-mt-3'} disabled={isLoading} type={'submit'}>
          {t.signUp}
        </Button>
      </form>
      <div className={'mt-[18px] flex gap-[6px] flex-col'}>
        <Typography className={'text-center '}>{t.doYouHaveAnAccount}</Typography>
        <SignInButton />
      </div>
      <Modal
        isOpen={isModalOpen}
        mode={'default'}
        onOpenChange={setIsModalOpen}
        title={'Email sent'}
      >
        <div className={'flex flex-col gap-[18px] pb-6 pt-[18px]'}>
          <Typography>We have sent a link to confirm your email to {userEmail}</Typography>
          <Button className={'self-end w-[96px]'} onClick={() => setIsModalOpen(false)}>
            Ok
          </Button>
        </div>
      </Modal>
    </Card>
  )
}
