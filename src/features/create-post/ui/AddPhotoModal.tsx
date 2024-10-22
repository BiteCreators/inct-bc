import React from 'react'

import { ImageOutline } from '@/common/assets/icons/components'
import { Button } from '@/common/ui'

export const AddPhotoModal = ({ handleNext }: { handleNext: () => void }) => {
  return (
    <div className={'w-full items-end'}>
      <div className={'w-full flex flex-col justify-center items-center'}>
        <div
          className={
            'bg-dark-700 w-[300px] h-[300px] md:w-56 md:h-56 mt-3 md:mt-[60px] flex justify-center items-center mb-14'
          }
        >
          <ImageOutline height={48} viewBox={'0 0 24 24'} width={48} />
        </div>
        <Button className={'w-56 bottom-0 mb-7'} onClick={handleNext}>
          Select from Computer
        </Button>
        <Button className={'w-56 bottom-0 mb-9'} variant={'outline'}>
          Open Draft
        </Button>
      </div>
    </div>
  )
}
