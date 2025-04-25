import React, { ReactNode, RefObject, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { useAppDispatch, useAppSelector } from '@/common/lib/hooks/reduxHooks'
import { createPostSlice } from '@/entities/posts/model/createPostSlice'
import { CroppingTools } from '@/features/create-post/ui/CroppingTools'
import { LoaderBlock, Slider } from '@byte-creators/ui-kit'

import { ImageControl } from './ImagesControl'

type Props = {
  fileInputRef: RefObject<HTMLInputElement>
  handleDeleteImageUrl: (index: number) => void
  handleFileSelect: (file: File) => void
  isLoading: boolean
  slides: ReactNode[]
  uploadImage: () => void
}

export const SizeEditorModal = ({
  fileInputRef,
  handleDeleteImageUrl,
  handleFileSelect,
  isLoading,
  slides,
  uploadImage,
}: Props) => {
  const dispatch = useAppDispatch()
  const createPostState = useAppSelector(state => state.createPost)
  const { images, selectedImage } = createPostState

  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [aspect, setAspect] = useState(1)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  return (
    <div className={'min-h-[400px] relative'}>
      <Slider duration={0} slides={slides} />
      {selectedImage !== null && images[selectedImage] && (
        <div className={'w-full bg-primary-100'}>
          <Cropper
            aspect={aspect}
            crop={crop}
            image={images[selectedImage].initialUrl}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
            style={{
              containerStyle: {
                backgroundColor: '#606060',
              },
              cropAreaStyle: {
                border: '1px solid white',
              },
            }}
            zoom={zoom}
          />
        </div>
      )}

      <div className={'w-full p-3 flex gap-6 absolute bottom-0'}>
        <CroppingTools
          croppedAreaPixels={croppedAreaPixels}
          setAspect={setAspect}
          setZoom={setZoom}
          zoom={zoom}
        />
        <ImageControl
          fileInputRef={fileInputRef}
          handleDeleteImageUrl={handleDeleteImageUrl}
          handleFileSelect={file => {
            handleFileSelect(file)
            dispatch(createPostSlice.actions.setSelectedImage(images.length))
          }}
          uploadImage={uploadImage}
        />
      </div>
      {isLoading && <LoaderBlock />}
    </div>
  )
}
