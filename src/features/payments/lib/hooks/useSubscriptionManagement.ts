import { useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { paymentsApi } from '@/entities/payments'

export const useSubscriptionManagement = () => {
  const [toggleAutoRenewal] = paymentsApi.useCancelAutoRenewalMutation()
  const [autoRenewalAlert, setAutoRenewalAlert] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Payments')

  const handleCheckboxChange = async (isCheckboxChecked: boolean) => {
    if (isCheckboxChecked) {
      try {
        await toggleAutoRenewal().unwrap()
        setAutoRenewalAlert(true)
      } catch (error) {
        handleApiError({ error, setApiError })
      }
    } else {
      setIsOpen(true)
    }
  }

  const handleModalClose = () => {
    setIsOpen(false)
  }

  return {
    apiError,
    autoRenewalAlert,
    handleCheckboxChange,
    handleModalClose,
    isOpen,
    setAutoRenewalAlert,
  }
}
