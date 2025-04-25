import React, { ReactNode } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { selectUserId } from '@/entities/auth/model/auth.slice'
import { MobileAppMenu } from '@/features/navigation'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { PageLayout } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

export const WrapperPageLayout = ({ children }: { children: ReactNode }) => {
  const userId = useAppSelector(selectUserId)
  const router = useRouter()
  const isViewPostPage = router.pathname.includes('/view')

  return (
    <PageLayout
      header={<Header />}
      mobileMenu={<MobileAppMenu />}
      sidebar={userId && !isViewPostPage ? <Sidebar /> : null}
    >
      {children}
    </PageLayout>
  )
}
