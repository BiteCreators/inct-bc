import { useEffect, useState } from 'react'

import DisplayImage from '@/features/gradient/DisplayImage'
import ColorThief from 'colorthief'
import { useRouter } from 'next/router'

import styles from './styles.module.css'

const PostImageView = () => {
  const router = useRouter()
  const { image } = router.query

  const [colorPalette, setColorPalette] = useState<[number, number, number][] | null>(null)
  const [gradient, setGradient] = useState<string>('')

  useEffect(() => {
    if (image) {
      const img = new Image()

      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        const colorThief = new ColorThief()
        const palette = colorThief.getPalette(img, 6)

        setColorPalette(palette)
      }

      img.onerror = e => {
        console.error('Img loading error:', e)
      }

      img.src = image as string
    } else {
      console.log('No imageSrc provided')
    }
  }, [image])

  useEffect(() => {
    if (colorPalette) {
      const gradientColors = colorPalette.map(color => `rgb(${color.join(',')})`)

      setGradient(`conic-gradient(from 0deg, ${gradientColors.join(', ')})`)
    }
  }, [colorPalette])

  return (
    <>
      <div
        style={{
          filter: 'blur(100px)',
          height: '100%',
          inset: 0,
          margin: 'auto',
          position: 'fixed',
          width: '100%',
          zIndex: -10,
        }}
      >
        <div
          style={{
            borderRadius: '99999px',
            height: '100vh',
            inset: 0,
            margin: 'auto',
            minWidth: '1000px',
            overflow: 'hidden',
            position: 'absolute',
            transform: 'scale(0.8)',
            width: '100vw',
          }}
        >
          <div className={styles.blob} style={{ background: gradient }}></div>
        </div>
      </div>
      <main className={styles.content}>
        <DisplayImage colorPalette={colorPalette} uploadedImage={image as string} />
      </main>
    </>
  )
}

export default PostImageView
