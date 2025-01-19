import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { authSlice, decodeAccessToken, provideAuthState } from '@/entities/auth'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookie, _, removeCookie] = useCookies(['accessToken'])
  const dispatch = useAppDispatch()

  useEffect(() => {
    provideAuthState({ accessToken: cookie.accessToken, dispatch })
  }, [cookie, dispatch, removeCookie])

  return children
}
