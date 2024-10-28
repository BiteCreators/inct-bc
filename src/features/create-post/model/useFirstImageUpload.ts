import { useRef, useState } from 'react'

export const useFirstImageUpload = (onUploadSuccess: (file: File) => void) => {
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileSelect = (file: File) => {
    setError('')

    const validFormats = ['image/jpeg', 'image/png']

    if (!validFormats.includes(file.type)) {
      setError('формат фото не тот')
      resetFileInput()

      return
    }

    const maxSizeInB = 20000000

    if (file.size > maxSizeInB) {
      setError('size photo big')
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
          setError('photo small')
          resetFileInput()

          return
        }

        setError('')
        onUploadSuccess(file)
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
