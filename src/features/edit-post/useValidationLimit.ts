import { useEffect, useState } from 'react'

export const useValidationLimit = (currentString: string, limit: number = 0) => {
  const [correct, setCorrect] = useState<boolean>(true)

  useEffect(() => {
    setCorrect(currentString.length <= limit && limit > 0)
  }, [currentString, limit])

  return { correct, limit }
}
