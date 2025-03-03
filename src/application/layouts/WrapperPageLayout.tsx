import React, { ReactNode } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { selectUserId } from '@/entities/auth/model/auth.slice'
import { MobileAppMenu } from '@/features/navigation'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { PageLayout } from '@byte-creators/ui-kit'

export const WrapperPageLayout = ({ children }: { children: ReactNode }) => {
  const userId = useAppSelector(selectUserId)

  return (
    <PageLayout
      header={<Header />}
      mobileMenu={<MobileAppMenu />}
      sidebar={userId ? <Sidebar /> : null}
    >
      {children}
    </PageLayout>
  )
}
