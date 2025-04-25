import React, { ReactNode } from 'react'

import { useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { ScrollArea, Slider, Typography } from '@byte-creators/ui-kit'
import { cn, useMediaQuery } from '@byte-creators/utils'

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
  const isLargeScreen = useMediaQuery('(min-width: 768px)')
  const content = (
    <div className={'md:w-1/2 max-h-[200px] md:max-h-[400px]'}>
      <ScrollArea className={'h-full'} scrollbarClassName={'bg-dark-100'}>
        <ul
          className={
            'bg-dark-300 md:bg-transparent grid grid-cols-3 md:gap-x-6 md:gap-y-[18px] md:px-14 pt-6 pb-6'
          }
        >
          {filterValues.map((el, index) => (
            <li
              className={'flex flex-col gap-2 items-center cursor-pointer pb-4 md:pb-0'}
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
  )

  return (
    <div className={'flex md:min-h-[400px] flex-col md:flex-row'}>
      <div className={'h-auto md:w-1/2'}>
        <Slider duration={0} setCurrentIndex={setCurrentIndex} slides={slides} />
      </div>
      {isLargeScreen ? content : <ScrollArea>{content}</ScrollArea>}
      {/*{content}*/}
    </div>
  )
}
