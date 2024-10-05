import React, { useEffect } from 'react'

import { Loader } from '@/common/ui'
import { useGoogleAuth } from '@/features/auth/model/useGoogleAuth'

export default function GoogleAuth() {
  const { googleAuthHandler, validationCode } = useGoogleAuth()

  useEffect(() => {
    googleAuthHandler()
  }, [validationCode])

  return <Loader />
}
