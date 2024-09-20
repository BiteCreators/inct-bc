import React from 'react'

import Link from 'next/link'

export default function SingIn() {
  return (
    <>
      <h1>SignIn</h1>
      <Link href={'/auth/forgot-password'}>Forgot Password</Link>
    </>
  )
}
