import React from 'react'

import { cn } from '@byte-creators/utils'

import s from '../styles/filters.module.css'

import { ImageData } from '../types'

export const generateAddedImageSlides = (
  images: ImageData[],
  step: number,
  totalImageRefs: React.RefObject<(HTMLImageElement | null)[]>
): React.ReactNode[] => {
  return images.map((el, i) => (
    <img
      alt={'slide'}
      className={cn(
        'w-full object-cover object-center',
        step === 3 || step === 4 ? 'h-[330px] md:h-[490px]' : 'h-[490px]',
        s.filter,
        s[el.selectedFilter]
      )}
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
