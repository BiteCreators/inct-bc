import { ImageData } from '@/features/create-post/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
  apiError: string
  images: ImageData[]
  isDisableInput: boolean
  isOpenActionConfirmation: boolean
  isOpenCreatePost: boolean
  selectedImage: null | number
  step: number
  uploadIds: { uploadId: string }[]
}

const initialState: State = {
  apiError: '',
  images: [],
  isDisableInput: false,
  isOpenActionConfirmation: false,
  isOpenCreatePost: true,
  selectedImage: null,
  step: 1,
  uploadIds: [],
}

export const createPostSlice = createSlice({
  initialState,
  name: 'createPost',
  reducers: {
    setApiError(state, action: PayloadAction<string>) {
      state.apiError = action.payload
    },
    setImages(state, action: PayloadAction<ImageData[]>) {
      state.images = action.payload
    },
    setIsDisableInput(state, action: PayloadAction<boolean>) {
      state.isDisableInput = action.payload
    },
    setIsOpenActionConfirmation(state, action: PayloadAction<boolean>) {
      state.isOpenActionConfirmation = action.payload
    },
    setIsOpenCreatePost(state, action: PayloadAction<boolean>) {
      state.isOpenCreatePost = action.payload
    },
    setSelectedImage(state, action: PayloadAction<null | number>) {
      state.selectedImage = action.payload
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    },
    setUploadIds(state, action: PayloadAction<{ uploadId: string }[]>) {
      state.uploadIds = action.payload
    },
  },
})
