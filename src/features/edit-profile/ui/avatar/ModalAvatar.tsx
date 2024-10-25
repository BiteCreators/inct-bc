import React from 'react'

import { ImageOutline } from '@/common/assets/icons/components'
import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'
import { Alert, Avatar, Button, Modal } from '@/common/ui'
import { DragAndDropInput } from '@/common/ui/drag-and-drop-input/DragAndDropInput'
import { ProfileAvatars } from '@/entities/profile'
import { useCropImage } from '@/features/edit-profile/lib/hooks/useCropImage'
import { useImageUpload } from '@/features/edit-profile/lib/hooks/useImageUpload'

import { CropImage } from './CropImage'

type Props = {
  currentAvatar: ProfileAvatars | null
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  updateAvatar: (file: File) => void
}

export const ModalAvatar = ({ currentAvatar, isOpen, setIsOpen, updateAvatar }: Props) => {
  const { error, fileInputRef, handleFileSelect, imageUrl, selectedFile, setError, uploadImage } =
    useImageUpload()

  const { crop, previewImgRef, saveCroppedImage, setCrop } = useCropImage(updateAvatar)
  const t = useScopedTranslation('Profile')

  const handleSave = (imgRef: HTMLImageElement | null) => {
    saveCroppedImage(imgRef, selectedFile)
    setIsOpen(false)
  }

  return (
    <Modal
      className={'max-w-[330px] md:max-w-[492px] w-full min-h-64'}
      isOpen={isOpen}
      mode={'default'}
      onOpenChange={setIsOpen}
      title={t.addProfilePhoto}
    >
      {error && (
        <Alert
          className={'static left-0 right-0 !mb-0 md:absolute md:left-4 md:right-4'}
          message={error}
          onClose={() => setError('')}
          purpose={'alert'}
          type={'error'}
        />
      )}
      <div className={'w-full items-end'}>
        {imageUrl && (
          <CropImage
            crop={crop}
            imageUrl={imageUrl}
            saveCroppedImage={handleSave}
            setCrop={setCrop}
          />
        )}
        {!imageUrl && (
          <div className={'w-full flex flex-col justify-center items-center gap-9 md:gap-14'}>
            <DragAndDropInput fileInputRef={fileInputRef} onFileSelect={handleFileSelect}>
              <div
                className={
                  'bg-dark-700 w-[300px] h-[300px] md:w-56 md:h-56 mt-3 md:mt-[72px] flex justify-center items-center'
                }
              >
                {currentAvatar ? (
                  <Avatar
                    avatarURL={currentAvatar.url}
                    imgStyles={'md:w-56 w-[300px]'}
                    rounded={false}
                  />
                ) : (
                  <ImageOutline height={48} viewBox={'0 0 24 24'} width={48} />
                )}
              </div>
            </DragAndDropInput>
            <Button className={'w-56 bottom-0 mb-9 h-12 md:h-9 md:mb-[84px]'} onClick={uploadImage}>
              {t.selectPhoto}
            </Button>
          </div>
        )}
      </div>
      {crop && (
        <canvas
          className={'border object-contain hidden w-[150px] h-[150px]'}
          ref={previewImgRef}
        />
      )}
    </Modal>
  )
}
