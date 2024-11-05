import { useState } from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'

export const useStepControl = () => {
  const [step, setStep] = useState(1)
  const t = useScopedTranslation('Posts')

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

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return {
    handleBack,
    handleNext,
    nextButtonTitle,
    setStep,
    step,
    title,
  }
}
