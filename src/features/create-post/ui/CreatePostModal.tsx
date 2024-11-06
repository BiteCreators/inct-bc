import React, { useState } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Alert, Modal } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'

import s from '@/app/styles/filters.module.css'

import { useCreatePost } from '../model/useCreatePost'
import { useImageFilters } from '../model/useImageFilters'
import { useImageUpload } from '../model/useImageUpload'
import { useStepControl } from '../model/useStepControl'
import { AddPhotoModal } from './AddPhotoModal'
import { ImageFiltersModal } from './ImageFiltersModal'
import { PublicationModal } from './PublicationModal'
import { SizeEditorModal } from './SizeEditorModal'

export const CreatePostModal = () => {
  const [selectedImage, setSelectedImage] = useState<null | number>(null) // Управляем текущим индексом изображения
  const {
    addImageUrlForPost,
    apiError,
    handleBackWithoutSave,
    handleConfirm,
    handleDeleteImageUrl,
    handleDescriptionChange,
    handleInteractOutside,
    handlePublish,
    images,
    isDisableInput,
    isLoading,
    isOpenActionConfirmation,
    isOpenCreatePost,
    setImages,
    setIsOpenActionConfirmation,
    setIsOpenCreatePost,
    uploadAllImages,
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
      handleNext() // Переход к следующему шагу после загрузки
      setSelectedImage(images.length) // Устанавливаем `selectedImage` на новое изображение
    },
  })

  const addedImageSlides = images.map((el, i) => (
    <img
      alt={'slide'}
      className={cn('w-full', s.filter, s[el.selectedFilter])}
      key={i}
      ref={el => {
        if (totalImageRefs) {
          totalImageRefs.current[i] = el
        }
      }}
      src={el.initialUrl}
    />
  ))
  const totalImageSlides = images.map((el, i) => (
    <img alt={'slide'} className={cn('w-full')} key={i} src={el.totalUrl} />
  ))

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
            imagesURL={images}
            setCurrentIndex={setCurrentIndex}
            slides={addedImageSlides}
          />
        )}
        {step === 4 && (
          <PublicationModal
            handleDescriptionChange={handleDescriptionChange}
            slides={totalImageSlides}
          />
        )}
      </Modal>
    </div>
  )
}
