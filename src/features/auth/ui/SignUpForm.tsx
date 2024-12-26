import React from 'react'

import {
  Alert,
  Button,
  Card,
  FormCheckbox,
  FormInput,
  Trans,
  Typography,
} from '@byte-creators/ui-kit'
import Link from 'next/link'

import { useSingUpForm } from '../model/useSingUpForm'
import { GithubOauthButton } from './GithubOauthButton'
import { GoogleOauthButton } from './GoogleOauthButton'
import { LinkSentModal } from './LinkSentModal'
import { SignInButton } from './SignInButton'

export const SignUpForm = () => {
  const {
    apiError,
    control,
    handleSubmit,
    isLoading,
    isModalOpen,
    isValid,
    setApiError,
    setIsModalOpen,
    t,
    userEmail,
  } = useSingUpForm()

  return (
    <Card
      className={
        'px-6 py-0 -mt-5 sm:mt-0 sm:p-6 flex flex-col bg-transparent sm:bg-dark-500 sm:border-2 border-transparent sm:border-dark-300'
      }
    >
      <Typography className={'text-center'} variant={'h1'}>
        {t.signUp}
      </Typography>
      <div className={'flex gap-[60px] mx-auto mt-5 sm:mt-3'}>
        <GoogleOauthButton />
        <GithubOauthButton />
      </div>
      <form className={'flex flex-col gap-6 mt-3 sm:mt-6'} noValidate onSubmit={handleSubmit}>
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
          className={'-mt-3 sm:mt-0'}
          control={control}
          name={'agreedToPrivacyPolicy'}
          required
          text={
            <Typography className={'-mt-3 sm:mt-0'} variant={'small-text'}>
              <Trans
                tags={{
                  '1': str => (
                    <Link
                      className={'underline text-primary-300'}
                      href={'/auth/sign-up/terms-of-service'}
                    >
                      {str}
                    </Link>
                  ),
                  '2': str => (
                    <Link
                      className={'underline text-primary-300'}
                      href={'/auth/sign-up/privacy-policy'}
                    >
                      {str}
                    </Link>
                  ),
                }}
                text={t.privacyPolicy}
              />
            </Typography>
          }
        />
        {!!apiError && (
          <Alert
            message={apiError}
            onClose={() => setApiError('')}
            purpose={'alert'}
            type={'error'}
          />
        )}
        <Button className={'mt-0 py-3 sm:py-2'} disabled={isLoading || !isValid} type={'submit'}>
          {t.signUp}
        </Button>
      </form>
      <div className={'mt-[18px] flex gap-[6px] flex-col'}>
        <Typography className={'text-center'}>{t.doYouHaveAnAccount}</Typography>
        <SignInButton />
      </div>
      <LinkSentModal
        bodyText={`${t.weSentALinkToConfirmYourEmail} ${userEmail}`}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={t.emailSent}
      />
    </Card>
  )
}
