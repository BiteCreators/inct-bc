import React, { useEffect, useState } from 'react'

import { authApi } from '@/common/api/auth.api'
import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { Loader } from '@/common/ui'
import { authSlice } from '@/features/auth/model/auth.slice'
import { useSearchParams } from 'next/navigation'
import Router from 'next/router'

type Props = {}
export default function Google(props: Props) {
  const searchParams = useSearchParams()
  const validationCode = searchParams?.get('code') ?? null
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const [googleAuth, { data: googleData }] = authApi.useGoogleAuthMutation()
  const [meResponse] = authApi.useLazyMeQuery()

  const isAuth = useAppSelector(authSlice.selectors.selectAccessToken)

  const googleAuthHandler = async () => {
    if (isAuth) {
      const { userId } = await meResponse().unwrap()

      await Router.push(`/profile?id=${userId}`)
    } else if (validationCode) {
      const { accessToken: token } = await googleAuth({ code: validationCode }).unwrap()

      const { userId } = await meResponse().unwrap()

      document.cookie = `accessToken=${token};max-age=3600;secure;path=/;samesite=strict`
      dispatch(authSlice.actions.setAccessToken(token))
      await Router.push(`/profile/${userId}`)
    }
  }

  return <Loader />
}
