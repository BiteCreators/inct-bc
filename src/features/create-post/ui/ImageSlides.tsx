import React from 'react'

import { cn } from '@byte-creators/utils'

import s from '../styles/filters.module.css'

import { ImageData } from '../types'

export const generateAddedImageSlides = (images: ImageData[]): React.ReactNode[] => {
  return images.map((el, i) => (
    <div className={'h-[490px]'} key={el.initialUrl}>
      <img
        alt={'slide'}
        className={cn('', s.filter, s[el.selectedFilter])}
        src={el.totalUrl || el.initialUrl}
      />
    </div>
  ))
}
