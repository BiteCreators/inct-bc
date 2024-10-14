import { ChangeEvent, useRef, useState } from 'react'

export const useImageUpload = (onFileSelected?: (file: File) => void) => {
  const [imageUrl, setImageUrl] = useState<null | string>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const uploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const validFormats = ['image/jpeg', 'image/png']

    if (!validFormats.includes(file.type)) {
      setError('Error! The format of the uploaded photo must be PNG or JPEG')

      return
    }

    const maxSizeInMB = 10

    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError('Error! Photo size must be less than 10 MB!')

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
          setError('Error! Image must be at least 150x150 pixels.')

          return setImageUrl('')
        }

        setImageUrl(url)
        setSelectedFile(file)
        if (error) {
          setError('')
        }

        if (onFileSelected) {
          onFileSelected(file)
        }
      })
    })

    reader.readAsDataURL(file)
  }

  return {
    error,
    fileInputRef,
    imageUrl,
    onSelectFile,
    selectedFile,
    setError,
    uploadImage,
  }
}
