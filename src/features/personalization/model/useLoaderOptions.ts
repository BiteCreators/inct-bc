import { useState } from 'react'

import { useScopedTranslation } from '@byte-creators/utils'

type LoaderOption = {
  disabled: boolean
  label: string
  value: string
}

const defaultLoader = 'Default (spinner)'

export const useLoaderOptions = () => {
  const t = useScopedTranslation('Personalization')
  const loaderOptions: LoaderOption[] = [
    { disabled: false, label: t.spinner, value: 'Default (spinner)' },
    { disabled: false, label: t.cardGame.name, value: 'Memory card game' },
    { disabled: false, label: t.snakeGame.name, value: 'Snake game' },
  ]
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
        showAlert(t.success, 'success')
      }
    } catch (error) {
      showAlert(t.error, 'error')
    }
  }

  const showAlert = (message: string, type: 'error' | 'success') => {
    setAlertState({ message, type, visible: true })
  }

  const handleAlertClose = () => {
    setAlertState(prev => ({ ...prev, visible: false }))
  }

  return { alertState, handleAlertClose, handleLoaderChange, loaderOptions, selectedLoader, t }
}
