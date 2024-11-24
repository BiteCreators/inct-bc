import { useCookies } from 'react-cookie'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { authApi, authSlice } from '@/entities/auth'
import { useConfirmation } from '@packages/shared/ui/action-confirmation/useConfirmation'

export const useLogout = () => {
  const [__, _, removeCookie] = useCookies(['accessToken'])
  const dispatch = useAppDispatch()
  const [logout, { isLoading }] = authApi.useLogoutMutation()
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const { data: me } = authApi.useMeQuery()

  const { handleApiError } = useHandleApiError('Auth')

  const handleLogout = async () => {
    const confirmed = await requestConfirmation()

    if (!confirmed) {
      return
    }
    try {
      await logout().unwrap()
      removeCookie('accessToken', { path: '/' })
      dispatch(authSlice.actions.logout())
    } catch (error) {
      handleApiError({
        error,
        setApiError: () => console.log('log out error: ' + error),
      })
    }
  }

  return {
    confirmOpen,
    handleConfirm,
    handleLogout,
    handleReject,
    isLoading,
    me,
    setConfirmOpen,
  }
}
