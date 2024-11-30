import React from 'react'
import { Area } from 'react-easy-crop'

import { ImageData } from '@/features/create-post/types'
import { AspectRatio } from '@/features/create-post/ui/AspectRatio'
import { ImageZoomControl } from '@/features/create-post/ui/ImageZoomControl'
import { getCroppedImg } from '@/features/create-post/utils/getCroppedImg'
import { useRouter } from 'next/router'

type Props = {
  croppedAreaPixels: Area | null
  images: ImageData[]
  selectedImage: null | number
  setAspect: (aspect: number) => void
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>
  setSelectedImage: (selectedImage: null | number) => void
  setZoom: (zoom: number) => void
  zoom: number
}
export const CroppingTools = ({
  croppedAreaPixels,
  images,
  selectedImage,
  setAspect,
  setImages,
  setSelectedImage,
  setZoom,
  zoom,
}: Props) => {
  const { locale } = useRouter()
  const onCrop = async () => {
    if (selectedImage === null || croppedAreaPixels === null) {
      return
    }

    const croppedImageUrl = await getCroppedImg(images[selectedImage].initialUrl, croppedAreaPixels)

    setImages(images =>
      images.map((img, i) => (i === selectedImage ? { ...img, initialUrl: croppedImageUrl } : img))
    )

    setSelectedImage(null)
  }

  return (
    <>
      {selectedImage !== null && (
        <>
          <AspectRatio setAspect={setAspect} />
          <ImageZoomControl setZoom={setZoom} zoom={zoom} />
          <div
            className={
              'bg-dark-500 bg-opacity-80 px-[12px] rounded-sm flex justify-center items-center h-9'
            }
          >
            <button className={'hover:text-primary-500'} onClick={onCrop}>
              {locale === 'en' ? 'Crop' : 'Обрезать'}
            </button>
          </div>
          <div
            className={
              'bg-dark-500 bg-opacity-80 px-[12px] rounded-sm flex justify-center items-center h-9'
            }
          >
            <button className={'hover:text-primary-500'} onClick={() => setSelectedImage(null)}>
              {locale === 'en' ? 'Cancel' : 'Отмена'}
            </button>
          </div>
        </>
      )}
    </>
  )
}
