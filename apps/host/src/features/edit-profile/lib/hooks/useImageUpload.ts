import { useRef, useState } from 'react'

import { useScopedTranslation } from '@packages/shared/hooks/useTranslation'

export const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const t = useScopedTranslation('Profile')

  const handleFileSelect = (file: File) => {
    setError('')

    const validFormats = ['image/jpeg', 'image/png']

    if (!validFormats.includes(file.type)) {
      setError(t.editProfileError.incorrectPhotoFormat)
      resetFileInput()

      return
    }

    const maxSizeInB = 10000000

    if (file.size > maxSizeInB) {
      setError(t.editProfileError.photoTooBig)
      resetFileInput()

      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const url = reader.result?.toString() || ''
      const imageElement = document.createElement('img')

      imageElement.src = url

      const onLoadHandler = (e: any) => {
        const { naturalHeight, naturalWidth } = e.currentTarget

        if (naturalHeight < 150 || naturalWidth < 150) {
          setError(t.editProfileError.photoTooSmall)
          resetFileInput()
          setImageUrl('')

          return
        }

        setImageUrl(url)
        setSelectedFile(file)
        setError('')
        imageElement.removeEventListener('load', onLoadHandler)
      }

      imageElement.addEventListener('load', onLoadHandler)
    })
    reader.readAsDataURL(file)
  }

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const uploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return {
    error,
    fileInputRef,
    handleFileSelect,
    imageUrl,
    selectedFile,
    setError,
    uploadImage,
  }
}
