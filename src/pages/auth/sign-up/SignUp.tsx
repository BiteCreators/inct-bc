import React from 'react'

import Link from 'next/link'

export default function SignUp() {
  return (
    <div className={'flex gap-4 flex-col'}>
      <h1>SignUp</h1>
      <Link href={'/auth/sign-up/private-policy'}> Private Police</Link>
    </div>
  )
}
