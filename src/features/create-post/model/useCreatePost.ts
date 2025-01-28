import { useEffect, useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { postsApi } from '@/entities/posts'
import { useScopedTranslation, useValidationLimit } from '@byte-creators/utils'

import { ImageData } from '../types'

export const useCreatePost = () => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(true)
  const [isOpenActionConfirmation, setIsOpenActionConfirmation] = useState(false)
  const [isDisableInput, setIsDisableInput] = useState(false)

  const [createPostImage, { isLoading: isLoadingCreate }] = postsApi.useCreatePostImageMutation()
  const [createPost] = postsApi.useCreatePostMutation()
  const [deletePostImage, { isLoading: isLoadingDelete }] = postsApi.useDeletePostImageMutation()

  const [uploadIds, setUploadIds] = useState<{ uploadId: string }[]>([])
  const [images, setImages] = useState<ImageData[]>([])

  const [apiError, setApiError] = useState<string>('')
  const { handleApiError } = useHandleApiError('Profile')
  const t = useScopedTranslation('Posts')
  const isLoading = isLoadingCreate || isLoadingDelete

  const { correct, handleChange, limit, value } = useValidationLimit({
    limit: 500,
    startText: '',
  })

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
      setImages(images => [
        ...images,
        {
          initialUrl: URL.createObjectURL(file),
          selectedFilter: 'original',
          totalFile: new File([], ''),
          totalUrl: '',
        },
      ])
    }
  }

  const uploadAllImages = async (file: File[]) => {
    const res = await createPostImage({ file }).unwrap()

    const uploadIds = res.images.map(image => ({
      uploadId: image.uploadId,
    }))

    return uploadIds
  }

  const handleDeleteImageUrl = (index: number) => {
    setImages(images => images.filter((_, i) => i !== index))
  }

  const handlePublish = async (uploadIds: { uploadId: string }[]) => {
    try {
      if (uploadIds && uploadIds.length < 10) {
        await createPost({
          childrenMetadata: uploadIds,
          description: value,
        }).unwrap()
        setIsOpenCreatePost(false)
        setUploadIds([])
        setImages([])
      }
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  const handleInteractOutside = (e: any) => {
    e.preventDefault()
    setIsOpenActionConfirmation(true)
  }

  const handleConfirm = () => {
    setIsOpenCreatePost(false)
    setUploadIds([])
    setImages([])
    if (uploadIds) {
      uploadIds.forEach(el => {
        deletePostImage({ uploadId: el.uploadId })
      })
    }
  }

  const handleBackWithoutSave = () => {
    setIsOpenActionConfirmation(true)
  }

  useEffect(() => {
    setIsDisableInput(images.length >= 9)
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
    setImages,
    setIsOpenActionConfirmation,
    setIsOpenCreatePost,
    t,
    uploadAllImages,
    value,
  }
}
