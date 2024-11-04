import React, { RefObject } from 'react'

import {
  CloseOutlineSmall,
  Image,
  ImageOutline,
  PlusCircleOutlineBig,
} from '@/common/assets/icons/components'
import { Button } from '@/common/ui'
import { DragAndDropInput } from '@/common/ui/drag-and-drop-input/DragAndDropInput'

import { useImageControl } from '../model/useImageControl'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleDeleteImageUrl: (index: number) => void
  handleFileSelect: (file: File) => void
  imagesUrl: string[]
  isDisableInput: boolean
  uploadImage: () => void
}

export const ImageControl = ({
  fileInputRef,
  handleDeleteImageUrl,
  handleFileSelect,
  imagesUrl,
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
          <ul className={'grid grid-cols-3 min-w-[264px] gap-3'}>
            {imagesUrl.map((el, i) => (
              <li className={'w-20 h-20 rounded-[1px] relative'} key={i}>
                <img alt={'Image'} src={el} />
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
