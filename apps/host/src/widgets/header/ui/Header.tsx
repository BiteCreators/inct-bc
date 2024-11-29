import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { SignInButton, SignUpButton } from '@/features/auth'
import { LanguageSelect } from '@/features/internationalization'
import { AppLogo } from '@/features/navigation'
import { NotificationsButton } from '@/features/notifications'
import { AppBar } from '@packages/shared/ui'
import { cn } from '@packages/shared/utils/cn'
import { useRouter } from 'next/router'

import { HeaderMenu } from './HeaderMenu'

export const Header = () => {
  const accessToken = useAppSelector(authSlice.selectors.selectAccessToken)
  const router = useRouter()
  const isAuthPage = router.pathname.startsWith('/auth') && router.pathname !== '/auth'

  return (
    <AppBar
      authContent={<NotificationsButton />}
      content={<LanguageSelect />}
      isAuth={!!accessToken}
      isAuthPage={isAuthPage}
      logo={<AppLogo />}
      mobileMenu={<HeaderMenu />}
      unAuthContent={
        <div className={'flex gap-6'}>
          <SignInButton /> <SignUpButton />
        </div>
      }
    />
  )
}
