import React from 'react'
import { Provider } from 'react-redux'

import { Store } from '@reduxjs/toolkit'
import { PersistGate } from 'redux-persist/integration/react'

import { persistedStore } from '../store'

type Props = {
  children: React.ReactNode
  store: Store
}

export const ReduxProvider = ({ children, store }: Props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>{children}</PersistGate>
    </Provider>
  )
}
