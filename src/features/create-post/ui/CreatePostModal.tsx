import React from 'react'

import { Alert, Modal } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'

import { useCreatePost } from '../model/useCreatePost'
import { useImageUpload } from '../model/useImageUpload'
import { useStepControl } from '../model/useStepControl'
import { AddPhotoModal } from './AddPhotoModal'
import { ImageFiltersModal } from './ImageFiltersModal'
import { PublicationModal } from './PublicationModal'
import { SizeEditorModal } from './SizeEditorModal'

export const CreatePostModal = () => {
  const { handleBack, handleNext, nextButtonTitle, setStep, step, title } = useStepControl()
  const {
    apiError,
    handleBackWithoutSave,
    handleConfirm,
    handleDeleteImage,
    handleDescriptionChange,
    handleInteractOutside,
    handlePublish,
    images,
    isDisableInput,
    isOpenActionConfirmation,
    isOpenCreatePost,
    setApiError,
    setIsOpenActionConfirmation,
    setIsOpenCreatePost,
    slidesUrl,
    t,
    uploadImageForPost,
  } = useCreatePost({ handleNext, setStep, step })

  const { error, fileInputRef, handleFileSelect, setError, uploadImage } =
    useImageUpload(uploadImageForPost)

  return (
    <div>
      <ActionConfirmation
        isOpen={isOpenActionConfirmation}
        message={t.doYouWantToCloseCreation}
        onConfirm={handleConfirm}
        onReject={() => {}}
        setIsOpen={setIsOpenActionConfirmation}
        title={t.close}
      />
      <Modal
        className={`max-w-[330px] ${
          step === 3 || step === 4 ? 'md:max-w-[984px]' : 'md:max-w-[492px]'
        } w-full min-h-64`}
        handleBack={step === 2 ? handleBackWithoutSave : handleBack}
        handleInteractOutside={step !== 1 ? handleInteractOutside : () => {}}
        handleNext={step === 4 ? handlePublish : handleNext}
        isOpen={isOpenCreatePost}
        mode={step === 1 ? 'default' : 'withStep'}
        nextButtonTitle={nextButtonTitle}
        onOpenChange={setIsOpenCreatePost}
        title={title}
      >
        {(error || apiError) && (
          <Alert
            className={'static left-0 right-0 !mb-0 md:left-4 md:right-4'}
            message={error}
            onClose={() => setError('')}
            purpose={'alert'}
            type={'error'}
          />
        )}
        {step === 1 && (
          <AddPhotoModal
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            uploadImage={uploadImage}
          />
        )}
        {step === 2 && (
          <SizeEditorModal
            fileInputRef={fileInputRef}
            handleDeleteImage={handleDeleteImage}
            handleFileSelect={handleFileSelect}
            images={images}
            isDisableInput={isDisableInput}
            slidesUrl={slidesUrl}
            uploadImage={uploadImage}
          />
        )}
        {step === 3 && <ImageFiltersModal slidesUrl={slidesUrl} />}
        {step === 4 && (
          <PublicationModal
            handleDescriptionChange={handleDescriptionChange}
            slidesUrl={slidesUrl}
          />
        )}
      </Modal>
    </div>
  )
}
