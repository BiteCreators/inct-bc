import React from 'react'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { SignInForm } from '@/features/auth/ui/SignInForm'
import { NextPageWithLayout } from '@/pages/_app'

const SignIn: NextPageWithLayout = () => {
  return (
    <div className={'flex gap-4 flex-col justify-center w-full min-w-[290px] max-w-[380px]'}>
      <SignInForm />
    </div>
  )
}

SignIn.getLayout = AuthLayout

export default SignIn
