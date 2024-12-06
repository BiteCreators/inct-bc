import React from 'react'

import { UserHeader } from '@/features/user/ui/UserHeader'
import { CurrentUserTabs } from '@/widgets/current-user-tabs/ui/CurrentUserTabs'

export default function User() {
  return (
    <>
      <UserHeader />
      <CurrentUserTabs />
    </>
  )
}
