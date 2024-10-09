import type { AppProps } from 'next/app'

import React from 'react'
import { Provider } from 'react-redux'

import { DefaultLayout } from '@/app/layouts/DefautlLayout'
import { persistedStore, wrapper } from '@/app/store'
import { NextPage } from 'next'
import { PersistGate } from 'redux-persist/integration/react'

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
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        {getLayout(<Component {...props.pageProps} />)}
      </PersistGate>
    </Provider>
  )
}
