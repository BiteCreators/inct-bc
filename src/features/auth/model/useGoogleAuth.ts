import { useCallback } from 'react'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { authApi, authSlice } from '@/entities/auth'
import * as jose from 'jose'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const useGoogleAuth = () => {
  const searchParams = useSearchParams()
  const validationCode = searchParams?.get('code') ?? null
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [googleAuth] = authApi.useGoogleAuthMutation()

  const googleAuthHandler = useCallback(async (): Promise<void> => {
    if (validationCode) {
      const { accessToken: token } = await googleAuth({ code: validationCode }).unwrap()

      const { userId } = jose.decodeJwt(token)

      document.cookie = `accessToken=${token};max-age=2678400;secure;path=/;samesite=lax`
      dispatch(authSlice.actions.setAccessToken(token))
      await router.push(`/profile/${userId}`)
    }
  }, [validationCode, dispatch, googleAuth, router])

  return { googleAuthHandler, validationCode }
}
