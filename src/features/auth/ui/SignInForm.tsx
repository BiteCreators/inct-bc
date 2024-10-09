import { Alert, Button, Card, FormInput, Typography } from '@/common/ui'
import { useSignInForm } from '@/features/auth/model/useSignInForm'
import { ForgotPassButton } from '@/features/auth/ui/ForgotPassButton'
import { GithubOauthButton } from '@/features/auth/ui/GithubOauthButton'
import { GoogleOauthButton } from '@/features/auth/ui/GoogleOauthButton'

import { SignUpButton } from './SignUpButton'

export const SignInForm = () => {
  const { apiError, control, handleSubmit, isLoading, isValid, onSubmit, setApiError, t } =
    useSignInForm()

  return (
    <Card
      className={
        'px-4 py-0 -mt-5 sm:mt-0 sm:p-6 flex flex-col bg-transparent sm:bg-dark-500 sm:border-2 border-transparent sm:border-dark-300'
      }
    >
      <Typography className={'text-center mb-5 sm:mb-3'} variant={'h1'}>
        {t.signIn}
      </Typography>
      <div className={'flex gap-x-14 h-9 justify-center items-center mb-6'}>
        <GoogleOauthButton />
        <GithubOauthButton />
      </div>
      <form className={'flex flex-col sm:gap-6 mb-5'} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          className={'mb-6 sm:mb-0'}
          control={control}
          label={t.email}
          name={'email'}
          required
        />
        <FormInput
          control={control}
          inputType={'reveal'}
          label={t.password}
          name={'password'}
          required
        />
        <ForgotPassButton
          className={'flex p-0 mt-2 mb-2 ml-auto text-sm text-light-900 font-weight400'}
        />
        <Button
          className={'mt-[52px] sm:mt-0 py-3 sm:py-2'}
          disabled={!isValid || isLoading}
          type={'submit'}
        >
          {t.signIn}
        </Button>
      </form>
      {apiError && (
        <Alert
          message={apiError}
          onClose={() => setApiError('')}
          purpose={'toast'}
          type={'error'}
        />
      )}
      <Typography className={'text-center mb-2'}>{t.dontHaveAnAccount}</Typography>
      <SignUpButton variant={'text'} />
    </Card>
  )
}
