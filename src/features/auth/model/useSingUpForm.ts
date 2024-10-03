import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { useHandleApiErorr } from '@/common/lib/hooks/useHanldeApiError'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'

import { modifySignUpApiError } from '../lib/modifyAuthApiError'
import { SignUpFormData, createSignUpSchema } from '../lib/schemas/signUp.schema'

export const useSingUpForm = () => {
  const t = useScopedTranslation('Auth')

  const signUpSchema = createSignUpSchema(t)

  const {
    control,
    formState: { isValid },
    getValues,
    handleSubmit,
    setError,
  } = useForm<SignUpFormData>({
    defaultValues: {
      agreedToPrivacyPolicy: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  })

  const [apiError, setApiError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const { handleApiError } = useHandleApiErorr('Auth')

  const [register, { isLoading }] = authApi.useRegistrationMutation()

  const submit: SubmitHandler<SignUpFormData> = async ({ email, password, userName }) => {
    try {
      await register({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
        email,
        password,
        userName,
      }).unwrap()
      setUserEmail(getValues('email'))
      setIsModalOpen(true)
    } catch (error) {
      handleApiError({
        error,
        modifyMessage: modifySignUpApiError,
        setApiError,
        setError,
      })
    }
  }

  return {
    apiError,
    control,
    handleSubmit: handleSubmit(submit),
    isLoading,
    isModalOpen,
    isValid,
    setIsModalOpen,
    t,
    userEmail,
  }
}
