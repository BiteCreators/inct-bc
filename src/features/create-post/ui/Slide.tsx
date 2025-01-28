import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { Filters, ImageData } from '../types'
import { applyFilter } from '../utils/applyFilter'
import { FilterValues } from '../utils/filterValues'

type SlideProps = {
  currentIndex: number
  filter: Filters
  imageUrl: string
  setFilters: Dispatch<SetStateAction<FilterValues[]>>
  setImages: Dispatch<SetStateAction<ImageData[]>>
}

export const Slide = ({ currentIndex, filter, imageUrl, setImages }: SlideProps) => {
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

    //saveFilteredImage(canvas)
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
