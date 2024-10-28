import React from 'react'

import { Slider } from '@/common/ui/slider/Slider'
import { Image } from '@/entities/posts'

import { AspectRatio } from './AspectRatio'
import { Cropping } from './Cropping'
import { ImageControl } from './ImagesControl'

type Props = {
  handleDeleteImage: (imageId: string) => void
  images: Image[]
  slidesUrl: string[]
  uploadImageForPost: (file: File) => void
}

export const SizeEditorModal = ({
  handleDeleteImage,
  images,
  slidesUrl,
  uploadImageForPost,
}: Props) => {
  return (
    <div className={'h-auto relative'}>
      <Slider slidesUrl={slidesUrl} />
      <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
        <AspectRatio />
        <Cropping />
        <ImageControl
          handleDeleteImage={handleDeleteImage}
          images={images}
          uploadImageForPost={uploadImageForPost}
        />
      </div>
    </div>
  )
}
