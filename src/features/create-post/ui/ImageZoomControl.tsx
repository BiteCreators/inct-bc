import React from 'react'

import { Button, RangeSlider } from '@byte-creators/ui-kit'
import { Maximize, MaximizeOutline } from '@byte-creators/ui-kit/icons'

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
