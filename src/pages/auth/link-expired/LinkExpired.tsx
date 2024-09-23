import React from 'react'

import { AuthLayout } from '@/app/layouts/auth-layout'
import { Button } from '@/common/components/button/Button'
import { LinkExpiredWrapper } from '@/features/auth/ui/LinkExpiredWrapper'
import { NextPageWithLayout } from '@/pages/_app'

export const LinkExpired: NextPageWithLayout = () => {
  return (
    <div>
      <LinkExpiredWrapper>
        <Button className={'w-full'}>Resend Link</Button>
      </LinkExpiredWrapper>
    </div>
  )
}

LinkExpired.getLayout = AuthLayout

export default LinkExpired
