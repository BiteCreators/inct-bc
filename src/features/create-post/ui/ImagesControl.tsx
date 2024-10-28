import React, { ChangeEvent, useRef } from 'react'

import {
  CloseOutlineSmall,
  ImageDefault,
  ImageOutline,
  PlusCircleOutlineBig,
} from '@/common/assets/icons/components'
import { Button } from '@/common/ui'
import { Image } from '@/entities/posts'

import { useImageControl } from '../model/useImageControl'

type Props = {
  handleDeleteImage: (imageId: string) => void
  images: Image[]
  uploadImageForPost: (file: File) => void
}

export const ImageControl = ({ handleDeleteImage, images, uploadImageForPost }: Props) => {
  const { imagesControlRef, isImagesControlOpen, setIsImagesControlOpen } = useImageControl()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]

    if (file) {
      uploadImageForPost(file)
    }
  }

  return (
    <div className={'relative ml-auto'} ref={imagesControlRef}>
      <Button
        className={`${isImagesControlOpen && 'text-primary-500'}`}
        onClick={() => setIsImagesControlOpen(!isImagesControlOpen)}
        variant={'icon'}
      >
        {isImagesControlOpen ? <ImageDefault /> : <ImageOutline />}
      </Button>
      {isImagesControlOpen && (
        <div
          className={
            'bg-dark-500 bg-opacity-80 p-[12px] rounded-sm flex justify-center items-start gap-3 absolute right-0 bottom-[38px]'
          }
        >
          <ul className={'grid grid-cols-3 min-w-[264px] gap-3'}>
            {images.map(el => (
              <li className={'w-20 h-20 rounded-[1px] relative'} key={el.uploadId}>
                <img alt={'Image'} src={el.url} />
                <button
                  className={
                    'top-[2px] right-[2px] p-0 w-3 h-3 bg-dark-500 bg-opacity-80 rounded-sm absolute'
                  }
                  onClick={() => handleDeleteImage(el.uploadId)}
                >
                  <CloseOutlineSmall />
                </button>
              </li>
            ))}
          </ul>

          <button onClick={handleButtonClick}>
            <PlusCircleOutlineBig />
          </button>
          <input
            className={'hidden'}
            onChange={handleFileChange}
            ref={fileInputRef}
            type={'file'}
          />
        </div>
      )}
    </div>
  )
}
