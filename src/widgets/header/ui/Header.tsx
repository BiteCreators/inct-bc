import { cn } from '@/common/utils/cn'
import { LoginButton, SignupButton } from '@/features/auth'
import { LanguageSelect } from '@/features/internationalization'
import { AppLogo, HeaderMenu } from '@/features/navigation'
import { NotificationsButton } from '@/features/notifications'

//TODO: make auth feature, remove isAuth from props
export const Header = ({ isAuth }: { isAuth?: boolean }) => {
  return (
    <header
      className={cn(
        `
        flex justify-between align-middle
        md:px-16 px-[15px] py-3 h-[60px]
        border-b border-dark-300
        `
      )}
    >
      <div>
        <AppLogo />
      </div>
      <div className={'flex gap-6 md:gap-12'}>
        {isAuth && (
          <div className={'hidden md:block'}>
            <NotificationsButton />
          </div>
        )}
        <LanguageSelect />
        <div className={'block md:hidden'}>
          <HeaderMenu />
        </div>
        {!isAuth && (
          <div className={'gap-6 hidden md:flex'}>
            <LoginButton /> <SignupButton />
          </div>
        )}
      </div>
    </header>
  )
}
