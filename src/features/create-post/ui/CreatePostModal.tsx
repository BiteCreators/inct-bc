import React, { useState } from 'react'

import { Button, Modal } from '@/common/ui'

import { useCreatePost } from '../lib/hooks/useCreatePost'
import { AddPhotoModal } from './AddPhotoModal'
import { ImageFiltersModal } from './ImageFiltersModal'
import { PublicationModal } from './PublicationModal'
import { SizeEditorModal } from './SizeEditorModal'

export const CreatePostModal = () => {
  const { isOpenCreatePost, setIsOpenCreatePost } = useCreatePost()
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

  const handlePublish = () => {
    setStep(1)
    setIsOpenCreatePost(false)
  }

  return (
    <div>
      <Button onClick={() => setIsOpenCreatePost(true)}>Create</Button>
      <Modal
        className={`max-w-[330px] ${
          step === 3 || step === 4 ? 'md:max-w-[984px]' : 'md:max-w-[492px]'
        } w-full min-h-64`}
        handleBack={handleBack}
        handleNext={step === 4 ? handlePublish : handleNext}
        isOpen={isOpenCreatePost}
        mode={step === 1 ? 'default' : 'withStep'}
        nextButtonTitle={nextButtonTitle}
        onOpenChange={setIsOpenCreatePost}
        title={title}
      >
        {step === 1 && <AddPhotoModal handleNext={handleNext} />}
        {step === 2 && <SizeEditorModal />}
        {step === 3 && <ImageFiltersModal />}
        {step === 4 && <PublicationModal />}
      </Modal>
    </div>
  )
}
