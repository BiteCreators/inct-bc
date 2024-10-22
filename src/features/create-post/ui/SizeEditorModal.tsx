import React from 'react'

import exampleImage from '../../../../public/examples/image2.png'
import { AspectRatio } from './AspectRatio'
import { Cropping } from './Cropping'
import { ImageControl } from './ImagesControl'

export const SizeEditorModal = () => {
  return (
    <div className={'h-[502px] relative'}>
      <img alt={'oops'} className={'w-full h-full'} src={exampleImage.src} />
      <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
        <AspectRatio />
        <Cropping />
        <ImageControl className={'ml-auto'} />
      </div>
    </div>
  )
}
