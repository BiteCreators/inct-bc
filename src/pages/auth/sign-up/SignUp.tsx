import React from 'react'

import { AuthLayout } from '@/application/layouts/AuthLayout'
import { SignUpForm } from '@/features/auth'
import { NextPageWithLayout } from '@/pages/_app'

const SignUp: NextPageWithLayout = () => {
  return (
    <div className={'flex gap-4 flex-col justify-center w-[380px] '}>
      <SignUpForm />
      {/* <Link href={'/auth/sign-up/private-policy'}> Private Police</Link> */}
    </div>
  )
}

SignUp.getLayout = AuthLayout

export default SignUp
