import { useEffect, useState } from 'react'

import { authApi } from '@/common/api/auth.api'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { useSearchParams } from 'next/navigation'

import { handleAuthApiError } from '../lib/handle-auth-api-error'

export const useEmailConfirmed = () => {
  const t = useScopedTranslation('Auth')
  const params = useSearchParams()
  const [confirmationState, setConfirmationState] = useState<'pending' | 'rejected' | 'success'>(
    'pending'
  )
  const [apiError, setApiError] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmRegistration] = authApi.useRegistrationConfirmationMutation()
  const [resendLink, { isLoading: isResendLinkLoading }] =
    authApi.useRegistrationEmailResendingMutation()

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

  const handleResendClick = async () => {
    try {
      await resendLink({
        //TODO: replace with env variable
        baseUrl: 'http://localhost:3000',
        email: params?.get('email') ?? '',
      }).unwrap()
    } catch (error) {
      handleAuthApiError({ error, setApiError, t })
    }
  }

  return {
    apiError,
    confirmationState,
    handleResendClick,
    isModalOpen,
    isResendLinkLoading,
    setIsModalOpen,
    t,
  }
}
