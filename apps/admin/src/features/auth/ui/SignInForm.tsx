import { useState } from 'react'

import { useScopedTranslation } from '@packages/shared/hooks'
import { Alert, Button, Card, Input, Typography } from '@packages/shared/ui'

import cl from './styles/sign-in-form.module.scss'

export const SignInForm = () => {
  const [error, setError] = useState<null | string>(null)

  //const t = useScopedTranslation('Auth')

  return (
    <Card className={cl.card}>
      <Typography className={cl.title} variant={'h1'}>
        {'Sign In'}
      </Typography>
      <form className={cl.form} onSubmit={() => {}}>
        <Input className={cl.defaultInput} label={'Email'} name={'email'} required />
        <Input inputType={'reveal'} label={'Password'} name={'password'} required />
        <Button className={cl.button} type={'submit'}>
          {'Sign In'}
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
