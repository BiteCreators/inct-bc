import React, { RefObject } from 'react'

import { Slider } from '@/common/ui/slider/Slider'
import { Image } from '@/entities/posts'

import { AspectRatio } from './AspectRatio'
import { Cropping } from './Cropping'
import { ImageControl } from './ImagesControl'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleDeleteImageUrl: (index: number) => void
  handleFileSelect: (file: File) => void
  imagesUrl: string[]
  isDisableInput: boolean
  slidesUrl: string[]
  uploadImage: () => void
}

export const SizeEditorModal = ({
  fileInputRef,
  handleDeleteImageUrl,
  handleFileSelect,
  imagesUrl,
  isDisableInput,
  slidesUrl,
  uploadImage,
}: Props) => {
  return (
    <div className={'min-h-[490px] relative'}>
      <Slider duration={0} slidesUrl={slidesUrl} />
      <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
        <AspectRatio />
        <Cropping />
        <ImageControl
          fileInputRef={fileInputRef}
          handleDeleteImageUrl={handleDeleteImageUrl}
          handleFileSelect={handleFileSelect}
          imagesUrl={imagesUrl}
          isDisableInput={isDisableInput}
          uploadImage={uploadImage}
        />
      </div>
    </div>
  )
}
