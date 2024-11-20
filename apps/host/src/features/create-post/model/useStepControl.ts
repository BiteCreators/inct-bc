import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { useScopedTranslation } from '@packages/shared/hooks'
import * as jose from 'jose'
import { useRouter } from 'next/router'

import { ImageData } from '../types'

export const useStepControl = ({
  handleApplyFilters,
  handlePublish,
  images,
  isOpenCreatePost,
  uploadAllImages,
}: {
  handleApplyFilters: () => Promise<{ newFiles: File[] }>
  handlePublish: () => Promise<void>
  images: ImageData[]
  isOpenCreatePost: boolean
  uploadAllImages: (files: File[]) => Promise<void>
}) => {
  const [step, setStep] = useState(1)
  const t = useScopedTranslation('Posts')

  const router = useRouter()
  const [cookies] = useCookies(['accessToken'])
  const tokenData = jose.decodeJwt(cookies.accessToken)
  let userId: number = 0

  if ('userId' in tokenData && typeof tokenData.userId === 'number') {
    userId = tokenData.userId
  }

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
        try {
          const res = await handleApplyFilters()

          setStep(prevStep => prevStep + 1)
          await uploadAllImages(res.newFiles)
        } catch (error) {
          console.log(error)
        }
        break
      case 4:
        await handlePublish()
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
