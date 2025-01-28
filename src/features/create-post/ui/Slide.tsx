import { Dispatch, SetStateAction } from 'react'

import { useCanvasFilter } from '../model/useCanvasFilter'
import { Filters, ImageData } from '../types'
import { FilterValues } from '../utils/filterValues'

type SlideProps = {
  currentIndex: number
  filter: Filters
  imageUrl: string
  setFilters: Dispatch<SetStateAction<FilterValues[]>>
  setImages: Dispatch<SetStateAction<ImageData[]>>
}

export const Slide = ({ currentIndex, filter, imageUrl, setImages }: SlideProps) => {
  const { canvasRef, imgRef } = useCanvasFilter({ currentIndex, filter, setImages })

  return (
    <div style={{ width: '800px' }}>
      <img
        alt={'slide'}
        ref={imgRef}
        src={imageUrl}
        style={{ display: 'none', height: '600', width: '800px' }}
      />
      <canvas className={'w-[490px]'} ref={canvasRef} />
    </div>
  )
}
