import { useState } from 'react'

export const useSlider = (slidesUrl: string[]) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slidesUrl.length)
  }

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? slidesUrl.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return {
    currentIndex,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave,
    isPaused,
    nextSlide,
    prevSlide,
  }
}
