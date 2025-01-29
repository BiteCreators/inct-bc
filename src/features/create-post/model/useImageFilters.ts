import { RefObject, useEffect, useState } from 'react'

import { Filters, ImageData } from '../types'
import { applyFilter } from '../utils/applyFilter'
import { FilterValues, filterValues } from '../utils/filterValues'

export const useImageFilters = ({
  canvasRef,
  images,
  setImages,
}: {
  canvasRef: RefObject<(HTMLCanvasElement | null)[]>
  images: ImageData[]
  setImages: (images: ImageData[]) => void
}) => {
  const [filters, setFilters] = useState<FilterValues[]>(filterValues)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleSelectFilter = (selectedFilter: Filters) => {
    setImages(images.map((el, i) => (i === currentIndex ? { ...el, selectedFilter } : el)))
  }

  useEffect(() => {
    filters.forEach((filter, index) => {
      const canvas = canvasRef.current[index]
      const img = new Image()

      if (!canvas) {
        return
      }
      img.src = images[currentIndex].initialUrl
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return
      }
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      applyFilter({ canvas, ctx, filter: filter.name, imgRef: { current: img } })
    })
  }, [currentIndex])

  return {
    filters,
    handleSelectFilter,
    setCurrentIndex,
    setFilters,
  }
}
