import { LogOut } from '@/common/assets/icons/components'
import { cn } from '@/common/utils/cn'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'

export const LogoutButton = () => {
  const t = useScopedTranslation('Auth')

  return (
    <button
      className={cn(
        'flex gap-3 text-sm font-weight500',
        'transition-colors delay-[10ms]',
        'hover:text-primary-100'
      )}
    >
      <LogOut /> {t.logOut}
    </button>
  )
}
