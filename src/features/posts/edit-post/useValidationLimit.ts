import React, { useState } from 'react'

type validationLimit = {
  limit: number
  startText: string
}

export const useValidationLimit = <T extends HTMLInputElement | HTMLTextAreaElement>({
  limit,
  startText,
}: validationLimit) => {
  const [correct, setCorrect] = useState<boolean>(true)
  const [text, setText] = useState(startText)
  const changeText = (e: React.ChangeEvent<T>) => {
    setText(e.target.value)
    if (e.target.value.length > 500 || e.target.value.length < 1) {
      setCorrect(false)
    } else {
      setCorrect(true)
    }
  }

  return { changeText, correct, limit, setText, text }
}
