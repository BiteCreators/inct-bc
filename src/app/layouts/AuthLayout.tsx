import React from 'react'

import { PageLayout } from '@/common/ui'
import { Header } from '@/widgets/header'

export const AuthLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mainClassName={'flex flex-col items-center justify-center '}>
      {page}
    </PageLayout>
  )
}
