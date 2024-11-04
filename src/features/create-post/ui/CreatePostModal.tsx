import React from 'react'

import { Alert, Modal } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'

import { useCreatePost } from '../model/useCreatePost'
import { useImageFilters } from '../model/useImageFilters'
import { useImageUpload } from '../model/useImageUpload'
import { useStepControl } from '../model/useStepControl'
import { AddPhotoModal } from './AddPhotoModal'
import { ImageFiltersModal } from './ImageFiltersModal'
import { PublicationModal } from './PublicationModal'
import { SizeEditorModal } from './SizeEditorModal'

export const CreatePostModal = () => {
  const {
    addImageUrlForPost,
    apiError,
    handleBackWithoutSave,
    handleConfirm,
    handleDeleteImageUrl,
    handleDescriptionChange,
    handleInteractOutside,
    handlePublish,
    imagesUrl,
    isDisableInput,
    isOpenActionConfirmation,
    isOpenCreatePost,
    setIsOpenActionConfirmation,
    setIsOpenCreatePost,
    uploadAllImages,
  } = useCreatePost()

  const {
    currentIndex,
    handleApplyFilters,
    handleSelectFilter,
    selectedFilters,
    setCurrentIndex,
    totalImageRefs,
    totalImagesUrls,
  } = useImageFilters({
    imagesUrl,
  })

  const { handleBack, handleNext, nextButtonTitle, step, title } = useStepControl({
    handleApplyFilters,
    handlePublish,
    imagesUrl,
    isOpenCreatePost,
    uploadAllImages,
  })

  const { error, fileInputRef, handleFileSelect, setError, uploadImage } = useImageUpload({
    addImageUrlForPost,
    handleNext,
  })

  return (
    <div>
      <ActionConfirmation
        isOpen={isOpenActionConfirmation}
        message={
          'Do you really want to close the creation of a publication? If you close everything will be deleted'
        }
        onConfirm={handleConfirm}
        onReject={() => {}}
        setIsOpen={setIsOpenActionConfirmation}
        title={'Close'}
      />
      <Modal
        className={`max-w-[330px] ${
          step === 3 || step === 4 ? 'md:max-w-[984px]' : 'md:max-w-[492px]'
        } w-full min-h-64`}
        handleBack={step === 2 ? handleBackWithoutSave : handleBack}
        handleInteractOutside={step !== 1 ? handleInteractOutside : () => {}}
        handleNext={handleNext}
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
            handleDeleteImageUrl={handleDeleteImageUrl}
            handleFileSelect={handleFileSelect}
            imagesUrl={imagesUrl}
            isDisableInput={isDisableInput}
            slidesUrl={imagesUrl}
            uploadImage={uploadImage}
          />
        )}
        {step === 3 && (
          <ImageFiltersModal
            currentIndex={currentIndex}
            handleSelectFilter={handleSelectFilter}
            selectedFilters={selectedFilters}
            setCurrentIndex={setCurrentIndex}
            slidesUrl={imagesUrl}
            totalImageRefs={totalImageRefs}
          />
        )}
        {step === 4 && (
          <PublicationModal
            handleDescriptionChange={handleDescriptionChange}
            slidesUrl={totalImagesUrls}
          />
        )}
      </Modal>
    </div>
  )
}
