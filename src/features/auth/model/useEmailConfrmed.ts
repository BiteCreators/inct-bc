import { useEffect, useState } from 'react'

import { authApi } from '@/common/api/auth.api'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { useSearchParams } from 'next/navigation'

export const useEmailConfirmed = () => {
  const t = useScopedTranslation('Auth')
  const params = useSearchParams()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [confirmRegistration, { isLoading }] = authApi.useRegistrationConfirmationMutation()

  useEffect(() => {
    const sendConfirmationCode = async () => {
      try {
        await confirmRegistration({ confirmationCode: params?.get('code') ?? '' }).unwrap()
        setIsConfirmed(true)
      } catch (error) {
        setIsConfirmed(false)
      }
    }

    sendConfirmationCode()
  }, [confirmRegistration, params])

  return {
    isConfirmed,
    isLoading,
    t,
  }
}
