import React from 'react'

import { AuthLayout } from '@/app/layouts/auth-layout'
import { SignUpForm } from '@/features/auth'
import { NextPageWithLayout } from '@/pages/_app'

const SignUp: NextPageWithLayout = () => {
  return (
    <div className={'flex gap-4 flex-col justify-center w-[30%] min-w-[360px]'}>
      {/* <h1>SignUp</h1> */}
      <SignUpForm />
      {/* <Link href={'/auth/sign-up/private-policy'}> Private Police</Link> */}
    </div>
  )
}

SignUp.getLayout = AuthLayout

export default SignUp
