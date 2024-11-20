import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { useLogout } from '@/features/auth/lib/hooks/useLogout'
import {
  BookmarkOutline,
  LogOut,
  PersonOutline,
  PlusSquareOutline,
  SettingsOutline,
  TrendingUp,
} from '@packages/shared/assets/icons/components'
import { useScopedTranslation } from '@packages/shared/hooks/useTranslation'
import { Dropdown } from '@packages/shared/ui'
import { ActionConfirmation } from '@packages/shared/ui/action-confirmation/ActionComfiirmation'
import { DropdownItem } from '@packages/shared/ui/dropdown/Dropdown'
import { useRouter } from 'next/router'

export const HeaderMenu = () => {
  const router = useRouter()
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const tAuth = useScopedTranslation('Auth')
  const tNav = useScopedTranslation('Navigation')

  const { confirmOpen, handleConfirm, handleLogout, handleReject, isLoading, me, setConfirmOpen } =
    useLogout()

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
      <ActionConfirmation
        isOpen={confirmOpen}
        message={`${tAuth.areYouSureYouWantToLogout} "${me?.email}"?`}
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={tAuth.logOut}
      />
    </nav>
  )
}
