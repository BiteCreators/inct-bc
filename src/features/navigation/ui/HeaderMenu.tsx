import { authApi } from '@/common/api/auth.api'
import {
  BookmarkOutline,
  LogOut,
  PersonOutline,
  PlusSquareOutline,
  SettingsOutline,
  TrendingUp,
} from '@/common/assets/icons/components'
import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Dropdown } from '@/common/ui'
import { DropdownItem } from '@/common/ui/dropdown/Dropdown'
import { authSlice } from '@/features/auth/model/auth.slice'
import { useRouter } from 'next/router'

export const HeaderMenu = () => {
  const router = useRouter()
  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  const tAuth = useScopedTranslation('Auth')
  const tNav = useScopedTranslation('Navigation')

  const dispatch = useAppDispatch()
  const [logout] = authApi.useLogoutMutation()

  if (router.pathname.startsWith('/auth') && router.pathname !== '/auth') {
    return null
  }

  const handleLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(() => {
          document.cookie = `accessToken=;expires=${new Date(0)}`
          dispatch(authSlice.actions.setAccessToken(null))
        })
    } catch (err) {
      console.log('Logout error', err)
    }
  }

  const loggedInItems: DropdownItem[] = [
    {
      icon: <SettingsOutline />,
      label: tNav.profileSettings,
      onClick: async () => {
        await router.push('/profile-settings')
      },
    },
    {
      icon: <TrendingUp />,
      label: tNav.statistics,
      onClick: async () => {
        await router.push('/statistics')
      },
    },
    {
      icon: <BookmarkOutline />,
      label: tNav.favorites,
      onClick: async () => {
        await router.push('/favorites')
      },
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
      onClick: async () => {
        try {
          await router.push('/auth/sign-in')
        } catch (err) {
          console.log('Sign In error', err)
        }
      },
    },
    {
      icon: <PlusSquareOutline />,
      label: tAuth.signUp,
      onClick: async () => {
        try {
          await router.push('/auth/sign-up')
        } catch (err) {
          console.log('Sign Up error', err)
        }
      },
    },
  ]

  const items = isAuth ? loggedInItems : loggedOutItems

  return <Dropdown className={'ml-6 -mt-0.5'} items={items} />
}
