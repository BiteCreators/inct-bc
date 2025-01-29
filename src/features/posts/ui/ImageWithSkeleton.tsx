import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { cn } from '@byte-creators/utils'

type Props = {
  alt: string
  className?: string
  onError?: () => void
  onLoad?: () => void
  skeletonClassName?: string
  src: string
  wrapperClassName?: string
}

export const ImageWithSkeleton = ({
  alt,
  className = '',
  onError,
  onLoad,
  skeletonClassName,
  src,
  wrapperClassName = 'w-full h-full',
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) {
      onLoad()
    }
  }

  const handleError = () => {
    setIsLoaded(true)
    if (onError) {
      onError()
    }
  }

  return (
    <div
      className={cn(wrapperClassName, 'relative')}
      style={{ height: '100%', position: 'relative', width: '100%' }}
    >
      {!isLoaded && (
        <Skeleton
          baseColor={'#3f3e3e'}
          borderRadius={0}
          className={cn(skeletonClassName, 'absolute top-0 left-0 w-full h-full')}
          highlightColor={'#575656'}
        />
      )}
      <img
        alt={alt}
        className={`${className} ${!isLoaded ? 'invisible' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
        src={src}
      />
    </div>
  )
}
