import { useEffect, useRef, useState } from 'react'

import domtoimage from 'dom-to-image'

export const useImageFilters = ({ imagesUrl }: { imagesUrl: string[] }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [totalImagesFiles, setTotalImagesFiles] = useState<File[]>([])
  const [totalImagesUrls, setTotalImagesUrls] = useState<string[]>([])

  const totalImageRefs = useRef<(HTMLImageElement | null)[]>(Array(imagesUrl.length).fill(null))

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    setSelectedFilters(imagesUrl.map(() => ''))
  }, [imagesUrl])

  const handleSelectFilter = (selectedFilter: string) => {
    setSelectedFilters(selectedFilters =>
      selectedFilters.map((el, i) => (currentIndex === i ? selectedFilter : el))
    )
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
        await promise // Ждем завершения предыдущего промиса

        if (el) {
          const url = await domtoimage.toPng(el) // Генерация PNG изображения
          const file = await urlToFile(url, index.toString()) // Конвертация URL в файл

          const isDuplicate = totalImagesFiles.some(
            existingFile => existingFile.name === file.name && existingFile.size === file.size
          )

          if (!isDuplicate) {
            newUrls.push(url) // Добавляем уникальный URL
            newFiles.push(file) // Добавляем уникальный файл
          }
        }
      }, Promise.resolve())

      setTotalImagesFiles(prevFiles => [...prevFiles, ...newFiles])
      setTotalImagesUrls(prevUrls => [...prevUrls, ...newUrls])
    } catch (error) {
      console.error('Error applying filters:', error)
    }

    return { newFiles }
  }

  console.log(totalImagesFiles)

  return {
    currentIndex,
    handleApplyFilters,
    handleSelectFilter,
    selectedFilters,
    setCurrentIndex,
    totalImageRefs,
    totalImagesUrls,
  }
}
