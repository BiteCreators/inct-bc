import React from 'react'

import { PageLayout } from '@/common/components/page-layout/PageLayout'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export const DefaultLayout = (page: React.ReactElement) => {
  return (
    <PageLayout footer={<div>footer</div>} header={<Header />} sidebar={<Sidebar />}>
      {page}
    </PageLayout>
  )
}
