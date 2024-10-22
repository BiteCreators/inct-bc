import React, { useEffect, useRef, useState } from 'react'

import { Maximize, MaximizeOutline } from '@/common/assets/icons/components'
import { Button } from '@/common/ui'

import { Slider } from './Slider'

export const Cropping = () => {
  const [isCroppingOpen, setIsCroppingOpen] = useState(false)
  const croppingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (croppingRef.current && !croppingRef.current.contains(event.target as Node)) {
        setIsCroppingOpen(false)
      }
    }

    if (isCroppingOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCroppingOpen])

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
          <Slider />
        </div>
      )}
    </div>
  )
}
