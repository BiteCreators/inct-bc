import React from 'react'

import { PageLayout } from '@/common/components/page-layout/PageLayout'
import { EmailConfirmed } from '@/features/auth/ui/EmailConfirmed'
import { NextPageWithLayout } from '@/pages/_app'
import { Header } from '@/widgets/header'

const RegistrationConfirmation: NextPageWithLayout = () => {
  return <EmailConfirmed />
}

//TODO: rewrite with get auth layout
RegistrationConfirmation.getLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mainClassName={'flex flex-col items-center justify-center '}>
      {page}
    </PageLayout>
  )
}

export default RegistrationConfirmation
