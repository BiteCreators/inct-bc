import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { cn } from '@/common/lib/utils/cn'
import { SignInButton, SignUpButton } from '@/features/auth'
import { authSlice } from '@/features/auth/model/auth.slice'
import { LanguageSelect } from '@/features/internationalization'
import { AppLogo, HeaderMenu } from '@/features/navigation'
import { NotificationsButton } from '@/features/notifications'
import { useRouter } from 'next/router'

export const Header = () => {
  const accessToken = useAppSelector(authSlice.selectors.selectAccessToken)
  const router = useRouter()
  const isAuthPage = router.pathname.startsWith('/auth') && router.pathname !== '/auth'

  return (
    <header
      className={cn(
        'flex justify-between align-middle',
        'md:px-16 px-[15px] py-3 h-[60px]',
        'border-b border-dark-300 bg-dark-700'
      )}
    >
      <div>
        <AppLogo />
      </div>
      <div className={cn(['flex', !isAuthPage && 'gap-6', 'md:gap-12'])}>
        {accessToken && (
          <div className={'hidden md:block'}>
            <NotificationsButton />
          </div>
        )}
        <LanguageSelect />
        <div className={'block md:hidden'}>
          <HeaderMenu />
        </div>
        {!accessToken && (
          <div className={'gap-6 hidden global-hover:md:flex'}>
            <SignInButton /> <SignUpButton />
          </div>
        )}
      </div>
    </header>
  )
}
