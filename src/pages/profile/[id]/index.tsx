import React from 'react'

import { Profile } from '@/features/profile/Profile'
import { useRouter } from 'next/router'

export default function CurrentProfile() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Profile />
    </div>
  )
}
