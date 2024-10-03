import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiErorr } from '@/common/lib/hooks/useHanldeApiError'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { SignInFormData, createSignInSchema } from '@/features/auth/lib/schemas/signIn.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Router from 'next/router'

import { modifySingInApiError } from '../lib/modifySignInApiError'
import { authSlice } from './auth.slice'

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
  const dispatch = useAppDispatch()
  const { handleApiError } = useHandleApiErorr('Auth')
  const [apiError, setApiError] = useState('')

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    try {
      await login({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '', email, password })
        .unwrap()
        .then(res => {
          const token = res.accessToken

          document.cookie = `accessToken=${token};max-age=3600;secure;path=/;samesite=strict`
          dispatch(authSlice.actions.setAccessToken(token))
          Router.push('/')
        })
    } catch (error) {
      handleApiError({ error, modifyMessage: modifySingInApiError, setApiError, setError })
    }
  }

  return { apiError, control, handleSubmit, isLoading, isValid, onSubmit, setApiError, t }
}
