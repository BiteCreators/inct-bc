import React from 'react'

import Link from 'next/link'

export default function Auth() {
  return (
    <div className={'flex gap-4 flex-col'}>
      <h1>Auth</h1>
      <Link href={'/auth/sign-up'}>SignUp</Link>
      <Link href={'/auth/sign-in'}>SignIn</Link>
      <Link href={'/auth/create-new-password'}>Create new password</Link>
      <Link href={'/auth/link-expired'}>link-expired</Link>
    </div>
  )
}
