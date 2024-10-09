import { authApi } from '@/common/api/auth.api'
import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/features/auth/model/auth.slice'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useGoogleAuth = () => {
  const searchParams = useSearchParams()
  const validationCode = searchParams?.get('code') ?? null
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [googleAuth] = authApi.useGoogleAuthMutation()
  const [meResponse] = authApi.useLazyMeQuery()

  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)

  const googleAuthHandler = async (): Promise<void> => {
    if (isAuth) {
      const { userId } = await meResponse().unwrap()

      await router.push(`/profile?id=${userId}`)
    } else if (validationCode) {
      const { accessToken: token } = await googleAuth({ code: validationCode }).unwrap()

      const { userId } = await meResponse().unwrap()

      document.cookie = `accessToken=${token};max-age=3600;secure;path=/;samesite=strict`
      dispatch(authSlice.actions.setAccessToken(token))
      await router.push(`/profile/${userId}`)
    }
  }

  return { googleAuthHandler, validationCode }
}
