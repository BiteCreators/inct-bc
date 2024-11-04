import React, { useEffect, useState } from 'react'

import { useHandleApiError } from '@/common/lib/hooks/useHanldeApiError'
import { postsApi } from '@/entities/posts'

export const useCreatePost = () => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(true)
  const [isOpenActionConfirmation, setIsOpenActionConfirmation] = useState(false)
  const [isDisableInput, setIsDisableInput] = useState(false)

  const [createPostImage] = postsApi.useCreatePostImageMutation()
  const [createPost] = postsApi.useCreatePostMutation()
  const [deletePostImage] = postsApi.useDeletePostImageMutation()

  const [imagesId, setImagesId] = useState<{ uploadId: string }[]>([])
  const [imagesUrl, setImagesUrl] = useState<string[]>([])

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
      if (imagesUrl.length === 0) {
        handleNext()
      }
      setImagesUrl(imagesUrl => [...imagesUrl, URL.createObjectURL(file)])
    }
  }

  const uploadImageForPost = async (file: File | null) => {
    if (file) {
      try {
        const res = await createPostImage({ file }).unwrap()

        setImagesId(imagesId => [...imagesId, { uploadId: res.images[0].uploadId }])
      } catch (error) {
        handleApiError({ error, setApiError })
      }
    }
  }

  const uploadAllImages = async (files: File[]) => {
    try {
      const uploadPromises = files.map(file => uploadImageForPost(file))

      await Promise.all(uploadPromises)
    } catch (error) {
      handleApiError({ error, setApiError })
    }
  }

  const handleDeleteImageUrl = (index: number) => {
    setImagesUrl(imagesUrl => imagesUrl.filter((_, i) => i !== index))
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handlePublish = async () => {
    try {
      if (imagesId && imagesId.length < 10) {
        await createPost({
          childrenMetadata: imagesId,
          description,
        }).unwrap()
        setIsOpenCreatePost(false)
        setImagesId([])
        setImagesUrl([])
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
    setImagesId([])
    setImagesUrl([])
    if (imagesId) {
      imagesId.forEach(el => {
        deletePostImage({ uploadId: el.uploadId })
      })
    }
  }

  const handleBackWithoutSave = () => {
    setIsOpenActionConfirmation(true)
  }

  useEffect(() => {
    setIsDisableInput(imagesUrl.length >= 9)
  }, [imagesUrl])

  return {
    addImageUrlForPost,
    apiError,
    handleBackWithoutSave,
    handleConfirm,
    handleDeleteImageUrl,
    handleDescriptionChange,
    handleInteractOutside,
    handlePublish,
    imagesUrl,
    isDisableInput,
    isOpenActionConfirmation,
    isOpenCreatePost,
    setApiError,
    setIsDisableInput,
    setIsOpenActionConfirmation,
    setIsOpenCreatePost,
    uploadAllImages,
  }
}
