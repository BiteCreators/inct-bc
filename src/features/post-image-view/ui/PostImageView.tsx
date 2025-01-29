import { useImagePalette } from '@/features/post-image-view/model/useImagePalette'
import { DisplayImage } from '@/features/post-image-view/ui/DisplayImage'
import { Alert } from '@byte-creators/ui-kit'
import { cn } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import styles from './styles.module.css'

export const PostImageView = () => {
  const router = useRouter()
  const { image } = router.query
  const { error, gradient } = useImagePalette()

  return (
    <>
      <div className={'fixed inset-0 w-full h-full blur-[100px] m-auto -z-10'}>
        <div
          className={cn(
            'absolute inset-0 w-screen h-screen',
            'min-w-[1000px] overflow-hidden',
            'rounded-[99999px] m-auto scale-90'
          )}
        >
          <div className={styles.blob} style={{ background: gradient }}></div>
        </div>
      </div>
      <main className={'flex items-center justify-center min-h-[90vh] p-4 px-16'}>
        <DisplayImage uploadedImage={image as string} />
      </main>
      {error && <Alert message={error} purpose={'toast'} type={'error'} />}
    </>
  )
}
