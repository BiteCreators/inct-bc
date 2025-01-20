import React from 'react'

import { Store } from '@reduxjs/toolkit'

import { ReduxProvider } from '../store/ReduxProvider'
import { AuthProvider } from './AuthProvider'

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
