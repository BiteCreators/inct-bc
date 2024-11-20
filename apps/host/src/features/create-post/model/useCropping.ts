import { useEffect, useRef, useState } from 'react'

export const useCropping = () => {
  const [isCroppingOpen, setIsCroppingOpen] = useState(false)
  const croppingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (croppingRef.current && !croppingRef.current.contains(event.target as Node)) {
        setIsCroppingOpen(false)
      }
    }

    if (isCroppingOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCroppingOpen])

  return { croppingRef, isCroppingOpen, setIsCroppingOpen }
}
