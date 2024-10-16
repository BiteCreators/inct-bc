import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { authApi, authSlice } from '@/entities/auth'
import { SignInFormData, createSignInSchema } from '@/features/auth/lib/schemas/signIn.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as jose from 'jose'
import Router from 'next/router'

import { modifySingInApiError } from '../lib/modifySignInApiError'

export const useSignInForm = () => {
  const t = useScopedTranslation('Auth')

  const signInSchema = createSignInSchema(t.errors)

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
  const [login, { isLoading }] = authApi.useLoginMutation()
  const dispatch = useAppDispatch()
  const { handleApiError } = useHandleApiError('Auth')
  const [apiError, setApiError] = useState('')
  const [_, setCookies] = useCookies(['accessToken'])

  const onSubmit: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    try {
      const res = await login({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
        email,
        password,
      }).unwrap()
      const token = res.accessToken
      const decodeJwt = jose.decodeJwt(token)

      setCookies('accessToken', res.accessToken, {
        maxAge: 2678400,
        path: '/',
        sameSite: 'lax',
        secure: true,
      })
      dispatch(authSlice.actions.setAccessToken(token))
      Router.push(`/profile/${decodeJwt.userId}`)
    } catch (error) {
      handleApiError({ error, modifyMessage: modifySingInApiError, setApiError, setError })
    }
  }

  return { apiError, control, handleSubmit, isLoading, isValid, onSubmit, setApiError, t }
}
