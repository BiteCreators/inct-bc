import React from 'react'
import { useCookies } from 'react-cookie'

import { useAppDispatch } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookie] = useCookies(['accessToken'])
  const dispath = useAppDispatch()

  if (cookie.accessToken) {
    dispath(authSlice.actions.setAccessToken(cookie.accessToken))
  }

  return children
}
