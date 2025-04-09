import { useState } from 'react'

import { useRouter } from 'next/router'

export const useTranslationButton = (
  originalText: string,
  translatedText: string,
  setTranslatedText: (translatedText: string) => void
) => {
  const [isTranslated, setIsTranslated] = useState(false)
  const router = useRouter()
  const locale = router.locale === 'en' ? 'en' : 'ru'

  const ruRegex = /^[^a-zA-Z]*[\u0400-\u04FF]+[^a-zA-Z]*$/
  const enRegex = /^[a-zA-Z0-9\s\W]+$/

  const isPostInRussian = ruRegex.test(originalText)
  const isPostInEnglish = enRegex.test(originalText)

  const shouldShowTranslateButton =
    (locale === 'ru' && isPostInEnglish) || (locale === 'en' && isPostInRussian)

  let buttonText = ''

  if (isTranslated) {
    buttonText = locale === 'ru' ? 'Показать оригинал' : 'Show original'
  } else {
    buttonText = locale === 'ru' ? 'Перевести' : 'Translate'
  }

  const translateText = async () => {
    const sourceLang = locale === 'ru' && isPostInEnglish ? 'en' : 'ru'
    const targetLang = locale === 'ru' && isPostInEnglish ? 'ru' : 'en'

    const response = await fetch(
      `/api/translate?source=${sourceLang}&target=${targetLang}&text=${originalText}`
    )
    const data = await response.json()

    setTranslatedText(data.translatedText)
    setIsTranslated(true)
  }

  const showOriginalText = () => {
    setTranslatedText(originalText)
    setIsTranslated(false)
  }

  return {
    buttonText,
    isTranslated,
    shouldShowTranslateButton,
    showOriginalText,
    translateText,
    translatedText,
  }
}
