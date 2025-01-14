import React, { useEffect, useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { postsApi } from '@/entities/posts'
import { useScopedTranslation, useValidationLimit } from '@byte-creators/utils'

import { ImageData } from '../types'

export const useCreatePost = () => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(true)
  const [isOpenActionConfirmation, setIsOpenActionConfirmation] = useState(false)
  const [isDisableInput, setIsDisableInput] = useState(false)

  const [createPostImage, { isLoading }] = postsApi.useCreatePostImageMutation()
  const [createPost] = postsApi.useCreatePostMutation()
  const [deletePostImage] = postsApi.useDeletePostImageMutation()

  const [uploadIds, setUploadIds] = useState<{ uploadId: string }[]>([])
  const [images, setImages] = useState<ImageData[]>([])

  const [apiError, setApiError] = useState<string>('')
  const { handleApiError } = useHandleApiError('Profile')
  const t = useScopedTranslation('Posts')

  const { correct, handleChange, limit, value } = useValidationLimit({
    limit: 500,
    startText: '',
  })

  useEffect(() => {
    if(uploadIds.length > 0){
      handlePublish()
    }
  }, [uploadIds]);

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
          selectedFilter: '',
          totalUrl: '',
        },
      ])
    }
  }

  const uploadImageForPost = async (file: File | null) => {
    if (file) {
      const res = await createPostImage({ file }).unwrap()

      setUploadIds(imagesId => [...imagesId, { uploadId: res.images[0].uploadId }])
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

  const handlePublish = async () => {
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
