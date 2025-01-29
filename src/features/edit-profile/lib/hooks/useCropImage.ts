import { useRef, useState } from 'react'
import { Crop, convertToPixelCrop } from 'react-image-crop'

import { setCanvasPreview } from '@byte-creators/utils'

export const useCropImage = (updateAvatar: (file: File) => void) => {
  const previewImgRef = useRef<HTMLCanvasElement | null>(null)
  const [crop, setCrop] = useState<Crop>({
    height: 150,
    unit: 'px',
    width: 150,
    x: 25,
    y: 25,
  })

  const saveCroppedImage = (imgRef: HTMLImageElement | null, selectedFile: File | null) => {
    if (imgRef && previewImgRef.current) {
      const pixelCrop = convertToPixelCrop(crop, imgRef.width, imgRef.height)

      setCanvasPreview(imgRef, previewImgRef.current, pixelCrop)
    }

    if (previewImgRef.current) {
      previewImgRef.current.toBlob(blob => {
        if (blob && selectedFile) {
          const croppedFile = new File([blob], selectedFile.name || 'croppedImage.png', {
            type: 'image/png',
          })

          updateAvatar(croppedFile)
        }
      }, 'image/png')
    }
  }

  return {
    crop,
    previewImgRef,
    saveCroppedImage,
    setCrop,
  }
}
