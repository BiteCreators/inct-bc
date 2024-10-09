import React, { useRef, useState } from 'react'

import Image from '@/common/assets/icons/components/Image'
import { Button, Input, Modal, Typography } from '@/common/ui'

export const Avatar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const UploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className={'bg-dark-700 w-1/5 flex flex-col items-center gap-5 p-2'}>
      <Image
        className={'bg-dark-500 flex w-full aspect-square rounded-full justify-center items-center'}
      >
        <Image />
      </Image>
      <Button className={'w-full'} onClick={UploadImage} variant={'outline'}>
        add
      </Button>
      <Button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        Open modal
      </Button>
      <input accept={'.jpg, .jpeg, .png'} className={'hidden'} ref={fileInputRef} type={'file'} />
      {isOpen && (
        <Modal isOpen={isOpen} mode={'default'} onOpenChange={setIsOpen} title={'AVATAR CROP'}>
          <div className={'flex flex-col gap-[18px] pb-6 pt-[18px] w-80'}>
            <Button>Crop image</Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
