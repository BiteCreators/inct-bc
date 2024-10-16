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
import { Alert, Dropdown, Loader } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { authSlice } from '@/entities/auth'
import { useLogout } from '@/features/auth/lib/hooks/useLogout'
import { useRouter } from 'next/router'

export const HeaderMenu = () => {
  const router = useRouter()
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const tAuth = useScopedTranslation('Auth')
  const tNav = useScopedTranslation('Navigation')

  const { apiError, confirmOpen, handleConfirm, handleLogout, handleReject, me, setConfirmOpen } =
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
      {!!apiError && <Alert message={apiError} purpose={'toast'} type={'error'} />}
    </nav>
  )
}
