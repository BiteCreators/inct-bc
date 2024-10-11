import React from 'react'

import { PageLayout } from '@/common/ui'
import { EditProfileForm } from '@/features/edit-profile/ui/EditProfileForm'
import { NextPageWithLayout } from '@/pages/_app'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

const EditProfile: NextPageWithLayout = () => {
  return <EditProfileForm />
}

EditProfile.getLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mainClassName={'mb-5'} sidebar={<Sidebar />}>
      {page}
    </PageLayout>
  )
}

export default EditProfile
