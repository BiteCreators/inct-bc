// import React from 'react'

// export default function Profile() {
//   return <>Profile</>
// }
import React from 'react'

import { PageLayout } from '@/common/ui'
import { EditProfileForm } from '@/features/edit-profile/ui/editProfileForm'
import { NextPageWithLayout } from '@/pages/_app'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

const Profile: NextPageWithLayout = () => {
  return <EditProfileForm />
}

Profile.getLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mainClassName={'mb-5'} sidebar={<Sidebar />}>
      {page}
    </PageLayout>
  )
}

export default Profile
