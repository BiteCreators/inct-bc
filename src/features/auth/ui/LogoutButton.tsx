import { LogOut } from '@/common/assets/icons/components'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { cn } from '@/common/lib/utils/cn'
import { Loader } from '@/common/ui'
import { useLogout } from '@/features/auth/lib/hooks/useLogout'

export const LogoutButton = () => {
  const t = useScopedTranslation('Auth')

  const { handleLogout, isLoading } = useLogout()

  if (isLoading) {
    return (
      <div className={'flex justify-center items-center'}>
        <Loader />
      </div>
    )
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
