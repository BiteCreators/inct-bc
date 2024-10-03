import { Button, Card, FormInput, Typography } from '@/common/ui'
import { useSignInForm } from '@/features/auth/model/useSignInForm'
import { ForgotPassButton } from '@/features/auth/ui/ForgotPassButton'
import { GithubOauthButton } from '@/features/auth/ui/GithubOauthButton'
import { GoogleOauthButton } from '@/features/auth/ui/GoogleOauthButton'

import { SignUpButton } from './SignUpButton'

export const SignInForm = () => {
  const { control, handleSubmit, isLoading, isValid, onSubmit, t } = useSignInForm()

  return (
    <Card className={'p-6 flex flex-col'}>
      <Typography className={'text-center mb-3'} variant={'h1'}>
        {t.signIn}
      </Typography>
      <div className={'flex gap-x-14 h-9 justify-center items-center mb-6'}>
        <GoogleOauthButton />
        <GithubOauthButton />
      </div>
      <form className={'flex flex-col gap-6 mb-5'} onSubmit={handleSubmit(onSubmit)}>
        <FormInput control={control} label={t.email} name={'email'} required />
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
        <Button disabled={!isValid || isLoading} type={'submit'}>
          {t.signIn}
        </Button>
      </form>
      <Typography className={'text-center mb-2'}>{t.dontHaveAnAccount}</Typography>
      <SignUpButton variant={'text'} />
    </Card>
  )
}
