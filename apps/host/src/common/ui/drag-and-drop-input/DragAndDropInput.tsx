import React, { useState } from 'react'

type DragAndDropInputProps = {
  accept?: string
  children: React.ReactNode
  fileInputRef?: React.RefObject<HTMLInputElement>
  multiple?: boolean
  onFileSelect: (file: File) => void
}

export const DragAndDropInput: React.FC<DragAndDropInputProps> = ({
  accept = '.jpg, .jpeg, .png',
  children,
  fileInputRef,
  multiple = false,
  onFileSelect,
}) => {
  const [dragging, setDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = e.dataTransfer.files

    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  return (
    <div
      className={'relative'}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        accept={accept}
        className={'hidden'}
        multiple={multiple}
        onChange={handleFileSelect}
        ref={fileInputRef}
        role={'file-input'}
        type={'file'}
      />
      {children}
    </div>
  )
}
