import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import {
  forgotPasswordData,
  forgotPasswordScheme,
} from '@/features/auth/lib/schemas/forgotPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useForgotPassword = () => {
  const [forgotPassword] = authApi.useForgotPasswordMutation()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { control, handleSubmit, setError, setValue } = useForm<forgotPasswordData>({
    defaultValues: {
      baseUrl: baseUrl,
      email: '',
    },
    resolver: zodResolver(forgotPasswordScheme),
  })
  const onRecaptchaChange = (token: null | string) => {
    if (token) {
      setValue('recaptcha', token)
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
    setIsModalOpen(true)
    try {
      await forgotPassword(data).unwrap()
    } catch (error) {
      setIsModalOpen(false)
      const message = (error as ErrorResponse)?.data?.messages?.length
        ? (error as ErrorResponse).data.messages[0].message
        : 'Some default error message'

      setError('email', {
        message: message,
        type: 'error',
      })
    }
  }

  return {
    control,
    handleSubmit,
    isModalOpen,
    onRecaptchaChange,
    setError,
    setIsModalOpen,
    setValue,
    submit,
  }
}
