import React, { useRef, useState } from 'react'
import { useCookies } from 'react-cookie'

import { Image, postsApi } from '@/entities/posts'
import * as jose from 'jose'
import { useRouter } from 'next/router'

export const useCreatePost = () => {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(true)
  const [createPostImage] = postsApi.useCreatePostImageMutation()
  const [createPost] = postsApi.useCreatePostMutation()
  const [images, setImages] = useState<Image[]>([])

  const [description, setDescription] = useState<string>('')

  const [step, setStep] = useState(1)

  const router = useRouter()
  const [cookies] = useCookies(['accessToken'])
  const { userId } = jose.decodeJwt(cookies.accessToken)

  const slidesUrl = images?.map(el => el.url)

  let title
  let nextButtonTitle

  if (step === 1) {
    title = 'Add Photo'
  } else if (step === 2) {
    title = 'Cropping'
    nextButtonTitle = 'Next'
  } else if (step === 3) {
    title = 'Filters'
    nextButtonTitle = 'Next'
  } else {
    title = 'Publication'
    nextButtonTitle = 'Publish'
  }

  const uploadImageForPost = async (file: File) => {
    try {
      const res = await createPostImage({ file })

      if (res.data?.images[0]) {
        setImages([...images, res.data?.images[0]])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFirstImageUpload = (file: File) => {
    uploadImageForPost(file)
    handleNext()
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleDeleteImage = (imageId: string) => {
    setImages(images.filter(el => el.uploadId !== imageId))
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handlePublish = () => {
    if (images) {
      createPost({
        childrenMetadata: images.map(el => ({ uploadId: el.uploadId })),
        description,
      })
    }
    setStep(1)
    setIsOpenCreatePost(false)
    router.push(`/profile/${userId}`)
  }

  return {
    handleBack,
    handleDeleteImage,
    handleDescriptionChange,
    handleFirstImageUpload,
    handleNext,
    handlePublish,
    images,
    isOpenCreatePost,
    nextButtonTitle,
    setIsOpenCreatePost,
    setStep,
    slidesUrl,
    step,
    title,
    uploadImageForPost,
  }
}
