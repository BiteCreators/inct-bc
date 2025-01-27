import { RootState } from '@/application/store'
import { Action, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}
