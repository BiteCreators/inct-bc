import React from 'react'

import { AuthLayout } from '@/app/layouts/auth-layout'
import { Button } from '@/common/components/button/Button'
import { LinkExpiredFormWrapper } from '@/features/auth/ui/LinkExpiredFormWrapper'
import { NextPageWithLayout } from '@/pages/_app'

export const LinkExpired: NextPageWithLayout = () => {
  return (
    <div>
      <LinkExpiredFormWrapper>
        <Button className={'w-full'}>Resend Link</Button>
      </LinkExpiredFormWrapper>
    </div>
  )
}

LinkExpired.getLayout = AuthLayout

export default LinkExpired
