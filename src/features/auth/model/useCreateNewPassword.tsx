import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { authApi } from '@/common/api/auth.api'
import {
  recoveryPasswordSchema,
  recoveryPasswordSchemaData,
} from '@/features/auth/lib/schemas/recoveryPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

export const useCreateNewPassword = () => {
  const router = useRouter()

  const { code, email } = router.query

  const [loading, setLoading] = useState<boolean>(true)

  const [checkRecoveryCode] = authApi.useCheckRecoveryCodeMutation()

  const [newPassword] = authApi.useNewPasswordMutation()

  useEffect(() => {
    const checkCode = async () => {
      if (code) {
        try {
          const recoveryCode = Array.isArray(code) ? code[0] : code

          await checkRecoveryCode({ recoveryCode }).unwrap()
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
  } = useForm<recoveryPasswordSchemaData>({
    defaultValues: {
      confirmationPassword: '',
      newPassword: '',
    },
    mode: 'onChange',
    resolver: zodResolver(recoveryPasswordSchema),
  })
  const handlerNewPassword: SubmitHandler<recoveryPasswordSchemaData> = async data => {
    const dataForRequest = {
      newPassword: data.newPassword,
      recoveryCode: code,
    }

    await newPassword(dataForRequest)
    await router.push(`/auth`)
  }

  return {
    control,
    email,
    handleSubmit,
    handlerNewPassword,
    isValid,
    loading,
    router,
  }
}
