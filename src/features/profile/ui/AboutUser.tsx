import React, { useState } from 'react'

import { TranslationButton } from '@/features/translationButton'

type Props = {
  className: string
  text: string
}

export const AboutUser = ({ className, text }: Props) => {
  const [translatedText, setTranslatedText] = useState(text)
  const [isHide, setIsHide] = useState(true)
  const shownText =
    text.length > 150 && isHide ? (
      <p>{translatedText.slice(0, 150) || text.slice(0, 150)}...</p>
    ) : (
      translatedText || text
    )

  return (
    <>
      <button className={className} onClick={() => setIsHide(!isHide)}>
        {shownText}
      </button>
      <TranslationButton
        originalText={text}
        setTranslatedText={setTranslatedText}
        translatedText={translatedText}
      />
    </>
  )
}
