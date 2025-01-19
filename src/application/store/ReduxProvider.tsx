import React from 'react'
import { Provider } from 'react-redux'

import { Store } from '@reduxjs/toolkit'

type Props = {
  children: React.ReactNode
  store: Store
}

export const ReduxProvider = ({ children, store }: Props) => {
  return <Provider store={store}>{children}</Provider>
}
