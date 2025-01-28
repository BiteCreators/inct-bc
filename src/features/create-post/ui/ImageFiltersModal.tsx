import { Dispatch, SetStateAction, useRef } from 'react'

import { ScrollArea, Slider } from '@byte-creators/ui-kit'

import { useImageFilters } from '../model/useImageFilters'
import { ImageData } from '../types'
import { Slide } from './Slide'

type Props = {
  images: ImageData[]
  setImages: Dispatch<SetStateAction<ImageData[]>>
}

export const ImageFiltersModal = ({ images, setImages }: Props) => {
  const canvasRef = useRef<(HTMLCanvasElement | null)[]>([])
  const { filters, handleSelectFilter, setCurrentIndex, setFilters } = useImageFilters({
    canvasRef,
    images,
    setImages,
  })

  return (
    <div className={'flex min-h-[400px]'}>
      <div className={'w-1/2'}>
        <Slider
          duration={0}
          setCurrentIndex={setCurrentIndex}
          slides={images.map((image, index) => {
            return (
              <Slide
                currentIndex={index}
                filter={image.selectedFilter}
                imageUrl={image.initialUrl}
                key={image.initialUrl}
                setFilters={setFilters}
                setImages={setImages}
              />
            )
          })}
        />
      </div>

      <div className={'w-1/2 max-h-[490px]'}>
        <ScrollArea className={'h-full bg'} scrollbarClassName={'bg-dark-100'}>
          <div className={'grid grid-cols-3 gap-x-6 gap-y-[18px] px-14 py-6'}>
            {filters.map((filter, index) => (
              <button
                className={'w-[108px] flex flex-col items-center gap-1 relative'}
                key={`${filter.name}${index}`}
                onClick={() => handleSelectFilter(filter.name)}
              >
                <canvas
                  className={'w-full'}
                  ref={el => {
                    canvasRef.current[index] = el
                  }}
                />
                <span className={'first-letter:uppercase'}>{filter.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
