import React, { useState } from 'react'

import { ImageZoom } from '@/features/post-image-view/ui/ImageZoom'

import styles from './styles.module.css'

type Props = {
  uploadedImage: null | string
}

export const DisplayImage = ({ uploadedImage }: Props) => {
  return (
    <div>
      <div className={styles.image}>
        <div className={styles.imageContainer}>
          {uploadedImage ? <ImageZoom uploadedImage={uploadedImage} /> : <div>No image found</div>}
        </div>
      </div>
    </div>
  )
}
