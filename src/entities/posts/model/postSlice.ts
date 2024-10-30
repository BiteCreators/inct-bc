import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSSRPostLoading: false,
}

export const postSlice = createSlice({
  initialState,
  name: 'postSlice',
  reducers: {
    changeStatusSSRPostLoading: (state, action: PayloadAction<boolean>) => {
      state.isSSRPostLoading = action.payload
    },
  },
})
