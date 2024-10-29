import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

export const postSlice = createSlice({
  initialState,
  name: 'postSlice',
  reducers: {
    changeStatusLoading: (state, action: PayloadAction<boolean>) => {
      debugger
      state.isLoading = action.payload
    },
  },
})

export const { changeStatusLoading } = postSlice.actions
