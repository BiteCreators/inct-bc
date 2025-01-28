import React from 'react'

import { cn } from '@byte-creators/utils'

import { ImageData } from '../types'

export const generateAddedImageSlides = (images: ImageData[]): React.ReactNode[] => {
  return images.map(el => (
    <div className={'w-[490px] pb-[100%] overflow-hidden relative'} key={el.initialUrl}>
      <img
        alt={'slide'}
        className={cn('w-full h-full object-contain object-center absolute top-0 left-0')}
        src={el.totalUrl || el.initialUrl}
      />
    </div>
  ))
}
