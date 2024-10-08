import React from 'react'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { cn } from '@/common/lib/utils/cn'
import { Button } from '@/common/ui'
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
      <LinkExpiredWrapper
        button={
          <Button
            className={cn('!w-full py-2.5 sm:py-2 full-width')}
            onClick={handleRedirect}
            style={{ width: '100%' }}
          >
            {t.sendLink}
          </Button>
        }
      />
    </div>
  )
}

LinkExpired.getLayout = AuthLayout

export default LinkExpired
