import React, { useRef, useState } from 'react'
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop'

import { Button, Modal } from '@/common/ui'

import 'react-image-crop/dist/ReactCrop.css'

export const Avatar = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [error, setError] = useState('')

  const [crop, setCrop] = useState<Crop>()

  const onSelectFile = (e: any) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const url = reader.result?.toString() || ''

      setImageUrl(url)
      setIsOpen(true)

      console.log(imageUrl)
    })
    reader.readAsDataURL(file)
  }

  const UploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const onImageLoad = (e: any) => {
    const { height, naturalHeigth, naturalWidth, width } = e.currentTarget

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: 200,
        },
        1,
        width,
        height
      ),
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)

    setCrop(centeredCrop)
  }

  return (
    <div className={'bg-dark-700 w-1/5 flex flex-col items-center gap-5 p-2'}>
      <Button className={'w-full'} onClick={UploadImage} variant={'outline'}>
        add
      </Button>
      <input
        accept={'.jpg, .jpeg, .png'}
        className={'hidden'}
        onChange={onSelectFile}
        ref={fileInputRef}
        type={'file'}
      />
      {isOpen && (
        <Modal
          className={'max-w-[492px]'}
          isOpen={isOpen}
          mode={'default'}
          onOpenChange={setIsOpen}
          title={'Add profile photo'}
        >
          {imageUrl && (
            <div className={'w-[444px] flex flex-col items-end'}>
              <ReactCrop
                aspect={1}
                circularCrop
                className={'w-full'}
                crop={crop}
                keepSelection
                minWidth={200}
                onChange={c => setCrop(c)}
              >
                <img alt={'Selected'} className={'w-full'} onLoad={onImageLoad} src={imageUrl} />
              </ReactCrop>
              <Button className={'mt-6 mb-4 px-7'}>Save</Button>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
