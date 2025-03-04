import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { Controls } from '@/features/post-image-view/ui/Controls'
import { LinearLoader } from '@byte-creators/ui-kit'
import { useMediaQuery } from '@byte-creators/utils'

type Props = {
  onImageLoad: () => void
  uploadedImage: string
}

export const ImageZoom = ({ onImageLoad, uploadedImage }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  const isSuperSmallScreen = useMediaQuery('(max-width: 450px)')

  const handleImageLoad = () => {
    setIsLoading(false)
    onImageLoad()
  }

  const handleImageError = () => {
    setIsLoading(false)
  }
  let skeletonSize = '50vh'

  if (isLargeScreen) {
    skeletonSize = '72vh'
  } else if (isSuperSmallScreen) {
    skeletonSize = '40vh'
  }

  return (
    <TransformWrapper initialScale={1}>
      {isLoading && <LinearLoader isLoading={isLoading} />}
      {isLoading && (
        <Skeleton
          baseColor={'#222222'}
          borderRadius={8}
          className={'absolute top-0 left-0'}
          height={skeletonSize}
          highlightColor={'#333333'}
          width={skeletonSize}
        />
      )}
      <div className={'text-center'} style={{ display: isLoading ? 'none' : 'block' }}>
        <TransformComponent>
          <img
            alt={'uploaded'}
            className={'rounded-lg md:h-[72vh] sm:w-[72vh]'}
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
