import { useState } from 'react'

import { useScopedTranslation } from '@packages/shared/hooks'
import { Alert, Button, Card, Input, Typography } from '@packages/shared/ui'

import cl from './styles/sign-in-form.module.scss'

export const SignInForm = () => {
  const [error, setError] = useState<null | string>(null)

  const t = useScopedTranslation('Auth')

  return (
    <Card className={cl.card}>
      <Typography className={cl.title} variant={'h1'}>
        {t.signIn}
      </Typography>
      <form className={cl.form} onSubmit={() => {}}>
        <Input className={cl.defaultInput} label={t.email} name={'email'} required />
        <Input inputType={'reveal'} label={t.password} name={'password'} required />
        <Button className={cl.button} type={'submit'}>
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
    </Card>
  )
}
