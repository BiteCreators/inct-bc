import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '@/application/providers/AuthProvider'
import { LOGIN_ADMIN } from '@/features/auth/model/loginAdminQueries'
import { useMutation } from '@apollo/client'
import { useScopedTranslation } from '@packages/shared/hooks'

type SignInFormValues = {
  email: string
  password: string
}

export const useSignIn = () => {
  const [error, setError] = useState<null | string>(null)
  const { login } = useAuth()
  const t = useScopedTranslation('Auth')
  const [loginAdmin] = useMutation(LOGIN_ADMIN)
  const { control, handleSubmit, setValue } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { data: loginData } = await loginAdmin({
        variables: { email: data.email, password: data.password },
      })

      if (loginData?.loginAdmin?.logged) {
        login(data.email, data.password)
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred during authentication: ' + err)
    }
  }

  return {
    control,
    error,
    handleSubmit,
    onSubmit,
    setError,
    t,
  }
}
