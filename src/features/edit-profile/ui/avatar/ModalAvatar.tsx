import React from 'react'

import { Avatars } from '@/common/api/profile.api'
import { ImageOutline } from '@/common/assets/icons/components'
import { Alert, Avatar, Button, Modal } from '@/common/ui'
import { DragAndDropInput } from '@/common/ui/drag-and-drop-input/DragAndDropInput'
import { useCropImage } from '@/features/profile/lib/hooks/useCropImage'
import { useImageUpload } from '@/features/profile/lib/hooks/useImageUpload'

import { CropImage } from './CropImage'

type Props = {
  currentAvatar: Avatars | null
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  updateAvatar: (file: File) => void
}

export const ModalAvatar = ({ currentAvatar, isOpen, setIsOpen, updateAvatar }: Props) => {
  const { error, fileInputRef, handleFileSelect, imageUrl, selectedFile, setError, uploadImage } =
    useImageUpload()

  const { crop, previewImgRef, saveCroppedImage, setCrop } = useCropImage(updateAvatar)

  const handleSave = (imgRef: HTMLImageElement | null) => {
    saveCroppedImage(imgRef, selectedFile)
    setIsOpen(false)
  }

  return (
    <Modal
      className={'max-w-[492px] w-full min-h-64'}
      isOpen={isOpen}
      mode={'default'}
      onOpenChange={setIsOpen}
      title={'Add profile photo'}
    >
      {error && (
        <Alert message={error} onClose={() => setError('')} purpose={'toast'} type={'error'} />
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
          <div className={'w-full flex flex-col justify-center items-center gap-5'}>
            <DragAndDropInput fileInputRef={fileInputRef} onFileSelect={handleFileSelect}>
              <div className={'bg-dark-700 w-56 h-56 mt-7 flex justify-center items-center'}>
                {currentAvatar ? (
                  <Avatar avatarURL={currentAvatar.url} rounded={false} size={224} />
                ) : (
                  <ImageOutline height={48} viewBox={'0 0 24 24'} width={48} />
                )}
              </div>
            </DragAndDropInput>
            <Button className={'w-56 bottom-0 mt-6 mb-16'} onClick={uploadImage}>
              Select from Computer
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
