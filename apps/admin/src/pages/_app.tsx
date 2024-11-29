import type { AppProps } from 'next/app'

import { AuthProvider } from '@/application/providers/AuthProvider'
import { client } from '@/common/api/client'
import { ApolloProvider } from '@apollo/client'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  // const getLayout = Component.getLayout ?? DefaultLayout

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  )
}
