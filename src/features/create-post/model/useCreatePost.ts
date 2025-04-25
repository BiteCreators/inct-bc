import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { postsApi } from '@/entities/posts'
import { createPostSlice } from '@/entities/posts/model/createPostSlice'
import { useScopedTranslation, useValidationLimit } from '@byte-creators/utils'

export const useCreatePost = () => {
  const dispatch = useAppDispatch()
  const [createPostImage, { isLoading: isLoadingCreate }] = postsApi.useCreatePostImageMutation()
  const [createPost] = postsApi.useCreatePostMutation()
  const [deletePostImage, { isLoading: isLoadingDelete }] = postsApi.useDeletePostImageMutation()
  const [apiError, setApiError] = useState<string>('')
  const { handleApiError } = useHandleApiError('Profile')
  const t = useScopedTranslation('Posts')
  const isLoading = isLoadingCreate || isLoadingDelete
  const createPostState = useAppSelector(state => state.createPost)
  const { images, isDisableInput, isOpenActionConfirmation, isOpenCreatePost, uploadIds } =
    createPostState

  const { correct, handleChange, limit, value } = useValidationLimit({
    limit: 500,
    startText: '',
  })

  useEffect(() => {
    if (uploadIds.length > 0) {
      handlePublish()
    }
  }, [uploadIds])

  const addImageUrlForPost = ({
    file,
    handleNext,
  }: {
    file: File | null
    handleNext: () => void
  }) => {
    if (file) {
      if (images.length === 0) {
        handleNext()
      }
      dispatch(
        createPostSlice.actions.setImages([
          ...images,
          {
            initialUrl: URL.createObjectURL(file),
            selectedFilter: '',
            totalUrl: '',
          },
        ])
      )
    }
  }

  const uploadAllImages = async (file: File[]) => {
    const res = await createPostImage({ file }).unwrap()

    const uploadIds = res.images.map(image => ({
      uploadId: image.uploadId,
    }))

    dispatch(createPostSlice.actions.setUploadIds(uploadIds))
  }

  const handleDeleteImageUrl = (index: number) => {
    dispatch(createPostSlice.actions.setImages(images.filter((_, i) => i !== index)))
  }

  const handlePublish = async () => {
    try {
      if (uploadIds && uploadIds.length < 9) {
        await createPost({
          childrenMetadata: uploadIds,
          description: value,
        }).unwrap()
        dispatch(createPostSlice.actions.setIsOpenCreatePost(false))
        dispatch(createPostSlice.actions.setUploadIds([]))
        dispatch(createPostSlice.actions.setImages([]))
      }
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  const handleInteractOutside = (e: any) => {
    e.preventDefault()
    dispatch(createPostSlice.actions.setIsOpenActionConfirmation(true))
  }

  const handleConfirm = () => {
    dispatch(createPostSlice.actions.setIsOpenCreatePost(false))
    dispatch(createPostSlice.actions.setUploadIds([]))
    dispatch(createPostSlice.actions.setImages([]))
    if (uploadIds) {
      uploadIds.forEach(el => {
        deletePostImage({ uploadId: el.uploadId })
      })
    }
  }

  const handleBackWithoutSave = () => {
    dispatch(createPostSlice.actions.setIsOpenActionConfirmation(true))
  }

  useEffect(() => {
    dispatch(createPostSlice.actions.setIsDisableInput(images.length >= 8))
  }, [images])

  return {
    addImageUrlForPost,
    apiError,
    correct,
    handleBackWithoutSave,
    handleChange,
    handleConfirm,
    handleDeleteImageUrl,
    handleInteractOutside,
    handlePublish,
    images,
    isDisableInput,
    isLoading,
    isOpenActionConfirmation,
    isOpenCreatePost,
    limit,
    t,
    uploadAllImages,
    value,
  }
}
