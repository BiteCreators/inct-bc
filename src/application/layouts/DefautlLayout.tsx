import React from 'react'

import { MobileAppMenu } from '@/features/navigation'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { PageLayout } from '@byte-creators/ui-kit'

export const DefaultLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mobileMenu={<MobileAppMenu />} sidebar={<Sidebar />}>
      {page}
    </PageLayout>
  )
}
