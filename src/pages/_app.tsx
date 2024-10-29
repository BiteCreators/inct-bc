import type { AppProps } from 'next/app'

import React from 'react'

import { DefaultLayout } from '@/app/layouts/DefautlLayout'
import { Providers } from '@/app/providers'
import { wrapper } from '@/app/store'
import { inter } from '@/fonts/fonts'
import { NextPage } from 'next'

import '@/app/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? DefaultLayout

  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Providers store={store}>
      <div className={inter.className}>{getLayout(<Component {...props.pageProps} />)}</div>
    </Providers>
  )
}
