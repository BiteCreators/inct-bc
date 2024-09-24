import { useId, useState } from 'react'

export const useInput = ({
  disabled,
  inputType,
}: {
  disabled?: boolean
  inputType: 'default' | 'reveal' | 'search'
}) => {
  const svgColor = disabled ? 'text-dark-100' : 'text-light-700'
  const inputPaddingLeft = inputType === 'search' ? '42px' : '8px'
  const [showContent, setShowContent] = useState(false)
  const inputId = useId()

  const changeShowContentHandler = () => {
    if (!disabled) {
      setShowContent(prev => !prev)
    }
  }
  const inputTypeToShow = inputType === 'reveal' && !showContent ? 'password' : 'text'

  return {
    changeShowContentHandler,
    inputId,
    inputPaddingLeft,
    inputTypeToShow,
    showContent,
    svgColor,
  }
}
