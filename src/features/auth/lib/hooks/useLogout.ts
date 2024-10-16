import { useState } from 'react'
import { useCookies } from 'react-cookie'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { authApi, authSlice } from '@/entities/auth'

export const useLogout = () => {
  const [__, _, removeCookie] = useCookies(['accessToken'])
  const dispatch = useAppDispatch()
  const [logout, { isLoading }] = authApi.useLogoutMutation()
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const { data: me } = authApi.useMeQuery()
  const [apiError, setApiError] = useState('')

  const { handleApiError } = useHandleApiError('Auth')

  const handleLogout = async () => {
    const confirmed = await requestConfirmation()

    if (!confirmed) {
      return
    }
    try {
      await logout().unwrap()
      removeCookie('accessToken', { path: '/' })
      dispatch(authSlice.actions.setAccessToken(null))
    } catch (error) {
      handleApiError({
        error,
        setApiError,
      })
    }
  }

  return {
    apiError,
    confirmOpen,
    handleConfirm,
    handleLogout,
    handleReject,
    isLoading,
    me,
    setConfirmOpen,
  }
}
