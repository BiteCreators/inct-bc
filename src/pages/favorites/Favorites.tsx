import { useState } from 'react'

const Favorites = () => {
  const [translatedText, setTranslatedText] = useState('')

  const translateText = async () => {
    const response = await fetch('/api/translate?source=en&target=ru&text=Hello baby')
    const data = await response.json()

    setTranslatedText(data.translatedText)
  }

  return (
    <div>
      <button onClick={translateText}>Translate</button>
      <p>{translatedText}</p>
    </div>
  )
}

export default Favorites
