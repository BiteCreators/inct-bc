import React from 'react'

import { useTranslationButton } from '@/features/translationButton'
import { Button } from '@byte-creators/ui-kit'

type Props = {
  originalText: string
  setTranslatedText: (translatedText: string) => void
  translatedText: string
}

export const TranslationButton = ({ originalText, setTranslatedText, translatedText }: Props) => {
  const { buttonText, isTranslated, shouldShowTranslateButton, showOriginalText, translateText } =
    useTranslationButton(originalText, translatedText, setTranslatedText)

  if (!shouldShowTranslateButton) {
    return null
  }

  return (
    <Button
      className={'bg-transparent p-0 text-primary-700'}
      onClick={isTranslated ? showOriginalText : translateText}
      variant={'icon'}
    >
      {buttonText}
    </Button>
  )
}
