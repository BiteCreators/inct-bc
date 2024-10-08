import React from 'react'

import { useRouter } from 'next/router'

export default function CurrentProfile() {
  const router = useRouter()
  const { id } = router.query

  return <div>Profile ID : {id}</div>
}
