import React from 'react'
import { useCookies } from 'react-cookie'

import { authApi } from '@/common/api/auth.api'
import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { Loader } from '@/common/ui'
import { authSlice } from '@/features/auth/model/auth.slice'
import { useRouter } from 'next/router'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //TODO: handle cookies on the server
  const [cookie] = useCookies(['accessToken'])
  const dispath = useAppDispatch()

  if (cookie.accessToken) {
    dispath(authSlice.actions.setAccessToken(cookie.accessToken))
  }

  return children
}
