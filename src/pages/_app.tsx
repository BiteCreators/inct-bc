import type { AppProps } from 'next/app'

import React from 'react'
import { Provider } from 'react-redux'

import { wrapper } from '@/app/store'
import { PageLayout } from '@/common/components/page-layout/PageLayout'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import { NextPage } from 'next'

import '@/app/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

const DefaultLayout = (page: React.ReactElement) => {
  return (
    <PageLayout footer={<div>footer</div>} header={<Header />} sidebar={<Sidebar />}>
      {page}
    </PageLayout>
  )
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? DefaultLayout

  const { props, store } = wrapper.useWrappedStore(rest)

  return <Provider store={store}>{getLayout(<Component {...props.pageProps} />)}</Provider>
}
