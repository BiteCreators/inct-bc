import React from 'react'

import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormCheckbox } from '@/common/components/form/FormCheckbox'
import { FormInput } from '@/common/components/form/FormInput'
import { Trans } from '@/common/components/trans/Trans'
import Typography from '@/common/components/typography/Typography'
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
    setIsModalOpen,
    t,
    userEmail,
  } = useSingUpForm()

  return (
    <Card className={'p-6 flex flex-col'}>
      {/* TODO: replace it with alert component */}
      <div>{apiError}</div>
      <Typography className={'text-center'} variant={'h1'}>
        {t.signUp}
      </Typography>
      <div className={'flex gap-[60px] mx-auto mt-3'}>
        <GoogleOauthButton />
        <GithubOauthButton />
      </div>
      <form className={'flex flex-col gap-6 mt-6'} noValidate onSubmit={handleSubmit}>
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
        <Button className={'-mt-3'} disabled={isLoading || !isValid} type={'submit'}>
          {t.signUp}
        </Button>
      </form>
      <div className={'mt-[18px] flex gap-[6px] flex-col'}>
        <Typography className={'text-center '}>{t.doYouHaveAnAccount}</Typography>
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
