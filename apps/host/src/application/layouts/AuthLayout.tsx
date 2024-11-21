import React from 'react'

import { Header } from '@/widgets/header'
import { PageLayout } from '@packages/shared/ui'

export const AuthLayout = (page: React.ReactElement) => {
  return (
    <PageLayout
      header={<Header />}
      mainClassName={'flex flex-col items-center justify-center pb-5 sm:pb-0'}
    >
      {page}
    </PageLayout>
  )
}
