import { useCallback } from 'react'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { authApi, authSlice, decodeAccessToken } from '@/entities/auth'
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

      const { userId } = decodeAccessToken(token)

      if (!userId) {
        //TODO: handle no user id
        return
      }

      document.cookie = `accessToken=${token};max-age=2678400;secure;path=/;samesite=lax`
      dispatch(authSlice.actions.setCredentials({ accessToken: token, userId }))
      await router.push(`/profile/${userId}`)
    }
  }, [validationCode, dispatch, googleAuth, router])

  return { googleAuthHandler, validationCode }
}
