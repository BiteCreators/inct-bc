import { useState } from 'react'

import { useScopedTranslation } from '../../../../../../packages/shared/src/hooks'
import {
  Alert,
  Button,
  Card,
  FormInput,
  Typography,
} from '../../../../../../packages/shared/src/ui'

export const SignInForm = () => {
  const [error, setError] = useState<null | string>(null)

  const t = useScopedTranslation('Auth')

  return (
    <Card
      className={
        'px-4 py-0 -mt-5 sm:mt-0 sm:p-6 flex flex-col bg-transparent sm:bg-dark-500 sm:border-2 border-transparent sm:border-dark-300'
      }
    >
      <Typography className={'text-center mb-5 sm:mb-3'} variant={'h1'}>
        {t.signIn}
      </Typography>
      <form className={'flex flex-col sm:gap-6 mb-5'} onSubmit={() => {}}>
        <FormInput className={'mb-6 sm:mb-0'} label={t.email} name={'email'} required />
        <FormInput inputType={'reveal'} label={t.password} name={'password'} required />
        <Button className={'mt-[52px] sm:mt-0 py-3 sm:py-2'} type={'submit'}>
          {t.signIn}
        </Button>
      </form>
      {error && (
        <Alert
          canClose={false}
          message={error}
          onClose={() => setError('')}
          purpose={'alert'}
          type={'error'}
        />
      )}
      <Typography className={'text-center mb-2'}>{t.dontHaveAnAccount}</Typography>
    </Card>
  )
}
