import { useCookies } from 'react-cookie'

import { authApi } from '@/common/api/auth.api'
import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { authSlice } from '@/features/auth/model/auth.slice'

export const useLogout = () => {
  const [__, _, removeCookie] = useCookies(['accessToken'])
  const dispatch = useAppDispatch()
  const [logout, { isLoading }] = authApi.useLogoutMutation()
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()
  const { data: me } = authApi.useMeQuery()

  const { handleApiError } = useHandleApiError('Auth')

  const handleLogout = async () => {
    await requestConfirmation()
    try {
      await logout().unwrap()
      removeCookie('accessToken', { path: '/' })
      dispatch(authSlice.actions.setAccessToken(null))
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
