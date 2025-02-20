import React from 'react'
import { Area } from 'react-easy-crop'

import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { createPostSlice } from '@/entities/posts/model/createPostSlice'
import { AspectRatio } from '@/features/create-post/ui/AspectRatio'
import { ImageZoomControl } from '@/features/create-post/ui/ImageZoomControl'
import { getCroppedImg } from '@/features/create-post/utils/getCroppedImg'
import { useScopedTranslation } from '@byte-creators/utils'

type Props = {
  croppedAreaPixels: Area | null
  setAspect: (aspect: number) => void
  setZoom: (zoom: number) => void
  zoom: number
}

export const CroppingTools = ({ croppedAreaPixels, setAspect, setZoom, zoom }: Props) => {
  const dispatch = useAppDispatch()
  const createPostState = useAppSelector(state => state.createPost)
  const { images, selectedImage } = createPostState
  const t = useScopedTranslation('Posts')

  const onCrop = async () => {
    if (selectedImage === null || croppedAreaPixels === null) {
      return
    }

    const croppedImageUrl = await getCroppedImg(images[selectedImage].initialUrl, croppedAreaPixels)

    dispatch(
      createPostSlice.actions.setImages(
        images.map((img, i) =>
          i === selectedImage ? { ...img, initialUrl: croppedImageUrl } : img
        )
      )
    )

    dispatch(createPostSlice.actions.setSelectedImage(null))
  }

  return (
    <>
      {selectedImage !== null && (
        <>
          <AspectRatio setAspect={setAspect} />
          <ImageZoomControl setZoom={setZoom} zoom={zoom} />
          <div
            className={
              'bg-dark-500 bg-opacity-80 px-[12px] rounded-sm flex justify-center items-center h-9'
            }
          >
            <button className={'hover:text-primary-500'} onClick={onCrop}>
              {t.crop}
            </button>
          </div>
          <div
            className={
              'bg-dark-500 bg-opacity-80 px-[12px] rounded-sm flex justify-center items-center h-9'
            }
          >
            <button
              className={'hover:text-primary-500'}
              onClick={() => dispatch(createPostSlice.actions.setSelectedImage(null))}
            >
              {t.cropCancel}
            </button>
          </div>
        </>
      )}
    </>
  )
}
