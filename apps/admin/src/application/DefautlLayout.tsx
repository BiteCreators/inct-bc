import React from 'react'

import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'
import { PageLayout } from '@packages/shared/ui'

export const DefaultLayout = (page: React.ReactElement) => {
  return <PageLayout sidebar={<Sidebar />}>{page}</PageLayout>
}
