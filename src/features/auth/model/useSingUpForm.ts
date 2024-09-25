import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { zodResolver } from '@hookform/resolvers/zod'

import { handleAuthApiError } from '../lib/handle-auth-api-error'
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

  const [register, { isLoading }] = authApi.useRegistrationMutation()

  const submit: SubmitHandler<SignUpFormData> = async ({
    agreedToPrivacyPolicy,
    email,
    password,
    userName,
  }) => {
    try {
      await register({ baseUrl: 'http://localhost:3000', email, password, userName }).unwrap()

      setUserEmail(getValues('email'))
      setIsModalOpen(true)
    } catch (error) {
      handleAuthApiError({ error, setApiError, setError, t })
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
