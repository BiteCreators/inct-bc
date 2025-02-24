import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { Controls } from '@/features/post-image-view/ui/Controls'
import { LinearLoader } from '@byte-creators/ui-kit'

type Props = {
  onImageLoad: () => void
  uploadedImage: string
}

export const ImageZoom = ({ onImageLoad, uploadedImage }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
    onImageLoad()
  }

  const handleImageError = () => {
    setIsLoading(false)
  }

  return (
    <TransformWrapper initialScale={1}>
      {isLoading && <LinearLoader isLoading={isLoading} />}
      {isLoading && (
        <Skeleton
          baseColor={'#222222'}
          borderRadius={8}
          className={'absolute top-0 left-0'}
          height={'72vh'}
          highlightColor={'#333333'}
          width={'72vh'}
        />
      )}
      <div className={'text-center'} style={{ display: isLoading ? 'none' : 'block' }}>
        <TransformComponent>
          <img
            alt={'uploaded'}
            className={'rounded-lg h-[72vh] w-[72vh]'}
            onError={handleImageError}
            onLoad={handleImageLoad}
            src={uploadedImage}
          />
        </TransformComponent>

        <Controls />
      </div>
    </TransformWrapper>
  )
}
