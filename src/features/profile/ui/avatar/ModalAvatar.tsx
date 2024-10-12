import React, { useRef, useState } from 'react'
import { Crop, convertToPixelCrop } from 'react-image-crop'

import { Avatars } from '@/common/api/profile.api'
import { ImageOutline } from '@/common/assets/icons/components'
import { Alert, Avatar, Button, Modal } from '@/common/ui'
import setCanvasPreview from '@/common/ui/avatar/setCanvasPreview'
import { CropImage } from '@/features/profile/ui/avatar/CropImage'

type Props = {
  currentAvatar: Avatars | null
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  updateAvatar: (file: File) => void
}

export const ModalAvatar = ({ currentAvatar, isOpen, setIsOpen, updateAvatar }: Props) => {
  const previewImgRef = useRef<HTMLCanvasElement | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [crop, setCrop] = useState<Crop>({
    height: 150,
    unit: 'px',
    width: 150,
    x: 25,
    y: 25,
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const UploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const validFormats = ['image/jpeg', 'image/png']

    if (!validFormats.includes(file.type)) {
      setError('Error! The format of the uploaded photo must be PNG and JPEG')

      return
    }

    const maxSizeInMB = 10

    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError('Error! Photo size must be less than 10 MB!')

      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const imageElement = document.createElement('img')
      const url = reader.result?.toString() || ''

      imageElement.src = url
      imageElement.addEventListener('load', (e: any) => {
        setImageUrl(url)
        setSelectedFile(file)
        if (error) {
          setError('')
        }
        const { naturalHeight: naturalHeight, naturalWidth } = e.currentTarget

        if (naturalHeight < 150 || naturalWidth < 150) {
          setError('image must be at least 100')

          return setImageUrl('')
        }
      })
    })

    reader.readAsDataURL(file)
  }

  const saveCroppedImage = (imgRef: HTMLImageElement | null) => {
    if (imgRef && previewImgRef.current) {
      const pixelCrop = convertToPixelCrop(crop, imgRef.width, imgRef.height)

      setCanvasPreview(imgRef, previewImgRef.current, pixelCrop)
    }

    const dataUrl = previewImgRef.current?.toDataURL()

    if (dataUrl && selectedFile) {
      updateAvatar(selectedFile)
    }

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
            saveCroppedImage={saveCroppedImage}
            setCrop={setCrop}
          />
        )}
        {!imageUrl && (
          <div className={'w-full flex flex-col justify-center items-center gap-5'}>
            <div className={'bg-dark-700 w-56 h-56 mt-7 flex justify-center items-center'}>
              {currentAvatar ? (
                <Avatar avatarURL={currentAvatar.url} rounded={false} size={224} />
              ) : (
                <ImageOutline height={48} viewBox={'0 0 24 24'} width={48} />
              )}
            </div>

            <Button className={'w-56 bottom-0 mt-6 mb-16'} onClick={UploadImage}>
              Select from Computer
            </Button>
          </div>
        )}
      </div>
      <input
        accept={'.jpg, .jpeg, .png'}
        className={'hidden'}
        onChange={onSelectFile}
        ref={fileInputRef}
        type={'file'}
      />
      {crop && (
        <canvas
          className={'border object-contain hidden w-[150px] h-[150px]'}
          ref={previewImgRef}
        />
      )}
    </Modal>
  )
}
