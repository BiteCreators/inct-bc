import React from 'react'

import { ImageZoom } from '@/features/post-image-view/ui/ImageZoom'

import styles from './styles.module.css'

type Props = {
  onImageLoad: () => void
  uploadedImage: null | string
}

export const DisplayImage = ({ onImageLoad, uploadedImage }: Props) => {
  return (
    <div>
      <div className={styles.image}>
        <div className={styles.imageContainer}>
          {uploadedImage ? (
            <ImageZoom onImageLoad={onImageLoad} uploadedImage={uploadedImage} />
          ) : (
            <div>No image found</div>
          )}
        </div>
      </div>
    </div>
  )
}
