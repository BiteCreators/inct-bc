import React from 'react'

import { SignInForm } from '@/features/auth/ui/SignInForm'

import cl from '../sign-in/sign-in.module.scss'

const SignIn = () => {
  return (
    <div className={cl.container}>
      <SignInForm />
    </div>
  )
}

export default SignIn
