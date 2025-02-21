import { useState } from 'react'

import { useImagePalette } from '@/features/post-image-view/model/useImagePalette'
import { DisplayImage } from '@/features/post-image-view/ui/DisplayImage'
import { Alert } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

import styles from './styles.module.css'

export const PostImageView = () => {
  const router = useRouter()
  const { image } = router.query
  const { colors, error } = useImagePalette()
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <>
      <div className={'fixed inset-0 w-full h-full blur-[100px] m-auto'}>
        <div
          className={styles.box}
          style={{ backgroundImage: `linear-gradient(80deg, black, ${colors[0]})` }}
        >
          <section
            className={styles.up}
            style={{ backgroundImage: `linear-gradient(80deg, ${colors[1]}, ${colors[2]})` }}
          />
          <section
            className={styles.down}
            style={{ backgroundImage: `linear-gradient(80deg, ${colors[3]}, ${colors[4]})` }}
          />
          <section
            className={styles.left}
            style={{ backgroundImage: `linear-gradient(80deg, ${colors[5]}, ${colors[1]})` }}
          />
          <section
            className={styles.right}
            style={{ backgroundImage: `linear-gradient(80deg, ${colors[2]}, ${colors[3]})` }}
          />
        </div>
      </div>
      <main className={'flex items-center justify-center min-h-[90vh] p-4 px-16'}>
        <DisplayImage onImageLoad={handleImageLoad} uploadedImage={image as string} />
      </main>
      {error && <Alert message={error} purpose={'toast'} type={'error'} />}
    </>
  )
}
