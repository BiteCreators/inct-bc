import type { AppProps } from 'next/app'

import React from 'react'

import { DefaultLayout } from '@/application/layouts/DefautlLayout'
import { Providers } from '@/application/providers'
import { wrapper } from '@/application/store'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'

import '@/application/styles/globals.css'
//TODO: remove this
// eslint-disable-next-line import/extensions
import '@byte-creators/ui-kit/styles'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

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
