import React, { useRef, useState } from 'react'
import { Crop, convertToPixelCrop } from 'react-image-crop'

import { Image, ImageOutline } from '@/common/assets/icons/components'
import { Alert, Button, Modal } from '@/common/ui'
import setCanvasPreview from '@/common/ui/avatar/setCanvasPreview'
import { CropImage } from '@/features/profile/avatar-module/CropImage'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  updateAvatar: (imgSrc: string) => void
}

export const ModalAvatar = ({ isOpen, setIsOpen, updateAvatar }: Props) => {
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
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const imageElement = document.createElement('img')

      const url = reader.result?.toString() || ''

      imageElement.src = url

      imageElement.addEventListener('load', (e: any) => {
        if (error) {
          setError('')
        }
        const { naturalHeight: naturalHeight, naturalWidth } = e.currentTarget

        if (naturalHeight < 150 || naturalWidth < 150) {
          setError('image must be at least 100')

          return setImageUrl('')
        }
      })

      setImageUrl(url)
    })
    reader.readAsDataURL(file)
  }
  const saveCroppedImage = (imgRef: HTMLImageElement | null) => {
    if (imgRef && previewImgRef.current) {
      const pixelCrop = convertToPixelCrop(crop, imgRef.width, imgRef.height)

      setCanvasPreview(imgRef, previewImgRef.current, pixelCrop)
    }
    const dataUrl = previewImgRef.current?.toDataURL()

    //updateAvatar(dataUrl), setIsOpen(false) закомментить что бы видеть превью аватара
    if (dataUrl) {
      updateAvatar(dataUrl)
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
              <ImageOutline height={48} viewBox={'0 0 24 24'} width={48} />
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
        //hidden - позволяет отобразить или скрыть превью
        <canvas
          className={'border object-contain w-[150px] hidden h-[150px]'}
          ref={previewImgRef}
        />
      )}
    </Modal>
  )
}
