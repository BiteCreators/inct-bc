import { cn } from '@/common/utils/cn'
import { LoginButton, SignupButton } from '@/features/auth'
import { LanguageSelect } from '@/features/internationalization'
import { AppLogo } from '@/features/navigation'
import { NotificationsButton } from '@/features/notifications'

//TODO: make auth feature, remove isAuth from props
export const Header = ({ isAuth }: { isAuth?: boolean }) => {
  return (
    <header
      className={cn(
        `
      flex justify-between align-middle
      px-16 py-3 h-[60px]
      border-b border-dark-300
      `
      )}
    >
      <div>
        <AppLogo />
      </div>
      <div className={'flex gap-[48px]'}>
        {isAuth && <NotificationsButton />}
        <LanguageSelect />
        {!isAuth && (
          <div className={'flex gap-6'}>
            <LoginButton /> <SignupButton />
          </div>
        )}
      </div>
    </header>
  )
}
