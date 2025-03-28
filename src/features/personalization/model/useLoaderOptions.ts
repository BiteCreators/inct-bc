import { useState } from 'react'

const defaultLoader = 'Default (spinner)'

export const useLoaderOptions = () => {
  const [selectedLoader, setSelectedLoader] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('loaderType') || defaultLoader
    }

    return defaultLoader
  })

  const [alertState, setAlertState] = useState({
    message: '',
    type: 'success' as 'error' | 'info' | 'modal' | 'success',
    visible: false,
  })

  const handleLoaderChange = (value: string) => {
    try {
      setSelectedLoader(value)

      if (typeof window !== 'undefined') {
        localStorage.setItem('loaderType', value)
        showAlert('Loader preference saved successfully!', 'success')
      }
    } catch (error) {
      showAlert('Failed to save loader preference', 'error')
    }
  }

  const showAlert = (message: string, type: 'error' | 'success') => {
    setAlertState({ message, type, visible: true })
  }

  const handleAlertClose = () => {
    setAlertState(prev => ({ ...prev, visible: false }))
  }

  return { alertState, handleAlertClose, handleLoaderChange, selectedLoader }
}
