import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  accesToken: null | string
}

const initialState: InitialState = {
  accesToken: null,
}

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAccessToken: (state, action: PayloadAction<null | string>) => {
      state.accesToken = action.payload
    },
  },
  selectors: {
    selectAccessToken: state => state.accesToken,
  },
})
