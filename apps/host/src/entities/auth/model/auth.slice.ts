import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  accessToken: null | string
  userId: null | number
}

const initialState: InitialState = {
  accessToken: null,
  userId: null,
}

export const authSlice = createSlice({
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
