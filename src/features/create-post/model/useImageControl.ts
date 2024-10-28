import { useEffect, useRef, useState } from 'react'

export const useImageControl = () => {
  const [isImagesControlOpen, setIsImagesControlOpen] = useState(false)
  const imagesControlRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (imagesControlRef.current && !imagesControlRef.current.contains(event.target as Node)) {
        setIsImagesControlOpen(false)
      }
    }

    if (imagesControlRef) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [imagesControlRef])

  return { imagesControlRef, isImagesControlOpen, setIsImagesControlOpen }
}
