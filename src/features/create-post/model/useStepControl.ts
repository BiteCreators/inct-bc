import { useState } from 'react'

export const useStepControl = () => {
  const [step, setStep] = useState(1)

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

  return {
    handleBack,
    handleNext,
    nextButtonTitle,
    setStep,
    step,
    title,
  }
}
