import { Avatars } from '@/common/api/profile.api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  avatars: Avatars[]
  currentAvatar?: Avatars | null
}

const initialState: InitialState = {
  avatars: [],
  currentAvatar: null,
}

export const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    deleteAvatar: (state, action: PayloadAction<string>) => {
      state.avatars = state.avatars.filter(avatar => avatar.url !== action.payload)
      if (state.currentAvatar?.url === action.payload) {
        state.currentAvatar = state.avatars.length > 0 ? state.avatars[0] : null
      }
    },
    setAvatar: (state, action: PayloadAction<Avatars>) => {
      state.avatars.push(action.payload)
      state.currentAvatar = action.payload
    },
  },
  selectors: {
    selectCurrentAvatar: state => state.currentAvatar,
  },
})

export const { deleteAvatar, setAvatar } = profileSlice.actions

export const selectCurrentAvatar = profileSlice.selectors.selectCurrentAvatar

export default profileSlice.reducer
