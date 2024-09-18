import React from 'react'

import { PageLayout } from '@/common/components/page-layout/PageLayout'
import { SignUpForm } from '@/features/auth'
import { NextPageWithLayout } from '@/pages/_app'
import { Header } from '@/widgets/header'

const SignUp: NextPageWithLayout = () => {
  return (
    <div className={'flex gap-4 flex-col justify-center w-[30%] min-w-[360px]'}>
      {/* <h1>SignUp</h1> */}
      <SignUpForm />
      {/* <Link href={'/auth/sign-up/private-policy'}> Private Police</Link> */}
    </div>
  )
}

SignUp.getLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mainClassName={'flex flex-col items-center justify-center '}>
      {page}
    </PageLayout>
  )
}

export default SignUp
