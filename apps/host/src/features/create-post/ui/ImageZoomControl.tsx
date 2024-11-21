import React from 'react'

import { Maximize, MaximizeOutline } from '@packages/shared/assets'
import { Button } from '@packages/shared/ui'
import { RangeSlider } from '@packages/shared/ui/range-slider/RangeSlider'

import { useCropping } from '../model/useCropping'

type Props = {
  setZoom: (zoom: number) => void
  zoom: number
}

export const ImageZoomControl = ({ setZoom, zoom }: Props) => {
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
          <RangeSlider setZoom={setZoom} zoom={zoom} />
        </div>
      )}
    </div>
  )
}
