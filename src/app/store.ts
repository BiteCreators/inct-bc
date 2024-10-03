import { inctagramApi } from '@/common/api/inct.api'
import { authSlice } from '@/features/auth/model/auth.slice'
import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  blacklist: ['inctagramApi'],
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [inctagramApi.reducerPath]: inctagramApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(inctagramApi.middleware),
    reducer: persistedReducer,
  })

export const persistedStore = () => persistStore(makeStore())

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
