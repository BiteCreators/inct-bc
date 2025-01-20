import { useEffect, useState } from 'react'

import ColorThief from 'colorthief'
import { useRouter } from 'next/router'

export const useImagePalette = () => {
  const router = useRouter()
  const { image: imageSrc } = router.query
  const [colorPalette, setColorPalette] = useState<[number, number, number][] | null>(null)
  const [gradient, setGradient] = useState<string>('')
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    if (imageSrc && typeof imageSrc === 'string') {
      const img = new Image()

      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const colorThief = new ColorThief()
        const palette = colorThief.getPalette(img, 6)

        setColorPalette(palette)
      }

      img.onerror = e => {
        setError(`Img loading error: ${e}`)
      }

      img.src = imageSrc
    } else if (router.isReady) {
      setError('No imageSrc provided')
    }
  }, [imageSrc, router.isReady])

  useEffect(() => {
    if (colorPalette) {
      const gradientColors = colorPalette.map(color => `rgb(${color.join(',')})`)

      setGradient(`conic-gradient(from 0deg, ${gradientColors.join(', ')})`)
    }
  }, [colorPalette])

  return { error, gradient }
}
