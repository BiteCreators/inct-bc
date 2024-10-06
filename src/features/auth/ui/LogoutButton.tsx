import { authApi } from '@/common/api/auth.api'
import { LogOut } from '@/common/assets/icons/components'
import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { cn } from '@/common/lib/utils/cn'

import { authSlice } from '../model/auth.slice'

export const LogoutButton = () => {
  const t = useScopedTranslation('Auth')

  const [logout] = authApi.useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(res => {
          document.cookie = `accessToken=;expires=${new Date(0)}`
          dispatch(authSlice.actions.setAccessToken(null))
        })
    } catch (err) {
      console.log('logout error', err)
    }
  }

  return (
    <button
      className={cn(
        'flex gap-3 text-sm font-weight500',
        'transition-colors delay-[10ms]',
        'global-hover:hover:text-primary-100'
      )}
      onClick={handleLogout}
    >
      <LogOut /> {t.logOut}
    </button>
  )
}
