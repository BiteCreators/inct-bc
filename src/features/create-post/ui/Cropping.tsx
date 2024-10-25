import React from 'react'

import { Maximize, MaximizeOutline } from '@/common/assets/icons/components'
import { Button } from '@/common/ui'

import { RangeSlider } from '../../../common/ui/range-slider/RangeSlider'
import { useCropping } from '../model/useCropping'

export const Cropping = () => {
  const { croppingRef, isCroppingOpen, setIsCroppingOpen } = useCropping()

  return (
    <div className={'relative'} ref={croppingRef}>
      <Button
        className={`${isCroppingOpen && 'text-primary-500'}`}
        onClick={() => setIsCroppingOpen(!isCroppingOpen)}
        variant={'icon'}
      >
        {isCroppingOpen ? <Maximize /> : <MaximizeOutline />}
      </Button>
      {isCroppingOpen && (
        <div
          className={
            'bg-dark-500 bg-opacity-80 px-[12px] rounded-sm flex justify-center items-center absolute bottom-[38px] h-9'
          }
        >
          <RangeSlider />
        </div>
      )}
    </div>
  )
}
