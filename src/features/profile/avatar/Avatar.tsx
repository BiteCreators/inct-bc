import React, { useRef } from 'react'

import Image from '@/common/assets/icons/components/Image'
import { Button, Input } from '@/common/ui'

export const Avatar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const UploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={'bg-dark-700 w-1/5 flex flex-col items-center gap-5 p-2'}>
      <div
        className={'bg-dark-500 flex w-full aspect-square rounded-full justify-center items-center'}
      >
        <Image />
      </div>
      <Button className={'w-full'} onClick={UploadImage} variant={'outline'}>
        add
      </Button>
      <input className={'hidden'} ref={fileInputRef} type={'file'} />
    </div>
  )
}
