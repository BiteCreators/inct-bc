import React from 'react'

import { ImageZoom } from '@/features/post-image-view/ui/ImageZoom'

type Props = {
  onImageLoad: () => void
  uploadedImage: null | string
}

export const DisplayImage = ({ onImageLoad, uploadedImage }: Props) => {
  return (
    <div>
      <div
        className={
          'relative overflow-hidden items-center rounded-md transition-all duration-200 ease-in-out'
        }
      >
        <div className={'relative overflow-hidden w-50 h-50 rounded-lg'}>
          {uploadedImage ? (
            <ImageZoom onImageLoad={onImageLoad} uploadedImage={uploadedImage} />
          ) : (
            <div>No image found</div>
          )}
        </div>
      </div>
    </div>
  )
}
