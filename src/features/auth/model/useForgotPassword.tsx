import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import {
  forgotPasswordData,
  forgotPasswordScheme,
} from '@/features/auth/lib/schemas/forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

export const useForgotPassword = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  let { email } = router.query

  email = Array.isArray(email) ? email[0] : email
  const [forgotPassword] = authApi.useForgotPasswordMutation()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setError,
    setValue,
    trigger,
  } = useForm<forgotPasswordData>({
    defaultValues: {
      baseUrl: baseUrl,
      email: email ?? '',
    },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordScheme),
  })
  const onRecaptchaChange = (token: null | string) => {
    if (token) {
      setValue('recaptcha', token)
      trigger('recaptcha')
    }
  }

  type ErrorResponse = {
    data: {
      error: string
      messages: { field: string; message: string }[]
      statusCode: number
    }
    status: number
  }
  const submit: SubmitHandler<forgotPasswordData> = async data => {
    try {
      setIsSubmitting(true)
      await forgotPassword(data).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      setIsModalOpen(false)
      const message = (error as ErrorResponse)?.data?.messages?.length
        ? (error as ErrorResponse).data.messages[0].message
        : 'Some default error message'

      setError('email', {
        message: message,
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    control,
    handleSubmit,
    isModalOpen,
    isSubmitting,
    isValid,
    onRecaptchaChange,
    setError,
    setIsModalOpen,
    setValue,
    submit,
  }
}
