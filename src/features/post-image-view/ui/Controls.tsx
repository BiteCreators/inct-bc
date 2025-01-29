import React from 'react'
import { useControls } from 'react-zoom-pan-pinch'

import { Button } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

export const Controls = () => {
  const { resetTransform, zoomIn, zoomOut } = useControls()
  const router = useRouter()

  return (
    <div className={'bg-dark-300 flex justify-between mt-2 max-w-[72vh] p-0.5 rounded'}>
      <Button className={'text-2xl text-light-100'} onClick={() => router.back()} variant={'text'}>
        ←
      </Button>
      <div>
        <Button className={'text-2xl text-light-100'} onClick={() => zoomIn()} variant={'text'}>
          +
        </Button>
        <Button className={'text-2xl text-light-100'} onClick={() => zoomOut()} variant={'text'}>
          -
        </Button>
        <Button
          className={'text-2xl text-light-100'}
          onClick={() => resetTransform()}
          variant={'text'}
        >
          х
        </Button>
      </div>
    </div>
  )
}
