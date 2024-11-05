import React, { ReactNode, RefObject } from 'react'

import { Slider } from '@/common/ui/slider/Slider'

import { AspectRatio } from './AspectRatio'
import { Cropping } from './Cropping'
import { ImageControl } from './ImagesControl'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleDeleteImageUrl: (index: number) => void
  handleFileSelect: (file: File) => void
  images: { initialUrl: string; selectedFilter: string; totalUrl: string }[]
  isDisableInput: boolean
  slides: ReactNode[]
  uploadImage: () => void
}

export const SizeEditorModal = ({
  fileInputRef,
  handleDeleteImageUrl,
  handleFileSelect,
  images,
  isDisableInput,
  slides,
  uploadImage,
}: Props) => {
  return (
    <div className={'h-[490px] relative'}>
      <Slider duration={0} slides={slides} />
      <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
        <AspectRatio />
        <Cropping />
        <ImageControl
          fileInputRef={fileInputRef}
          handleDeleteImageUrl={handleDeleteImageUrl}
          handleFileSelect={handleFileSelect}
          images={images}
          isDisableInput={isDisableInput}
          uploadImage={uploadImage}
        />
      </div>
    </div>
  )
}
