import React from 'react'

import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { createPostSlice } from '@/entities/posts/model/createPostSlice'
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
  const {
    addImageUrlForPost,
    correct,
    handleBackWithoutSave,
    handleChange,
    handleConfirm,
    handleDeleteImageUrl,
    handleInteractOutside,
    handlePublish,
    isLoading,
    limit,
    t,
    uploadAllImages,
    value,
  } = useCreatePost()

  const { apiError, images, isOpenActionConfirmation, isOpenCreatePost, step } = useAppSelector(
    state => state.createPost
  )

  const dispatch = useAppDispatch()

  const { currentIndex, handleApplyFilters, handleSelectFilter, setCurrentIndex, totalImageRefs } =
    useImageFilters()

  const { handleBack, handleNext, nextButtonTitle, title } = useStepControl({
    handleApplyFilters,
    handlePublish,
    uploadAllImages,
  })

  const { error, fileInputRef, handleFileSelect, setError, uploadImage } = useImageUpload({
    addImageUrlForPost,
    handleNext: () => {
      handleNext()
      dispatch(createPostSlice.actions.setSelectedImage(images.length))
    },
  })

  const addedImageSlides = generateAddedImageSlides(images, step, totalImageRefs)
  let maxWidthClass = 'md:max-w-[492px]' // дефолтное значение

  if (step === 2) {
    maxWidthClass = 'max-w-full sm:max-w-[492px]'
  } else if (step === 3) {
    maxWidthClass = 'w-full md:max-w-[984px]'
  } else if (step === 4) {
    maxWidthClass = 'md:max-w-[984px]'
  }

  return (
    <div>
      <ActionConfirmation
        classNameMessage={'w-[220px] md:w-auto'}
        isOpen={isOpenActionConfirmation}
        message={t.doYouWantToCloseCreation}
        onConfirm={handleConfirm}
        onReject={() => {}}
        setIsOpen={() => dispatch(createPostSlice.actions.setIsOpenActionConfirmation(false))}
        title={t.close}
      />
      <Modal
        className={`max-w-[350px] md:max-w-[330px] ${maxWidthClass} w-full min-h-64`}
        disabledButton={isLoading}
        handleBack={step === 2 ? handleBackWithoutSave : handleBack}
        handleInteractOutside={step !== 1 ? handleInteractOutside : () => {}}
        handleNext={handleNext}
        isOpen={isOpenCreatePost}
        mode={step === 1 ? 'default' : 'withStep'}
        nextButtonTitle={nextButtonTitle}
        onOpenChange={() =>
          dispatch(createPostSlice.actions.setIsOpenCreatePost(!isOpenCreatePost))
        }
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
            isLoading={isLoading}
            slides={addedImageSlides}
            uploadImage={uploadImage}
          />
        )}
        {step === 3 && (
          <ImageFiltersModal
            currentIndex={currentIndex}
            handleSelectFilter={handleSelectFilter}
            setCurrentIndex={setCurrentIndex}
            slides={addedImageSlides}
          />
        )}
        {step === 4 && (
          <PublicationModal
            correct={correct}
            handleChange={handleChange}
            isLoading={isLoading}
            limit={limit}
            slides={addedImageSlides}
            value={value}
          />
        )}
      </Modal>
    </div>
  )
}
