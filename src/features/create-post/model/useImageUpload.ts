import { useEffect, useRef, useState } from 'react'

import { format } from 'path'

import { useScopedTranslation } from '@/common/lib/hooks/useTranslation'

export const useImageUpload = (uploadImageForPost: (file: File | null) => Promise<void>) => {
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const t = useScopedTranslation('Profile')

  const handleFileSelect = (file: File) => {
    setError('')

    const validFormats = ['image/jpeg', 'image/png']
    const maxSizeInB = 20000000

    if (!validFormats.includes(file.type) || file.size > maxSizeInB) {
      setError('The photo must be less than 20 Mb and have JPEG or PNG format')
      resetFileInput()

      return
    }

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const url = reader.result?.toString() || ''
      const imageElement = document.createElement('img')

      imageElement.src = url

      const onLoadHandler = () => {
        setError('')
        uploadImageForPost(file)
        imageElement.removeEventListener('load', onLoadHandler)
      }

      imageElement.addEventListener('load', onLoadHandler)
    })
    reader.readAsDataURL(file)
  }

  const uploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return {
    error,
    fileInputRef,
    handleFileSelect,
    setError,
    uploadImage,
  }
}
