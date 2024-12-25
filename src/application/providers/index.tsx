import React from 'react'

import { Store } from '@reduxjs/toolkit'

import { AuthProvider } from './AuthProvider'
import { ReduxProvider } from './ReduxProvider'

type Props = {
  children: React.ReactNode
  store: Store
}

export const Providers = ({ children, store }: Props) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </ReduxProvider>
  )
}
