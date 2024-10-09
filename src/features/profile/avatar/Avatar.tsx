import React, { useRef, useState } from 'react'
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop'

import { Avatar as AvatarC, Button, Modal } from '@/common/ui'

import 'react-image-crop/dist/ReactCrop.css'

export const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
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
      <AvatarC href={''} isNextLink={false} size={200} />
      <Button className={'w-full'} onClick={() => setIsOpen(true)} variant={'outline'}>
        Add a Profile Photo
      </Button>

      {isOpen && (
        <Modal
          className={'max-w-[492px] w-full min-h-64'}
          isOpen={isOpen}
          mode={'default'}
          onOpenChange={setIsOpen}
          title={'Add profile photo'}
        >
          <div className={'w-full items-end'}>
            {imageUrl && (
              <div className={'w-[444px] flex flex-col items-end'}>
                <ReactCrop
                  aspect={1}
                  circularCrop
                  className={'w-full flex max-h-[600px]'}
                  crop={crop}
                  keepSelection
                  minWidth={200}
                  onChange={c => setCrop(c)}
                >
                  <img alt={'Selected'} className={'m-auto'} onLoad={onImageLoad} src={imageUrl} />
                </ReactCrop>
                <Button className={'mt-6 mb-4 px-7'}>Save</Button>
              </div>
            )}
            {!imageUrl && (
              <div className={'w-full flex flex-col justify-center items-center gap-5'}>
                <div className={'bg-dark-700 w-56 h-56 mt-7'}></div>
                <Button className={'w-56 bottom-0 mt-6 mb-16'} onClick={UploadImage}>
                  Select from Computer
                </Button>
              </div>
            )}
          </div>
          <input
            accept={'.jpg, .jpeg, .png'}
            className={'hidden'}
            onChange={onSelectFile}
            ref={fileInputRef}
            type={'file'}
          />
        </Modal>
      )}
    </div>
  )
}
