import { useState } from 'react'
import { useCookies } from 'react-cookie'

import * as jose from 'jose'
import { useRouter } from 'next/router'

export const useCreatePost = () => {
  const [cookies] = useCookies(['accessToken'])
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(true)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { userId } = jose.decodeJwt(cookies.accessToken)
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

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handlePublish = () => {
    setStep(1)
    setIsOpenCreatePost(false)
    router.push(`/profile/${userId}`)
  }

  return {
    handleBack,
    handleNext,
    handlePublish,
    isOpenCreatePost,
    nextButtonTitle,
    setIsOpenCreatePost,
    step,
    title,
  }
}
