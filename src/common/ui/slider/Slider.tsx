import React, { useEffect, useState } from 'react'

import { ArrowIosBack, ArrowIosForward } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { useSlider } from '@/common/ui/slider/useSlider'

type Props = {
  duration?: number
  height?: string
  sliderStyles?: string
  slidesUrl: string[]
}

export const Slider = ({ duration = 4000, height = '560px', sliderStyles, slidesUrl }: Props) => {
  const {
    currentIndex,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave,
    isPaused,
    nextSlide,
    prevSlide,
  } = useSlider(slidesUrl)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, duration)

      return () => clearInterval(interval)
    }
  }, [isPaused])

  return (
    <div
      className={cn(`relative w-full h-[${height}] overflow-hidden`, sliderStyles)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={
          'absolute z-10 bg-gray-800 bg-opacity-40 top-1/2 -translate-y-1/2 left-3 p-3 cursor-pointer duration-300 ease-in-out hover:bg-gray-700 hover:opacity-85'
        }
        onClick={prevSlide}
      >
        <ArrowIosBack viewBox={'5 5 14 14'} />
      </button>
      <ul
        className={'flex w-full h-full transition-transform duration-500'}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesUrl.map((slideUrl, i) => (
          <li className={`w-full flex-shrink-0`} key={i}>
            <img
              alt={'slide'}
              className={'w-full h-full object-cover object-center'}
              src={slideUrl}
            />
          </li>
        ))}
      </ul>
      <button
        className={
          'absolute z-10 bg-gray-800 bg-opacity-40 top-1/2 -translate-y-1/2 right-3 p-3 cursor-pointer duration-300 ease-in-out hover:bg-gray-700 hover:opacity-85'
        }
        onClick={nextSlide}
      >
        <ArrowIosForward viewBox={'5 5 14 14'} />
      </button>
      <div
        className={
          'absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 p-2 bg-gray-700 bg-opacity-50'
        }
      >
        {slidesUrl.map((_, i) => (
          <button
            className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-primary-500' : 'bg-light-100'} hover:bg-primary-500`}
            key={i}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  )
}
