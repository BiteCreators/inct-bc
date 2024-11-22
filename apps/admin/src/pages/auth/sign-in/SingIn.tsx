import React from 'react'

import { SignInForm } from '@/features/auth/ui/SignInForm'

const SignIn = () => {
  return (
    <div className={'flex gap-4 flex-col justify-center w-full min-w-[290px] max-w-[380px]'}>
      <SignInForm />
    </div>
  )
}

export default SignIn
