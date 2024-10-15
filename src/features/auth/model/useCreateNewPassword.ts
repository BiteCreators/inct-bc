import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import {
  RecoveryPasswordFormData,
  createRecoveryPasswordSchema,
} from '@/features/auth/lib/schemas/recoveryPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useCreateNewPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams?.get('code') ?? null
  const email = searchParams?.get('email') ?? null
  const t = useScopedTranslation('Auth')
  const recoveryPasswordSchema = createRecoveryPasswordSchema(t.errors)

  const [loading, setLoading] = useState<boolean>(true)

  const [checkRecoveryCode] = authApi.useCheckRecoveryCodeMutation()

  const [newPassword] = authApi.useNewPasswordMutation()

  useEffect(() => {
    const checkCode = async () => {
      if (code) {
        try {
          await checkRecoveryCode({ recoveryCode: code }).unwrap()
          setLoading(false)
        } catch (err) {
          await router.push(`/auth/link-expired?email=${email}&code=${code}`)
        }
      }
    }

    checkCode()
  }, [checkRecoveryCode, code, email, router])

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<RecoveryPasswordFormData>({
    defaultValues: {
      confirmationPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
    resolver: zodResolver(recoveryPasswordSchema),
  })
  const submit: SubmitHandler<RecoveryPasswordFormData> = async data => {
    const dataForRequest = {
      newPassword: data.newPassword,
      recoveryCode: code as string,
    }

    await newPassword(dataForRequest)
    await router.push(`/auth`)
  }

  return {
    control,
    email,
    handleSubmit: handleSubmit(submit),
    isValid,
    loading,
    router,
    t,
  }
}
