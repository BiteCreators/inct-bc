import React, { ReactNode, RefObject, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { Slider } from '@/common/ui/slider/Slider'
import { ImageType } from '@/features/create-post/types/types'
import { CroppingTools } from '@/features/create-post/ui/CroppingTools'

import { ImageControl } from './ImagesControl'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleDeleteImageUrl: (index: number) => void
  handleFileSelect: (file: File) => void
  images: ImageType[]
  isDisableInput: boolean
  selectedImage: null | number
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>
  setSelectedImage: (selectedImage: null | number) => void
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
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [aspect, setAspect] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
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
        <CroppingTools
          croppedAreaPixels={croppedAreaPixels}
          images={images}
          selectedImage={selectedImage}
          setAspect={setAspect}
          setImages={setImages}
          setSelectedImage={setSelectedImage}
          setZoom={setZoom}
          zoom={zoom}
        />
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
