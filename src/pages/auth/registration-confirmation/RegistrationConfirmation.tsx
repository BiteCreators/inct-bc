import React from 'react'

import { AuthLayout } from '@/application/layouts/AuthLayout'
import { EmailConfirmed } from '@/features/auth/ui/EmailConfirmed'
import { NextPageWithLayout } from '@/pages/_app'

const RegistrationConfirmation: NextPageWithLayout = () => {
  return <EmailConfirmed />
}

RegistrationConfirmation.getLayout = AuthLayout

export default RegistrationConfirmation
