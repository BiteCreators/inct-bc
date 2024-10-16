import { useRef, useState } from 'react'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'

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

    const maxSizeInMB = 10

    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError(t.editProfileError.photoTooBig)
      resetFileInput()

      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const url = reader.result?.toString() || ''
      const imageElement = document.createElement('img')

      imageElement.src = url

      imageElement.addEventListener('load', (e: any) => {
        const { naturalHeight, naturalWidth } = e.currentTarget

        if (naturalHeight < 150 || naturalWidth < 150) {
          setError(t.editProfileError.photoTooSmall)
          resetFileInput()

          return setImageUrl('')
        }

        setImageUrl(url)
        setSelectedFile(file)
        setError('')
      })
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
