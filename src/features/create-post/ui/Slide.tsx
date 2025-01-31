import { Dispatch, SetStateAction } from 'react'

import { useCanvasFilter } from '../model/useCanvasFilter'
import { Filters, ImageData } from '../types'

type SlideProps = {
  currentIndex: number
  filter: Filters
  imageUrl: string
  setImages: Dispatch<SetStateAction<ImageData[]>>
}

export const Slide = ({ currentIndex, filter, imageUrl, setImages }: SlideProps) => {
  const { canvasRef, imgRef } = useCanvasFilter({ currentIndex, filter, setImages })

  return (
    <div className={'w-[490px] pb-[100%] overflow-hidden relative'}>
      <img alt={'slide'} className={'hidden'} ref={imgRef} src={imageUrl} />
      <canvas
        className={'w-full h-full object-contain object-center absolute top-0 left-0'}
        ref={canvasRef}
      />
    </div>
  )
}
