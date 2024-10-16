import React, { useEffect } from 'react'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { Loader } from '@/common/ui'
import { useGoogleAuth } from '@/features/auth/model/useGoogleAuth'

function GoogleAuth() {
  const { googleAuthHandler } = useGoogleAuth()

  useEffect(() => {
    googleAuthHandler()
  }, [googleAuthHandler])

  return <Loader />
}

GoogleAuth.getLayout = AuthLayout

export default GoogleAuth
