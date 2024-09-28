import React from 'react'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { Button } from '@/common/components/button/Button'
import { useScopedTranslation } from '@/common/utils/hooks/useTranslation'
import { LinkExpiredWrapper } from '@/features/auth/ui/LinkExpiredWrapper'
import { NextPageWithLayout } from '@/pages/_app'
import { useRouter } from 'next/router'

export const LinkExpired: NextPageWithLayout = () => {
  const router = useRouter()
  const { email } = router.query
  const t = useScopedTranslation('Auth')

  const handleRedirect = async () => {
    await router.push(`/auth/forgot-password?email=${email}`)
  }

  return (
    <div>
      <LinkExpiredWrapper button={<Button onClick={handleRedirect}>{t.sendLink}</Button>} />
    </div>
  )
}

LinkExpired.getLayout = AuthLayout

export default LinkExpired
