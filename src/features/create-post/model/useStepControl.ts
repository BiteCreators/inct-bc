import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import * as jose from 'jose'
import { useRouter } from 'next/router'

export const useStepControl = ({
  handleApplyFilters,
  handlePublish,
  imagesUrl,
  isOpenCreatePost,
  uploadAllImages,
}: {
  handleApplyFilters: () => Promise<{ newFiles: File[] }>
  handlePublish: () => Promise<void>
  imagesUrl: string[]
  isOpenCreatePost: boolean
  uploadAllImages: (files: File[]) => Promise<void>
}) => {
  const [step, setStep] = useState(1)

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

  const handleNext = async () => {
    switch (step) {
      case 1:
      case 2:
        setStep(prevStep => prevStep + 1)
        break
      case 3:
        try {
          const res = await handleApplyFilters()

          await uploadAllImages(res.newFiles)
          setStep(prevStep => prevStep + 1)
        } catch (error) {
          console.log(error)
        }
        break
      case 4:
        await handlePublish()
        //setStep(1)
        break
      default:
        break
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    if (!isOpenCreatePost) {
      router.push(`/profile/${userId}`)
    }
    if (imagesUrl.length === 0) {
      setStep(1)
    }
  }, [imagesUrl, setStep, isOpenCreatePost, router, userId])

  return {
    handleBack,
    handleNext,
    nextButtonTitle,
    setStep,
    step,
    title,
  }
}
