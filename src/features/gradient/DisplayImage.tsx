import React from 'react'

import { Button } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

import styles from './styles.module.css'

type Props = {
  colorPalette: [number, number, number][] | null
  uploadedImage: null | string
}

const DisplayImage = ({ colorPalette, uploadedImage }: Props) => {
  const router = useRouter()

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
        {uploadedImage ? <img alt={'uploaded'} src={uploadedImage} /> : <div>No image</div>}
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
      <Button onClick={() => router.back()} style={{ margin: '20px 120px' }} variant={'text'}>
        Back
      </Button>
    </div>
  )
}

export default DisplayImage
