import React, { RefObject } from 'react'

import { Slider } from '@/common/ui/slider/Slider'
import { Image } from '@/entities/posts'

import { AspectRatio } from './AspectRatio'
import { Cropping } from './Cropping'
import { ImageControl } from './ImagesControl'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleDeleteImage: (imageId: string) => void
  handleFileSelect: (file: File) => void
  images: Image[]
  slidesUrl: string[]
  uploadImage: () => void
}

export const SizeEditorModal = ({
  fileInputRef,
  handleDeleteImage,
  handleFileSelect,
  images,
  slidesUrl,
  uploadImage,
}: Props) => {
  return (
    <div className={'min-h-[490px] relative'}>
      <Slider slidesUrl={slidesUrl} />
      <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
        <AspectRatio />
        <Cropping />
        <ImageControl
          fileInputRef={fileInputRef}
          handleDeleteImage={handleDeleteImage}
          handleFileSelect={handleFileSelect}
          images={images}
          uploadImage={uploadImage}
        />
      </div>
    </div>
  )
}
