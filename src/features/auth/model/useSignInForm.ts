import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { SignInFormData, createSignInSchema } from '@/features/auth/lib/schemas/signIn.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const useSignInForm = () => {
  const t = useScopedTranslation('Auth')

  const signInSchema = createSignInSchema(t)

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  })
  const [login, { error, isLoading }] = authApi.useLoginMutation()

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    try {
      await login({ baseUrl: 'http://localhost:3000', email, password }).unwrap()
    } catch (error) {
      const errorLogin = error as ResponseLoginError
      const errorNetwork = error as FetchBaseQueryError

      if (errorNetwork.status !== 'FETCH_ERROR') {
        if (errorLogin.data.statusCode === 400 && errorLogin.data.messages) {
          setError('password', { message: t.emailOrPasswordError, type: 'server' })
        }
      } else {
        setError('password', { message: 'NETWORK ERROR', type: 'server' })
      }
    }
  }

  return { control, handleSubmit, isLoading, isValid, onSubmit, t }
}

type ResponseLoginError = {
  data: {
    error: string
    messages: string
    statusCode: number
  }
}
