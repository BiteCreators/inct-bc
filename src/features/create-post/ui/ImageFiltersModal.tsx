import React, { MutableRefObject, ReactNode, RefObject } from 'react'

import { cn } from '@/common/lib/utils/cn'
import { ScrollArea, Typography } from '@/common/ui'
import { Slider } from '@/common/ui/slider/Slider'

import s from '@/app/styles/filters.module.css'

import { ImageData } from '../types'
import { filterValues } from '../utils/filterValues'

type Props = {
  currentIndex: number
  handleSelectFilter: (selectedFilter: string) => void
  imagesURL: ImageData[]
  setCurrentIndex: (currentIndex: number) => void
  slides: ReactNode[]
}

export const ImageFiltersModal = ({
  currentIndex,
  handleSelectFilter,
  imagesURL,
  setCurrentIndex,
  slides,
}: Props) => {
  return (
    <div className={'flex h-[490px]'}>
      <div className={'w-1/2'}>
        <Slider duration={0} setCurrentIndex={setCurrentIndex} slides={slides} />
      </div>
      <div className={'w-1/2 h-[490px]'}>
        <ScrollArea className={'h-full bg'}>
          <ul className={'grid grid-cols-3 gap-x-6 gap-y-[18px] px-14 py-6'}>
            {filterValues.map((el, index) => (
              <li
                className={'flex flex-col gap-2 items-center cursor-pointer'}
                key={index}
                onClick={() => handleSelectFilter(el.class)}
              >
                <div className={'w-[108px] h-[108px]'}>
                  <img
                    alt={'oops'}
                    className={cn('w-full h-full', s[filterValues[index].class])}
                    src={imagesURL[currentIndex].initialUrl}
                  />
                </div>
                <Typography>{el.name}</Typography>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  )
}
