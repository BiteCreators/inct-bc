import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'

import { ScrollArea, Slider } from '@byte-creators/ui-kit'

import { Filters, ImageData } from '../types'
import { applyFilter, filtersData } from '../utils/applyFilter'

type Props = {
  currentIndex: number
  handleSelectFilter: (selectedFilter: Filters) => void
  images: ImageData[]
  setCurrentIndex: (currentIndex: number) => void
  setImages: Dispatch<SetStateAction<ImageData[]>>
  slides: ReactNode[]
}

export const ImageFiltersModal = ({
  currentIndex,
  handleSelectFilter,
  images,
  setCurrentIndex,
  setImages,
}: Props) => {
  const [filters, setFilters] = useState<{ image: string; name: Filters }[]>(filtersData)

  useEffect(() => {
    filters.forEach(filter => {
      const canvas = document.createElement('canvas')
      const img = new Image()

      img.src = images[currentIndex].initialUrl
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return
      }
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      applyFilter({ canvas, ctx, filter: filter.name, imgRef: { current: img } })
      setFilters(prevState =>
        prevState.map(el =>
          el.name === filter.name ? { ...el, image: canvas.toDataURL('image/png') } : el
        )
      )
    })
  }, [])

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
                <img alt={'oops'} src={filter.image} />
                <span className={'first-letter:uppercase'}>{filter.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

type SlideProps = {
  currentIndex: number
  filter: string
  imageUrl: string
  setFilters: Dispatch<
    SetStateAction<
      {
        image: string
        name: Filters
      }[]
    >
  >
  setImages: Dispatch<SetStateAction<ImageData[]>>
}

const Slide = ({ currentIndex, filter, imageUrl, setImages }: SlideProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !imgRef.current) {
      return
    }

    const canvas = canvasRef.current
    const img = imgRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (!ctx) {
      return
    }

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    applyFilter({ canvas, ctx, filter, imgRef })

    saveFilteredImage(canvas)
  }, [filter])

  const saveFilteredImage = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return
    }

    const filteredDataURL = canvas.toDataURL('image/png')

    fetch(filteredDataURL)
      .then(res => res.blob())
      .then(blob => {
        const filteredFile = new File([blob], `filteredImage-${currentIndex}.png`, {
          type: 'image/png',
        })

        setImages(prevState =>
          prevState.map((image, index) =>
            index === currentIndex
              ? { ...image, totalFile: filteredFile, totalUrl: filteredDataURL }
              : image
          )
        )
      })
  }

  return (
    <div style={{ width: '800px' }}>
      <img
        alt={'slide'}
        ref={imgRef}
        src={imageUrl}
        style={{ display: 'none', height: '600', width: '800px' }}
      />
      <canvas className={'w-[490px]'} ref={canvasRef} />
    </div>
  )
}
