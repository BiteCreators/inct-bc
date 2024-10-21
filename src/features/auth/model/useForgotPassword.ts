import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { authApi } from '@/entities/auth'
import {
  ForgotPasswordFormData,
  createForgotPasswordSchema,
} from '@/features/auth/lib/schemas/forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import { modifyForgotPasswordApiError } from '../lib/modifyForgotPassowrdApiError'

export const useForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const searchParams = useSearchParams()
  const email = searchParams?.get('email') ?? null
  const t = useScopedTranslation('Auth')

  const forgotPasswordSchema = createForgotPasswordSchema(t.errors)
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
      recaptcha: undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  })
  const { handleApiError } = useHandleApiError('Auth')
  const onRecaptchaChange = (token: null | string) => {
    if (token) {
      setValue('recaptcha', token)
    } else {
      setValue('recaptcha', '')
    }
    trigger('recaptcha')
  }

  const submit: SubmitHandler<ForgotPasswordFormData> = async data => {
    try {
      setIsSubmitting(true)
      await forgotPassword(data).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      setIsModalOpen(false)
      handleApiError({ error, modifyMessage: modifyForgotPasswordApiError, setApiError, setError })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    apiError,
    control,
    getValues,
    handleSubmit: handleSubmit(submit),
    isModalOpen,
    isSubmitting,
    isValid,
    onRecaptchaChange,
    setApiError,
    setError,
    setIsModalOpen,
    setValue,
    submit,
    t,
  }
}
