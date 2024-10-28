import React from 'react'

import { Modal } from '@/common/ui'

import { useCreatePost } from '../model/useCreatePost'
import { useFirstImageUpload } from '../model/useFirstImageUpload'
import { AddPhotoModal } from './AddPhotoModal'
import { ImageFiltersModal } from './ImageFiltersModal'
import { PublicationModal } from './PublicationModal'
import { SizeEditorModal } from './SizeEditorModal'

export const CreatePostModal = () => {
  const {
    handleBack,
    handleDeleteImage,
    handleDescriptionChange,
    handleFirstImageUpload,
    handleNext,
    handlePublish,
    images,
    isOpenCreatePost,
    nextButtonTitle,
    setIsOpenCreatePost,
    slidesUrl,
    step,
    title,
    uploadImageForPost,
  } = useCreatePost()

  const { fileInputRef, handleFileSelect, uploadImage } =
    useFirstImageUpload(handleFirstImageUpload)

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
        {step === 1 && (
          <AddPhotoModal
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            uploadImage={uploadImage}
          />
        )}
        {step === 2 && (
          <SizeEditorModal
            handleDeleteImage={handleDeleteImage}
            images={images}
            slidesUrl={slidesUrl}
            uploadImageForPost={uploadImageForPost}
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
