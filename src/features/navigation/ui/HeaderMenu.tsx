import {
  BookmarkOutline,
  LogOut,
  PersonOutline,
  PlusSquareOutline,
  SettingsOutline,
  TrendingUp,
} from '@/common/assets/icons/components'
import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Dropdown } from '@/common/ui'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { useLogout } from '@/features/auth/lib/hooks/useLogout'
import { authSlice } from '@/features/auth/model/auth.slice'
import { useRouter } from 'next/router'

export const HeaderMenu = () => {
  const router = useRouter()
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const tAuth = useScopedTranslation('Auth')
  const tNav = useScopedTranslation('Navigation')

  const { handleLogout } = useLogout()

  if (router.pathname.startsWith('/auth') && router.pathname !== '/auth') {
    return null
  }

  const loggedInItems: DropdownItem[] = [
    {
      icon: <SettingsOutline />,
      label: tNav.profileSettings,
      onClick: () => router.push('/profile-settings'),
    },
    {
      icon: <TrendingUp />,
      label: tNav.statistics,
      onClick: () => router.push('/statistics'),
    },
    {
      icon: <BookmarkOutline />,
      label: tNav.favorites,
      onClick: () => router.push('/favorites'),
    },
    {
      icon: <LogOut />,
      label: tAuth.logOut,
      onClick: handleLogout,
    },
  ]

  const loggedOutItems: DropdownItem[] = [
    {
      icon: <PersonOutline />,
      label: tAuth.signIn,
      onClick: () => router.push('/auth/sign-in'),
    },
    {
      icon: <PlusSquareOutline />,
      label: tAuth.signUp,
      onClick: () => router.push('/auth/sign-up'),
    },
  ]

  const items = isAuth ? loggedInItems : loggedOutItems

  return (
    <nav>
      <Dropdown className={'ml-6 -mt-0.5'} items={items} />
    </nav>
  )
}
