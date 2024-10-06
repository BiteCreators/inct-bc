import React, { useEffect } from 'react'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { Loader } from '@/common/ui'
import { useGoogleAuth } from '@/features/auth/model/useGoogleAuth'

function GoogleAuth() {
  const { googleAuthHandler, validationCode } = useGoogleAuth()

  useEffect(() => {
    //so that eslint doesn't swear
    ;(async () => {
      await googleAuthHandler()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationCode])

  return <Loader />
}

GoogleAuth.getLayout = AuthLayout

export default GoogleAuth
