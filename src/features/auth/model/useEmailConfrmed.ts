import { useEffect, useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { authApi } from '@/entities/auth'
import { useScopedTranslation } from '@byte-creators/utils'
import { useSearchParams } from 'next/navigation'

import { modifySignUpApiError } from '../lib/modifyAuthApiError'

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
  const { handleApiError } = useHandleApiError('Auth')

  useEffect(() => {
    const sendConfirmationCode = async () => {
      try {
        if (params?.get('code')) {
          await confirmRegistration({
            confirmationCode: params.get('code') as string,
          }).unwrap()
          setConfirmationState('success')
        }
      } catch (error) {
        setConfirmationState('rejected')
      }
    }

    sendConfirmationCode()
  }, [confirmRegistration, params])

  const handleResendClick = async () => {
    try {
      await resendLink({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
        email: params?.get('email') ?? '',
      }).unwrap()
    } catch (error) {
      handleApiError({
        error,
        modifyMessage: modifySignUpApiError,
        setApiError,
      })
    }
  }

  return {
    apiError,
    confirmationState,
    handleResendClick,
    isModalOpen,
    isResendLinkLoading,
    setApiError,
    setIsModalOpen,
    t,
  }
}
