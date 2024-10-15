import { useCookies } from 'react-cookie'

import { authApi } from '@/common/api/auth.api'
import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { authSlice } from '@/features/auth/model/auth.slice'

export const useLogout = () => {
  const [__, _, removeCookie] = useCookies(['accessToken'])
  const dispatch = useAppDispatch()
  const [logout, { isLoading }] = authApi.useLogoutMutation()

  const { handleApiError } = useHandleApiError('Auth')

  const handleLogout = async () => {
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

  return { handleLogout, isLoading }
}
