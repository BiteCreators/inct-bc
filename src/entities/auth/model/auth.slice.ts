import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

type InitialState = {
  accessToken: null | string
  userId: null | number
}

const initialState: InitialState = {
  accessToken: null,
  userId: null,
}

export const authSlice = createSlice({
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action) => {
      state.userId = action.payload.auth.userId
      state.accessToken = action.payload.auth.accessToken
    })
  },
  initialState,
  name: 'auth',
  reducers: {
    logout: state => {
      state.accessToken = null
      state.userId = null
    },
    setCredentials: (state, action: PayloadAction<{ accessToken: string; userId: number }>) => {
      state.accessToken = action.payload.accessToken
      state.userId = action.payload.userId
    },
  },
  selectors: {
    selectAccessToken: state => state.accessToken,
    selectUserId: state => state.userId,
  },
})

export const { selectAccessToken, selectUserId } = authSlice.selectors
