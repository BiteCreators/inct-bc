import { inctagramApi } from '@/common/api/inct.api'
import { locationApi } from '@/common/api/location.api'
import { authSlice } from '@/entities/auth'
import { postSlice } from '@/entities/posts'
import { paymentsSlice } from '@/features/payments'
import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [inctagramApi.reducerPath]: inctagramApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  payments: paymentsSlice.reducer,
  post: postSlice.reducer,
})

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(inctagramApi.middleware, locationApi.middleware),
    reducer: {
      auth: authSlice.reducer,
      [inctagramApi.reducerPath]: inctagramApi.reducer,
      [locationApi.reducerPath]: locationApi.reducer,
      payments: paymentsSlice.reducer,
      post: postSlice.reducer,
    },
  })

export const store = makeStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
