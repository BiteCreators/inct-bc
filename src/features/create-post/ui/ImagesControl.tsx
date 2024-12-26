import React, { RefObject } from 'react'

import { Button, DragAndDropInput, ScrollArea } from '@byte-creators/ui-kit'
import {
  CloseOutlineSmall,
  Image,
  ImageOutline,
  PlusCircleOutlineBig,
} from '@byte-creators/ui-kit/icons'

import { useImageControl } from '../model/useImageControl'
import { ImageData } from '../types'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleDeleteImageUrl: (index: number) => void
  handleFileSelect: (file: File) => void
  images: ImageData[]
  isDisableInput: boolean
  uploadImage: () => void
}

export const ImageControl = ({
  fileInputRef,
  handleDeleteImageUrl,
  handleFileSelect,
  images,
  isDisableInput,
  uploadImage,
}: Props) => {
  const { imagesControlRef, isImagesControlOpen, setIsImagesControlOpen } = useImageControl()

  return (
    <div className={'relative ml-auto'} ref={imagesControlRef}>
      <Button
        className={`${isImagesControlOpen && 'text-primary-500'}`}
        onClick={() => setIsImagesControlOpen(!isImagesControlOpen)}
        variant={'icon'}
      >
        {isImagesControlOpen ? <Image /> : <ImageOutline />}
      </Button>
      {isImagesControlOpen && (
        <div
          className={
            'bg-dark-500 bg-opacity-80 p-[12px] rounded-sm flex justify-center items-start gap-3 absolute right-0 bottom-[38px]'
          }
        >
          <ScrollArea className={'max-w-[300px] w-auto'} orientation={'horizontal'}>
            <ul className={'flex gap-3'}>
              {images.map((el, i) => (
                <li className={'rounded-[1px] relative'} key={i}>
                  <img
                    alt={'Image'}
                    className={'h-20 max-w-52 overflow-hidden'}
                    src={el.initialUrl}
                  />
                  <button
                    className={
                      'top-[2px] right-[2px] p-0 w-3 h-3 bg-dark-500 bg-opacity-80 rounded-sm absolute'
                    }
                    onClick={() => handleDeleteImageUrl(i)}
                  >
                    <CloseOutlineSmall />
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>

          <DragAndDropInput fileInputRef={fileInputRef} onFileSelect={handleFileSelect}>
            <button disabled={isDisableInput} onClick={uploadImage}>
              <PlusCircleOutlineBig />
            </button>
          </DragAndDropInput>
        </div>
      )}
    </div>
  )
}
