import React, { RefObject } from 'react'

import { Button, DragAndDropInput } from '@byte-creators/ui-kit'
import { ImageOutline } from '@byte-creators/ui-kit/icons'
import { useScopedTranslation } from '@byte-creators/utils'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleFileSelect: (file: File) => void
  uploadImage: () => void
}

export const AddPhotoModal = ({ fileInputRef, handleFileSelect, uploadImage }: Props) => {
  const t = useScopedTranslation('Posts')

  return (
    <div
      className={'w-full flex flex-col justify-center items-center'}
      data-testid={'add-photo-modal'}
    >
      <DragAndDropInput fileInputRef={fileInputRef} onFileSelect={handleFileSelect}>
        <div
          className={
            'bg-dark-700 w-[300px] h-[300px] md:w-56 md:h-56 mt-3 md:mt-[60px] flex justify-center items-center mb-14'
          }
          data-testid={'drop-zone'}
        >
          <ImageOutline height={48} viewBox={'0 0 24 24'} width={48} />
        </div>
      </DragAndDropInput>
      <Button className={'w-56 bottom-0 mb-7'} onClick={uploadImage}>
        {t.selectFromComputer}
      </Button>
      <Button className={'w-56 bottom-0 mb-9'} variant={'outline'}>
        {t.openDraft}
      </Button>
    </div>
  )
}
