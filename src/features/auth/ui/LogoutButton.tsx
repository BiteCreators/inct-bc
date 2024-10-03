import { LogOut } from '@/common/assets/icons/components'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { cn } from '@/common/lib/utils/cn'

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
