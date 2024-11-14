import { render, renderHook, screen } from '@testing-library/react'
import { SizeEditorModal } from '../ui/SizeEditorModal'
import { ReactNode, useRef, useState } from 'react'
import { ImageData } from '../types'

describe('SizeEditorModal', () => {
  const {
    result: { current: mockFileInputRef },
  } = renderHook(() => useRef<HTMLInputElement>(null))
  const mockHandleDeleteImageUrl = jest.fn()
  const mockHandleFileSelect = jest.fn()
  const mockImages: ImageData[] = []
  const mockSlides: ReactNode[] = [
    <img src={'../../../../public/examples/0a9f264bc73447e3ce0157c47fae210a (1).jpg'} />,
    <img src="../../../../public/examples/image2.png" />,
  ]
  const mockSetSelectedImage = jest.fn()
  const {
    result: {
      current: [_, mockSetImages],
    },
  } = renderHook(() => useState<ImageData[]>([]))
  const mockUploadImage = jest.fn()

  it('should render as expected', () => {
    render(
      <SizeEditorModal
        images={mockImages}
        slides={mockSlides}
        setImages={mockSetImages}
        uploadImage={mockUploadImage}
        fileInputRef={mockFileInputRef}
        selectedImage={null}
        isDisableInput={false}
        handleFileSelect={mockHandleFileSelect}
        setSelectedImage={mockSetSelectedImage}
        handleDeleteImageUrl={mockHandleDeleteImageUrl}
      />
    )
  })
})
