import React, { ReactNode, RefObject, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { Slider } from '@/common/ui/slider/Slider'
import { ImageType } from '@/features/create-post/types/types'
import { getCroppedImg } from '@/features/create-post/utils/getCroppedImg'

import { AspectRatio } from './AspectRatio'
import { Cropping } from './Cropping'
import { ImageControl } from './ImagesControl'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleDeleteImageUrl: (index: number) => void
  handleFileSelect: (file: File) => void
  images: ImageType[]
  isDisableInput: boolean
  selectedImage: null | number
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>
  setSelectedImage: React.Dispatch<React.SetStateAction<null | number>>
  slides: ReactNode[]
  uploadImage: () => void
}

export const SizeEditorModal = ({
  fileInputRef,
  handleDeleteImageUrl,
  handleFileSelect,
  images,
  isDisableInput,
  selectedImage,
  setImages,
  setSelectedImage,
  slides,
  uploadImage,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [aspect, setAspect] = useState(1)

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onCrop = async () => {
    if (selectedImage === null || croppedAreaPixels === null) {
      return
    }

    const croppedImageUrl = await getCroppedImg(images[selectedImage].initialUrl, croppedAreaPixels)

    // Обновляем изображение после кроппинга
    setImages(images =>
      images.map((img, i) => (i === selectedImage ? { ...img, initialUrl: croppedImageUrl } : img))
    )

    setSelectedImage(null)
  }

  return (
    <div className={'min-h-[400px] relative'}>
      <Slider duration={0} slides={slides} />
      {selectedImage !== null && images[selectedImage] && (
        <div className={'w-full bg-primary-100'}>
          <Cropper
            aspect={aspect}
            crop={crop}
            image={images[selectedImage].initialUrl}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
            style={{
              containerStyle: {
                backgroundColor: '#606060',
              },
              cropAreaStyle: {
                border: '1px solid white',
              },
            }}
            zoom={zoom}
          />
        </div>
      )}

      <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
        <AspectRatio setAspect={setAspect} />
        <Cropping setZoom={setZoom} zoom={zoom} />
        <button onClick={onCrop}>Crop</button>
        <button onClick={() => setSelectedImage(null)}>Cancel</button>
        <ImageControl
          fileInputRef={fileInputRef}
          handleDeleteImageUrl={handleDeleteImageUrl}
          handleFileSelect={file => {
            handleFileSelect(file)
            setSelectedImage(images.length) // Автоматически открываем кроп для нового изображения
          }}
          images={images}
          isDisableInput={isDisableInput}
          uploadImage={uploadImage}
        />
      </div>
    </div>
  )
}
