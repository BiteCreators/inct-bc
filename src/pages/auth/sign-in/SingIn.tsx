import React from 'react'

import { PageLayout } from '@/common/components/page-layout/PageLayout'
import { SignInForm } from '@/features/auth/ui/SignInForm'
import { NextPageWithLayout } from '@/pages/_app'
import { Header } from '@/widgets/header'

const SignIn: NextPageWithLayout = () => {
  return (
    <div className={'flex gap-4 flex-col justify-center w-full min-w-[290px] max-w-[380px]'}>
      <SignInForm />
    </div>
  )
}

SignIn.getLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} mainClassName={'flex flex-col items-center justify-center '}>
      {page}
    </PageLayout>
  )
}

export default SignIn
