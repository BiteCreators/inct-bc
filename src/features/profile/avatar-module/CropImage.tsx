import React, { useRef } from 'react'
import { Crop, ReactCrop, centerCrop, makeAspectCrop } from 'react-image-crop'

import { Button } from '@/common/ui'

type Props = {
  crop: Crop
  imageUrl: string
  saveCroppedImage: (img: HTMLImageElement | null) => void
  setCrop: (crop: Crop) => void
}

export const CropImage = ({ crop, imageUrl, saveCroppedImage, setCrop }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { height, width } = e.currentTarget
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: 150,
        },
        1,
        width,
        height
      ),
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)

    setCrop(centeredCrop)
  }
  const saveCroppedImageHandler = () => {
    saveCroppedImage(imgRef.current)
  }

  return (
    <div className={'w-[444px] flex flex-col items-end'}>
      <ReactCrop
        aspect={1}
        circularCrop
        className={'w-full flex overflow-auto max-h-[60vh]'}
        crop={crop}
        keepSelection
        minHeight={150}
        minWidth={150}
        onChange={(crop, percentageCrop) => setCrop(crop)}
      >
        <img alt={'Selected'} className={''} onLoad={onImageLoad} ref={imgRef} src={imageUrl} />
      </ReactCrop>
      <Button className={'mt-6 mb-4 px-7'} onClick={saveCroppedImageHandler}>
        Save
      </Button>
    </div>
  )
}
