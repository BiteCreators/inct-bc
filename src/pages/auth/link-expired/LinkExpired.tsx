import React from 'react'

import { AuthLayout } from '@/app/layouts/auth-layout'
import { Button } from '@/common/components/button/Button'
import { LinkExpiredWrapper } from '@/features/auth/ui/LinkExpiredWrapper'
import { NextPageWithLayout } from '@/pages/_app'
import { useRouter } from 'next/router'

export const LinkExpired: NextPageWithLayout = () => {
  const router = useRouter()
  const { email } = router.query

  const handleRedirect = async () => {
    await router.push(`/auth/forgot-password?email=${email}`)
  }

  return (
    <div>
      <LinkExpiredWrapper>
        <Button onClick={handleRedirect}>BTN</Button>
      </LinkExpiredWrapper>
    </div>
  )
}

LinkExpired.getLayout = AuthLayout

export default LinkExpired
