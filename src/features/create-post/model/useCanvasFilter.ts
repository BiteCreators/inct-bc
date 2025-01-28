import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { Filters, ImageData } from '../types'
import { applyFilter } from '../utils/applyFilter'

export const useCanvasFilter = ({
  currentIndex,
  filter,
  setImages,
}: {
  currentIndex: number
  filter: Filters
  setImages: Dispatch<SetStateAction<ImageData[]>>
}) => {
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
  }, [filter])

  return { canvasRef, imgRef }
}
