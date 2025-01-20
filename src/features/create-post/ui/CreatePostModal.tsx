import React, { useState } from 'react'

import { ActionConfirmation, Alert, Modal } from '@byte-creators/ui-kit'

import { useCreatePost } from '../model/useCreatePost'
import { useImageFilters } from '../model/useImageFilters'
import { useImageUpload } from '../model/useImageUpload'
import { useStepControl } from '../model/useStepControl'
import { AddPhotoModal } from './AddPhotoModal'
import { ImageFiltersModal } from './ImageFiltersModal'
import { generateAddedImageSlides } from './ImageSlides'
import { PublicationModal } from './PublicationModal'
import { SizeEditorModal } from './SizeEditorModal'

export const CreatePostModal = () => {
  const [selectedImage, setSelectedImage] = useState<null | number>(null)
  const {
    addImageUrlForPost,
    apiError,
    correct,
    handleBackWithoutSave,
    handleChange,
    handleConfirm,
    handleDeleteImageUrl,
    handleInteractOutside,
    handlePublish,
    images,
    isDisableInput,
    isLoading,
    isOpenActionConfirmation,
    isOpenCreatePost,
    limit,
    setImages,
    setIsOpenActionConfirmation,
    setIsOpenCreatePost,
    t,
    uploadAllImages,
    value,
  } = useCreatePost()

  const { currentIndex, handleApplyFilters, handleSelectFilter, setCurrentIndex, totalImageRefs } =
    useImageFilters({
      images,
      setImages,
    })

  const { handleBack, handleNext, nextButtonTitle, step, title } = useStepControl({
    handleApplyFilters,
    handlePublish,
    images,
    isOpenCreatePost,
    uploadAllImages,
  })

  const { error, fileInputRef, handleFileSelect, setError, uploadImage } = useImageUpload({
    addImageUrlForPost,
    handleNext: () => {
      handleNext()
      setSelectedImage(images.length)
    },
  })

  const addedImageSlides = generateAddedImageSlides(images, totalImageRefs)

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
        disabledButton={isLoading}
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
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            handleFileSelect={handleFileSelect}
            uploadImage={uploadImage}
          />
        )}
        {step === 2 && (
          <SizeEditorModal
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            handleDeleteImageUrl={handleDeleteImageUrl}
            handleFileSelect={handleFileSelect}
            images={images}
            isDisableInput={isDisableInput}
            selectedImage={selectedImage}
            setImages={setImages}
            setSelectedImage={setSelectedImage}
            slides={addedImageSlides}
            uploadImage={uploadImage}
          />
        )}
        {step === 3 && (
          <ImageFiltersModal
            currentIndex={currentIndex}
            handleSelectFilter={handleSelectFilter}
            images={images}
            setCurrentIndex={setCurrentIndex}
            slides={addedImageSlides}
          />
        )}
        {step === 4 && (
          <PublicationModal
            isLoading={isLoading}
            correct={correct}
            handleChange={handleChange}
            images={images}
            limit={limit}
            value={value}
            slides={addedImageSlides}
          />
        )}
      </Modal>
    </div>
  )
}
