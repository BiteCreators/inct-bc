import React from 'react'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { CreateNewPasswordForm } from '@/features/auth/ui/CreateNewPasswordForm'
import { NextPageWithLayout } from '@/pages/_app'

const CreateNewPassword: NextPageWithLayout = () => {
  return (
    <div>
      <CreateNewPasswordForm />
    </div>
  )
}

CreateNewPassword.getLayout = AuthLayout

export default CreateNewPassword
