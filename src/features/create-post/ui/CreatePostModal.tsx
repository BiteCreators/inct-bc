import React from 'react'

import { Modal } from '@/common/ui'

import { useCreatePost } from '../model/useCreatePost'
import { AddPhotoModal } from './AddPhotoModal'
import { ImageFiltersModal } from './ImageFiltersModal'
import { PublicationModal } from './PublicationModal'
import { SizeEditorModal } from './SizeEditorModal'

export const CreatePostModal = () => {
  const {
    handleBack,
    handleNext,
    handlePublish,
    isOpenCreatePost,
    nextButtonTitle,
    setIsOpenCreatePost,
    step,
    title,
  } = useCreatePost()

  return (
    <div>
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
