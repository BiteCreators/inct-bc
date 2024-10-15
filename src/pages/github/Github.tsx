import React from 'react'

import { AuthLayout } from '@/app/layouts/AuthLayout'
import { NextPageWithLayout } from '@/pages/_app'
import Router, { useRouter } from 'next/router'

const Github: NextPageWithLayout = () => {
  const router = useRouter()

  if (router.query.accessToken) {
    document.cookie = `accessToken=${router.query.accessToken};max-age=2678400;secure;path=/;samesite=lax`
    Router.push('/')
  }

  return <div>GitHub</div>
}

Github.getLayout = AuthLayout

export default Github
