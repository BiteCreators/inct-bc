import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '@/application/providers/AuthProvider'
import { LOGIN_ADMIN } from '@/features/auth/model/loginAdminQueries'
import { useMutation } from '@apollo/client'
import { useScopedTranslation } from '@packages/shared/hooks'
import { Alert, Button, Card, FormInput, Typography } from '@packages/shared/ui'

import cl from './styles/sign-in-form.module.scss'

type SignInFormValues = {
  email: string
  password: string
}

export const SignInForm = () => {
  const [error, setError] = useState<null | string>(null)
  const { login } = useAuth()
  const t = useScopedTranslation('Auth')
  const [loginAdmin] = useMutation(LOGIN_ADMIN)
  const { control, handleSubmit, setValue } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { data: loginData } = await loginAdmin({
        variables: { email: data.email, password: data.password },
      })

      if (loginData?.loginAdmin?.logged) {
        login(data.email, data.password)
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred during authentication: ' + err)
    }
  }

  return (
    <>
      <Card className={cl.card}>
        <Typography className={cl.title} variant={'h1'}>
          {t.signIn}
        </Typography>
        <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            className={cl.defaultInput}
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
    </>
  )
}
