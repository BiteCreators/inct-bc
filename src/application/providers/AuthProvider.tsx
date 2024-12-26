import React from 'react'
import { useCookies } from 'react-cookie'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { authSlice, decodeAccessToken } from '@/entities/auth'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookie, _, removeCookie] = useCookies(['accessToken'])
  const dispath = useAppDispatch()

  if (cookie.accessToken) {
    const { userId } = decodeAccessToken(cookie.accessToken)

    if (!userId) {
      removeCookie('accessToken')

      dispath(authSlice.actions.logout())

      return children
    }

    dispath(
      authSlice.actions.setCredentials({
        accessToken: cookie.accessToken,
        userId,
      })
    )
  } else {
    dispath(authSlice.actions.logout())
  }

  return children
}
