import React from 'react'

import { Store } from '@reduxjs/toolkit'
import dynamic from 'next/dynamic'

import { AuthProvider } from './AuthProvider'
import { ReduxProvider } from './ReduxProvider'

const AdminProviders = dynamic(() => import('admin/providers').then(mod => mod.Providers))

type Props = {
  children: React.ReactNode
  store: Store
}

export const Providers = ({ children, store }: Props) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <AdminProviders>{children}</AdminProviders>
      </AuthProvider>
    </ReduxProvider>
  )
}
