import type { AppProps } from 'next/app'

import React, { useEffect, useState } from 'react'

import { DefaultLayout } from '@/application/layouts/DefautlLayout'
import { Providers } from '@/application/providers'
import { wrapper } from '@/application/store'
import { LinearLoader } from '@byte-creators/ui-kit'
import { NextPage } from 'next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router' // Импорт лоадера
import '@/application/styles/globals.css'

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

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <Providers store={store}>
      <LinearLoader isLoading={isLoading} />
      <div className={inter.className}>{getLayout(<Component {...props.pageProps} />)}</div>
    </Providers>
  )
}
