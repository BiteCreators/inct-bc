import React from 'react'

import { AuthLayout } from '@/app/layouts/auth-layout'
import { LinkExpiredForm } from '@/features/auth/ui/LinkExpiredForm'
import { NextPageWithLayout } from '@/pages/_app'

export const LinkExpired: NextPageWithLayout = () => {
  return (
    <div>
      <LinkExpiredForm />
    </div>
  )
}

LinkExpired.getLayout = AuthLayout

export default LinkExpired
