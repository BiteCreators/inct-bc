import React from 'react'

import { SignInForm } from '@/features/auth'

import cl from '../sign-in/sign-in.module.scss'

export const SignIn = () => {
  return (
    <div className={cl.container}>
      <SignInForm />
    </div>
  )
}
