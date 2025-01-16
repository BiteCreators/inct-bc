import React from 'react'

import { ImageZoom } from '@/features/gradient/ImageZoom'

import styles from './styles.module.css'

type Props = {
  colorPalette: [number, number, number][] | null
  uploadedImage: null | string
}

const DisplayImage = ({ colorPalette, uploadedImage }: Props) => {
  const toHex = (rgb: number) => {
    let hex = rgb.toString(16)

    if (hex.length < 2) {
      hex = '0' + hex
    }

    return hex
  }

  return (
    <div>
      <div className={styles.image}>
        <div className={styles.imageContainer}>
          {uploadedImage ? <ImageZoom uploadedImage={uploadedImage} /> : <div>No image</div>}
        </div>
      </div>

      {colorPalette && (
        <div>
          {colorPalette.map((color, index) => {
            const rgb = `rgb(${color.join(',')})`
            const hex = `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`

            console.log(`Color ${index}: RGB=${rgb}, HEX=${hex}`)

            return <div key={index}></div>
          })}
        </div>
      )}
    </div>
  )
}

export default DisplayImage
