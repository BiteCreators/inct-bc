import React from 'react'

import { PageLayout } from '@/common/ui'
import { MobileAppMenu } from '@/features/navigation'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export const DefaultLayout = (page: React.ReactElement) => {
  return (
    <PageLayout
      footer={<div>footer</div>}
      header={<Header />}
      mobileMenu={<MobileAppMenu />}
      sidebar={<Sidebar />}
    >
      {page}
    </PageLayout>
  )
}
