import React from 'react'

import { WrapperPageLayout } from '@/application/layouts/WrapperPageLayout'

export const DefaultLayout = (page: React.ReactElement) => {
  return <WrapperPageLayout>{page}</WrapperPageLayout>
}
