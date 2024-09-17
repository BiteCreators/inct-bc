import type { AppProps } from 'next/app'

import React from 'react'

import { PageLayout } from '@/common/components/page-layout/PageLayout'
import { Header } from '@/widgets/header'
import { NextPage } from 'next'

import '@/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

const DefaultLayout = (page: React.ReactElement) => {
  return (
    <PageLayout
      footer={<div>footer test</div>}
      header={<Header />}
      sidebar={<div>sidebar test</div>}
    >
      {page}
    </PageLayout>
  )
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? DefaultLayout

  return getLayout(<Component {...pageProps} />)
}
