import { useEffect, useState } from 'react'

import { authApi } from '@/common/api/auth.api'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { useSearchParams } from 'next/navigation'

export const useEmailConfirmed = () => {
  const t = useScopedTranslation('Auth')
  const params = useSearchParams()
  const [confirmationState, setConfirmationState] = useState<'pending' | 'rejected' | 'success'>(
    'pending'
  )
  const [confirmRegistration] = authApi.useRegistrationConfirmationMutation()

  useEffect(() => {
    const sendConfirmationCode = async () => {
      try {
        await confirmRegistration({ confirmationCode: params?.get('code') ?? '' }).unwrap()
        setConfirmationState('success')
      } catch (error) {
        setConfirmationState('rejected')
      }
    }

    sendConfirmationCode()
  }, [confirmRegistration, params])

  return {
    confirmationState,
    t,
  }
}
