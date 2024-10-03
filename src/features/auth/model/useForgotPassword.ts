import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { handleAuthApiError } from '@/features/auth/lib/handle-auth-api-error'
import {
  ForgotPasswordFormData,
  createForgotPasswordSchema,
} from '@/features/auth/lib/schemas/forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

export const useForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const searchParams = useSearchParams()
  const email = searchParams?.get('email') ?? null
  const t = useScopedTranslation('Auth')

  const forgotPasswordSchema = createForgotPasswordSchema(t)
  const [apiError, setApiError] = useState('')
  const [forgotPassword] = authApi.useForgotPasswordMutation()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    control,
    formState: { isValid },
    getValues,
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      baseUrl: baseUrl,
      email: email ?? '',
    },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  })
  const onRecaptchaChange = (token: null | string) => {
    if (token) {
      setValue('recaptcha', token)
      trigger('recaptcha')
    }
  }

  const submit: SubmitHandler<ForgotPasswordFormData> = async data => {
    try {
      setIsSubmitting(true)
      await forgotPassword(data).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      setIsModalOpen(false)
      handleAuthApiError({ error, setApiError, setError, t })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    control,
    getValues,
    handleSubmit: handleSubmit(submit),
    isModalOpen,
    isSubmitting,
    isValid,
    onRecaptchaChange,
    setError,
    setIsModalOpen,
    setValue,
    submit,
    t,
  }
}