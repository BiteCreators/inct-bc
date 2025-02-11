import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { UsersSearch } from '@/features/users-search/ui/UsersSearch'
import { useRouter } from 'next/router'

export default function Search() {
  // const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)
  // const router = useRouter()
  //
  // const handleRedirect = async () => {
  //   await router.push('/auth/sign-in')
  // }
  //
  // if (!isAuth) {
  //   handleRedirect()
  //
  //   return
  // }

  return <UsersSearch />
}
