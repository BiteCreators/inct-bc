import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authApi, authSlice } from '@/entities/auth'
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

      document.cookie = `accessToken=${token};max-age=2678400;secure;path=/;samesite=lax`
      dispatch(authSlice.actions.setAccessToken(token))
      await router.push(`/profile/${userId}`)
    }
  }

  return { googleAuthHandler, validationCode }
}
