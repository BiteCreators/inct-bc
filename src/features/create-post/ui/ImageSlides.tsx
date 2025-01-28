import React from 'react'

import { cn } from '@byte-creators/utils'

import { ImageData } from '../types'

export const generateAddedImageSlides = (images: ImageData[]): React.ReactNode[] => {
  return images.map((el, i) => (
    <div className={'h-[490px]'} key={el.initialUrl}>
      <img alt={'slide'} className={cn('')} src={el.totalUrl || el.initialUrl} />
    </div>
  ))
}
