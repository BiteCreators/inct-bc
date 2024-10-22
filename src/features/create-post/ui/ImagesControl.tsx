import { useEffect, useRef, useState } from 'react'

import {
  CloseOutlineSmall,
  Image,
  ImageOutline,
  PlusCircleOutlineBig,
} from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import { Button } from '@/common/ui'

export const ImageControl = ({ className }: { className?: string }) => {
  const [isImagesControlOpen, setIsImagesControlOpen] = useState(false)
  const imagesControlRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (imagesControlRef.current && !imagesControlRef.current.contains(event.target as Node)) {
        setIsImagesControlOpen(false)
      }
    }

    if (imagesControlRef) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [imagesControlRef])

  return (
    <div className={cn('relative', className)} ref={imagesControlRef}>
      <Button
        className={`${isImagesControlOpen && 'text-primary-500'}`}
        onClick={() => setIsImagesControlOpen(!isImagesControlOpen)}
        variant={'icon'}
      >
        {isImagesControlOpen ? <Image /> : <ImageOutline />}
      </Button>
      {isImagesControlOpen && (
        <div
          className={
            'bg-dark-500 bg-opacity-80 p-[12px] rounded-sm flex justify-center items-start gap-3 absolute right-0 bottom-[38px]'
          }
        >
          <div className={'bg-light-900 w-20 h-20 rounded-[1px] relative'}>
            <button
              className={
                'top-[2px] right-[2px] p-0 w-3 h-3 bg-dark-500 bg-opacity-80 rounded-sm absolute'
              }
            >
              <CloseOutlineSmall />
            </button>
          </div>
          <div className={'bg-light-900 w-20 h-20 rounded-[1px] relative'}>
            <button
              className={
                'absolute top-[2px] right-[2px] w-3 h-3 bg-dark-500 bg-opacity-80 rounded-sm'
              }
            >
              <CloseOutlineSmall />
            </button>
          </div>
          <button>
            <PlusCircleOutlineBig />
          </button>
        </div>
      )}
    </div>
  )
}
