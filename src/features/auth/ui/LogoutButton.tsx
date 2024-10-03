import { authApi } from '@/common/api/auth.api'
import { LogOut } from '@/common/assets/icons/components'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { cn } from '@/common/lib/utils/cn'
import Router from 'next/router'

export const LogoutButton = () => {
  const t = useScopedTranslation('Auth')

  const [logout] = authApi.useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout({ baseUrl: 'http://localhost:3000' })
        .unwrap()
        .then(res => {
          document.cookie = `accessToken=;expires=${new Date(0)}`
          // Router.push('auth/sign-in')
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
        'hover:text-primary-100'
      )}
      onClick={handleLogout}
    >
      <LogOut /> {t.logOut}
    </button>
  )
}
