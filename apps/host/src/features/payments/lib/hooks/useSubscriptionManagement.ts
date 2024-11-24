import { useState } from 'react'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { paymentsApi } from '@/entities/payments'
import { paymentsSlice } from '@/features/payments'

export const useSubscriptionManagement = () => {
  const [toggleAutoRenewal] = paymentsApi.useCancelAutoRenewalMutation()
  const [autoRenewalAlert, setAutoRenewalAlert] = useState(false)
  const [apiError, setApiError] = useState('')
  const { handleApiError } = useHandleApiError('Payments')
  const dispatch = useAppDispatch()

  const handleCheckboxChange = async (isCheckboxChecked: boolean) => {
    if (isCheckboxChecked) {
      try {
        await toggleAutoRenewal().unwrap()
        dispatch(paymentsSlice.actions.setNewSubscriptionType(null))
        setAutoRenewalAlert(true)
      } catch (error) {
        handleApiError({ error, setApiError })
      }
    } else {
      try {
        dispatch(paymentsSlice.actions.setAutoRenewal(true))
      } catch (error) {
        handleApiError({ error, setApiError })
      }
    }
  }

  return {
    apiError,
    autoRenewalAlert,
    handleCheckboxChange,
    setAutoRenewalAlert,
  }
}
