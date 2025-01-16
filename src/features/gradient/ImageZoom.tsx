import React from 'react'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'

import { Button } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

type Props = {
  uploadedImage: string
}

export const Controls = () => {
  const { resetTransform, zoomIn, zoomOut } = useControls()
  const router = useRouter()

  return (
    <div className={'bg-dark-300 flex justify-center mt-2 max-w-[650px] p-0.5 rounded'}>
      <Button className={'text-2xl text-light-100'} onClick={() => zoomIn()} variant={'text'}>
        +
      </Button>
      <Button className={'text-2xl text-light-100'} onClick={() => zoomOut()} variant={'text'}>
        -
      </Button>
      <Button className={'text-light-100'} onClick={() => resetTransform()} variant={'text'}>
        X
      </Button>
      <Button className={'text-light-100'} onClick={() => router.back()} variant={'text'}>
        Back
      </Button>
    </div>
  )
}

export const ImageZoom = ({ uploadedImage }: Props) => {
  return (
    <TransformWrapper initialScale={1}>
      <div className={'text-center'}>
        <TransformComponent>
          <img
            alt={'uploaded'}
            className={'max-w-[650px] w-full object-cover'}
            src={uploadedImage}
          />
        </TransformComponent>
        <Controls />
      </div>
    </TransformWrapper>
  )
}
