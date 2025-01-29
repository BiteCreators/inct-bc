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
    //TODO: remove ts ignore
    builder.addCase(HYDRATE, (state, action) => {
      //@ts-ignore
      state.userId = action.payload.auth.userId
      //@ts-ignore
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
