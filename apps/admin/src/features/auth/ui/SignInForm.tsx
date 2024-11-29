import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'

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
  // const [cookies, setCookie] = useCookies(['adminEmail', 'adminPassword'])
  const t = useScopedTranslation('Auth')
  const [loginAdmin] = useMutation(LOGIN_ADMIN)
  const { control, handleSubmit, setValue } = useForm<SignInFormValues>({
    defaultValues: {
      email: '', // Значение по умолчанию для email
      password: '', // Значение по умолчанию для password
    },
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { data: loginData } = await loginAdmin({
        variables: { email: data.email, password: data.password },
      })

      if (loginData?.loginAdmin?.logged) {
        console.log('login success')
        // setCookie('adminEmail', data.email, { maxAge: 7 * 24 * 60 * 60, path: '/' })
        // setCookie('adminPassword', data.password, { maxAge: 7 * 24 * 60 * 60, path: '/' })
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred during authentication')
    }
  }

  return (
    <Card className={cl.card}>
      <Typography className={cl.title} variant={'h1'}>
        {t.signIn}
      </Typography>
      <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Передаем control в FormInput */}
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
  )
}
