import React, { ReactNode } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { ScrollArea, Slider, Typography } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'

import s from '../styles/filters.module.css'

import { filterValues } from '../utils/filterValues'

type Props = {
  currentIndex: number
  handleSelectFilter: (selectedFilter: string) => void
  setCurrentIndex: (currentIndex: number) => void
  slides: ReactNode[]
}

export const ImageFiltersModal = ({
  currentIndex,
  handleSelectFilter,
  setCurrentIndex,
  slides,
}: Props) => {
  const createPostState = useAppSelector(state => state.createPost)
  const { images } = createPostState

  return (
    <div className={'flex min-h-[400px]'}>
      <div className={'w-1/2'}>
        <Slider duration={0} setCurrentIndex={setCurrentIndex} slides={slides} />
      </div>
      <div className={'w-1/2 max-h-[400px]'}>
        <ScrollArea className={'h-full bg'} scrollbarClassName={'bg-dark-100'}>
          <ul className={'grid grid-cols-3 gap-x-6 gap-y-[18px] px-14 py-6'}>
            {filterValues.map((el, index) => (
              <li
                className={'flex flex-col gap-2 items-center cursor-pointer'}
                key={el.name}
                onClick={() => handleSelectFilter(el.class)}
              >
                <div className={'w-[108px] h-[108px]'}>
                  <img
                    alt={'oops'}
                    className={cn('w-full h-full', s[filterValues[index].class])}
                    src={images[currentIndex]?.initialUrl}
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
