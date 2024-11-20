import React from 'react'

import { AuthLayout } from '@/application/layouts/AuthLayout'
import { ForgotPasswordForm } from '@/features/auth'
import { NextPageWithLayout } from '@/pages/_app'

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  )
}

ForgotPassword.getLayout = AuthLayout

export default ForgotPassword
