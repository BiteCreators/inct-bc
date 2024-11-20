import React, { useEffect } from 'react'

import { AuthLayout } from '@/application/layouts/AuthLayout'
import { useGoogleAuth } from '@/features/auth/model/useGoogleAuth'
import { Loader } from '@packages/shared/ui'

function GoogleAuth() {
  const { googleAuthHandler } = useGoogleAuth()

  useEffect(() => {
    googleAuthHandler()
  }, [googleAuthHandler])

  return <Loader />
}

GoogleAuth.getLayout = AuthLayout

export default GoogleAuth
