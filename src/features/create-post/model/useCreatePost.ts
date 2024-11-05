import React, { useEffect, useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { postsApi } from '@/entities/posts'

export const useCreatePost = () => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(true)
  const [isOpenActionConfirmation, setIsOpenActionConfirmation] = useState(false)
  const [isDisableInput, setIsDisableInput] = useState(false)

  const [createPostImage, { isLoading }] = postsApi.useCreatePostImageMutation()
  const [createPost] = postsApi.useCreatePostMutation()
  const [deletePostImage] = postsApi.useDeletePostImageMutation()

  const [uploadIds, setUploadIds] = useState<{ uploadId: string }[]>([])
  const [images, setImages] = useState<
    { initialUrl: string; selectedFilter: string; totalUrl: string }[]
  >([])

  const [apiError, setApiError] = useState<string>('')
  const { handleApiError } = useHandleApiError('Profile')

  const [description, setDescription] = useState<string>('')

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
        { initialUrl: URL.createObjectURL(file), selectedFilter: '', totalUrl: '' },
      ])
    }
  }

  const uploadImageForPost = async (file: File | null) => {
    if (file) {
      try {
        const res = await createPostImage({ file }).unwrap()

        setUploadIds(imagesId => [...imagesId, { uploadId: res.images[0].uploadId }])
      } catch (error) {
        handleApiError({ error, setApiError })
      }
    }
  }

  const uploadAllImages = async (files: File[]) => {
    try {
      await files.reduce(async (promise, file) => {
        await promise // ждём завершения предыдущей загрузки

        return uploadImageForPost(file) // загружаем текущее изображение
      }, Promise.resolve())
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  const handleDeleteImageUrl = (index: number) => {
    setImages(images => images.filter((_, i) => i !== index))
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handlePublish = async () => {
    try {
      if (uploadIds && uploadIds.length < 10) {
        await createPost({
          childrenMetadata: uploadIds,
          description,
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
    handleBackWithoutSave,
    handleConfirm,
    handleDeleteImageUrl,
    handleDescriptionChange,
    handleInteractOutside,
    handlePublish,
    images,
    isDisableInput,
    isLoading,
    isOpenActionConfirmation,
    isOpenCreatePost,
    setApiError,
    setImages,
    setIsDisableInput,
    setIsOpenActionConfirmation,
    setIsOpenCreatePost,
    uploadAllImages,
    uploadIds,
  }
}
