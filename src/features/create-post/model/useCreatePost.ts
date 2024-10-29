import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { Image, postsApi } from '@/entities/posts'
import * as jose from 'jose'
import { useRouter } from 'next/router'

export const useCreatePost = ({
  handleNext,
  setStep,
  step,
}: {
  handleBack: () => void
  handleNext: () => void
  setStep: (step: number) => void
  step: number
}) => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(true)
  const [isOpenActionConfirmation, setIsOpenActionConfirmation] = useState(false)
  const [isDisableInput, setIsDisableInput] = useState(false)
  const [createPostImage] = postsApi.useCreatePostImageMutation()
  const [createPost] = postsApi.useCreatePostMutation()
  const [images, setImages] = useState<Image[]>([])

  const [description, setDescription] = useState<string>('')

  const router = useRouter()
  const [cookies] = useCookies(['accessToken'])
  const { userId } = jose.decodeJwt(cookies.accessToken)

  const slidesUrl = images?.map(el => el.url)

  const uploadImageForPost = async (file: File | null) => {
    if (file) {
      try {
        const res = await createPostImage({ file })

        if (res.data?.images[0]) {
          setImages([...images, res.data?.images[0]])
          if (images.length === 0) {
            handleNext()
          }
        }
      } catch (error) {
        /* empty */
      }
    }
  }

  const handleDeleteImage = (imageId: string) => {
    setImages(images.filter(el => el.uploadId !== imageId))
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handlePublish = async () => {
    try {
      if (images && images.length < 10) {
        await createPost({
          childrenMetadata: images.map(el => ({ uploadId: el.uploadId })),
          description,
        })
        setStep(1)
        setIsOpenCreatePost(false)
      }
    } catch (error) {
      /* empty */
    }
    await router.push(`/profile/${userId}`)
  }

  const handleInteractOutside = (e: any) => {
    e.preventDefault()
    setIsOpenActionConfirmation(true)
  }

  const handleConfirm = async () => {
    setIsOpenCreatePost(false)
    setImages([])
    await router.push(`/profile/${userId}`)
  }

  const handleBackWithoutSave = () => {
    setIsOpenActionConfirmation(true)
  }

  useEffect(() => {
    if (images.length === 0) {
      setStep(1)
    }
    if (images.length < 9) {
      setIsDisableInput(false)
    }
    if (images.length >= 9) {
      setIsDisableInput(true)
    }
    if (step === 1) {
      setImages([])
    }
  }, [images, step, setStep])

  return {
    handleBackAndDelete: handleBackWithoutSave,
    handleConfirm,
    handleDeleteImage,
    handleDescriptionChange,
    handleInteractOutside,
    handlePublish,
    images,
    isDisableInput,
    isOpenActionConfirmation,
    isOpenCreatePost,
    setIsOpenActionConfirmation,
    setIsOpenCreatePost,
    slidesUrl,
    uploadImageForPost,
  }
}
