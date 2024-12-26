import React from 'react'

import { cn } from '@byte-creators/utils'

import s from '../styles/filters.module.css'

import { ImageData } from '../types'

export const generateAddedImageSlides = (
  images: ImageData[],
  totalImageRefs: React.RefObject<(HTMLImageElement | null)[]>
): React.ReactNode[] => {
  return images.map((el, i) => (
    <img
      alt={'slide'}
      className={cn('w-full h-[490px] object-cover object-center', s.filter, s[el.selectedFilter])}
      key={el.initialUrl}
      ref={el => {
        if (totalImageRefs.current) {
          totalImageRefs.current[i] = el
        }
      }}
      src={el.initialUrl}
    />
  ))
}

export const generateTotalImageSlides = (images: ImageData[]): React.ReactNode[] => {
  return images.map(el => (
    <img
      alt={'slide'}
      className={cn('w-full h-full object-cover object-center')}
      key={el.totalUrl}
      src={el.totalUrl}
    />
  ))
}
