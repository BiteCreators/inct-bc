import React, { useEffect } from 'react'

import { ArrowIosBack, ArrowIosForward } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { useSlider } from '@/common/ui/slider/useSlider'

type Props = {
  duration?: number
  height?: string
  slidesUrl: string[]
  stylesSlider?: string
}

export const Slider = ({ duration = 4000, height = '560', slidesUrl, stylesSlider }: Props) => {
  const {
    currentIndex,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave,
    handlers,
    isPaused,
    nextSlide,
    prevSlide,
  } = useSlider(slidesUrl)

  useEffect(() => {
    if (duration !== 0) {
      if (!isPaused) {
        const interval = setInterval(nextSlide, duration)

        return () => clearInterval(interval)
      }
    }
  }, [isPaused])

  const stylesBtn =
    'absolute z-10 bg-gray-800 bg-opacity-40 top-1/2 -translate-y-1/2 p-3 cursor-pointer duration-300 ease-in-out md:block hidden hover:bg-gray-700 hover:opacity-85'

  return (
    <div
      {...handlers}
      className={cn(`relative w-full h-[${height}px] overflow-hidden`, stylesSlider)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={cn('left-3', stylesBtn)} onClick={prevSlide}>
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
      <button className={cn('right-3', stylesBtn)} onClick={nextSlide}>
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
