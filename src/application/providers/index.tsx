import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { Store } from '@reduxjs/toolkit'

import 'react-loading-skeleton/dist/skeleton.css'

import { ReduxProvider } from '../store/ReduxProvider'
import { AuthProvider } from './AuthProvider'

type Props = {
  children: React.ReactNode
  store: Store
}

export const Providers = ({ children, store }: Props) => {
  return (
    <ReduxProvider store={store}>
      <SkeletonTheme baseColor={'#202020'} highlightColor={'#444'}>
        <AuthProvider>{children}</AuthProvider>
      </SkeletonTheme>
    </ReduxProvider>
  )
}
