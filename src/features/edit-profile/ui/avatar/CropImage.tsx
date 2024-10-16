import React, { useRef } from 'react'
import { Crop, ReactCrop, centerCrop, makeAspectCrop } from 'react-image-crop'

import { Button, ScrollArea } from '@/common/ui'

import 'react-image-crop/dist/ReactCrop.css'
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

    setCrop(crop)
  }

  const saveCroppedImageHandler = () => {
    saveCroppedImage(imgRef.current)
  }

  return (
    <div className={''}>
      <ScrollArea className={'max-h-[calc(100vh-100px)] flex flex-col'}>
        <div className={'flex flex-col items-center'}>
          <ReactCrop
            aspect={1}
            circularCrop
            crop={crop}
            keepSelection
            minHeight={150}
            minWidth={150}
            onChange={newCrop => setCrop(newCrop)}
          >
            <img
              alt={'Selected'}
              className={'max-w-full h-auto'}
              onLoad={onImageLoad}
              ref={imgRef}
              src={imageUrl}
            />
          </ReactCrop>
          <Button className={'mt-6 mb-4 px-7 z-10 self-end'} onClick={saveCroppedImageHandler}>
            Save
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
