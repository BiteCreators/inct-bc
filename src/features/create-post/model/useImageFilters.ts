import { useRef, useState } from 'react'

import domtoimage from 'dom-to-image'

import { Filters, ImageData } from '../types'

export const useImageFilters = ({
  images,
  setImages,
}: {
  images: ImageData[]
  setImages: (images: ImageData[]) => void
}) => {
  const totalImageRefs = useRef<(HTMLImageElement | null)[]>(Array(images.length).fill(null))

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleSelectFilter = (selectedFilter: Filters) => {
    setImages(images.map((el, i) => (i === currentIndex ? { ...el, selectedFilter } : el)))
  }

  const urlToFile = async (url: string, fileName: string) => {
    const res = await fetch(url)
    const blob = await res.blob()

    return new File([blob], fileName, { type: blob.type })
  }

  const handleApplyFilters = async (): Promise<{ newFiles: File[] }> => {
    const newUrls: string[] = []
    const newFiles: File[] = []

    try {
      await totalImageRefs.current.reduce(async (promise, el, index) => {
        await promise

        if (el) {
          const url = await domtoimage.toPng(el)
          const file = await urlToFile(url, index.toString())

          newFiles.unshift(file)
          newUrls.push(url)
        }
      }, Promise.resolve())
      setImages(images.map((el, index) => ({ ...el, totalUrl: newUrls[index] })))
    } catch (error) {
      console.error('Error applying filters:', error)
    }

    return { newFiles }
  }

  return {
    currentIndex,
    handleApplyFilters,
    handleSelectFilter,
    setCurrentIndex,
    totalImageRefs,
  }
}
