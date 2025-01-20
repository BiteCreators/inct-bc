import React, { useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { Controls } from '@/features/post-image-view/ui/Controls'
import { LoaderBlock } from '@byte-creators/ui-kit'

type Props = {
  uploadedImage: string
}

export const ImageZoom = ({ uploadedImage }: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
  }

  return (
    <TransformWrapper initialScale={1}>
      {isLoading && <LoaderBlock />}
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
