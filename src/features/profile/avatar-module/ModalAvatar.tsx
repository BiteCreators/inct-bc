import React, { useRef, useState } from 'react'
import { Crop, ReactCrop, centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'

import { Button, Modal } from '@/common/ui'
import setCanvasPreview from '@/common/ui/avatar/setCanvasPreview'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  updateAvatar: (imgSrc: string) => void
}

export const ModalAvatar = ({ isOpen, setIsOpen, updateAvatar }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const previewImgRef = useRef<HTMLCanvasElement | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [crop, setCrop] = useState<Crop>({
    height: 150,
    unit: 'px',
    width: 150,
    x: 25,
    y: 25,
  })

  const onImageLoad = (e: any) => {
    const { height, width } = e.currentTarget
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: 150,
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

  const UploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const onSelectFile = (e: any) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const imageElement = new Image()
      const url = reader.result?.toString() || ''

      imageElement.src = url

      imageElement.addEventListener('load', (e: any) => {
        if (error) {
          setError('')
        }
        const { naturalHeigth, naturalWidth } = e.currentTarget

        if (naturalHeigth < 150 || naturalWidth < 150) {
          setError('image must be at least 100')

          return setImageUrl('')
        }
      })

      setImageUrl(url)
    })
    reader.readAsDataURL(file)
  }
  const saveCroppedImage = () => {
    if (imgRef.current && previewImgRef.current) {
      const pixelCrop = convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)

      setCanvasPreview(imgRef.current, previewImgRef.current, pixelCrop)
    }
    const dataUrl = previewImgRef.current?.toDataURL()

    if (dataUrl) {
      updateAvatar(dataUrl)
    }

    setIsOpen(false)
  }

  return (
    <Modal
      className={'max-w-[492px] w-full min-h-64'}
      isOpen={isOpen}
      mode={'default'}
      onOpenChange={setIsOpen}
      title={'Add profile photo'}
    >
      {error}
      <div className={'w-full items-end'}>
        {imageUrl && (
          <div className={'w-[444px] flex flex-col items-end'}>
            <ReactCrop
              aspect={1}
              circularCrop
              className={'w-full flex overflow-auto max-h-[60vh]'}
              crop={crop}
              keepSelection
              minHeight={150}
              minWidth={150}
              onChange={(crop, percentageCrop) => setCrop(percentageCrop)}
            >
              <img
                alt={'Selected'}
                className={''}
                onLoad={onImageLoad}
                ref={imgRef}
                src={imageUrl}
              />
            </ReactCrop>
            <Button className={'mt-6 mb-4 px-7'} onClick={saveCroppedImage}>
              Save
            </Button>
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
      {crop && <canvas className={'border object-contain w-36 h-36'} ref={previewImgRef} />}
    </Modal>
  )
}
