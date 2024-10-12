import { inctagramApi } from '@/common/api/inct.api'
import { locationApi } from '@/common/api/location.api'
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
  blacklist: ['inctagramApi', 'locationApi'],
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [inctagramApi.reducerPath]: inctagramApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
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
      }).concat(inctagramApi.middleware, locationApi.middleware),
    reducer: persistedReducer,
  })

const store = makeStore()

export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
