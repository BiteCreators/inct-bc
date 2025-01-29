import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { authSlice } from '@/entities/auth'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import { ImageData } from '../types'

export const useStepControl = ({
  handleApplyFilters,
  handlePublish,
  images,
  isOpenCreatePost,
  setIsOpenCreatePost,
  uploadAllImages,
}: {
  handleApplyFilters: () => Promise<{ newFiles: File[] }>
  handlePublish: () => Promise<void>
  images: ImageData[]
  isOpenCreatePost: boolean
  setIsOpenCreatePost: Dispatch<SetStateAction<boolean>>
  uploadAllImages: (files: File[]) => Promise<void>
}) => {
  const [step, setStep] = useState(1)
  const t = useScopedTranslation('Posts')

  const router = useRouter()
  const userId = useAppSelector(authSlice.selectors.selectUserId)

  let title
  let nextButtonTitle

  if (step === 1) {
    title = t.addPhoto
  } else if (step === 2) {
    title = t.cropping
    nextButtonTitle = t.next
  } else if (step === 3) {
    title = t.filters
    nextButtonTitle = t.next
  } else {
    title = t.publication
    nextButtonTitle = t.publish
  }

  const handleNext = async () => {
    switch (step) {
      case 1:
      case 2:
        setStep(prevStep => prevStep + 1)
        break
      case 3:
        setStep(prevStep => prevStep + 1)
        break
      case 4:
        try {
          //setIsOpenCreatePost(false)
          const res = await handleApplyFilters()

          await uploadAllImages(res.newFiles)
        } catch (error) {
          console.log(error)
        }
        break
      default:
        break
    }
  }

  const handleBack = () => {
    setStep(prevStep => prevStep - 1)
  }

  useEffect(() => {
    if (!isOpenCreatePost) {
      router.push(`/profile/${userId}`)
    }
    if (images.length === 0) {
      setStep(1)
    }
  }, [images, setStep, isOpenCreatePost, router, userId])

  return {
    handleBack,
    handleNext,
    nextButtonTitle,
    setStep,
    step,
    title,
  }
}
