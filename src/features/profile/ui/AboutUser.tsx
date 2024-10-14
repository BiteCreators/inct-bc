import { useState } from 'react'

type Props = {
  className: string
  text: string
}

export const AboutUser = ({ className, text }: Props) => {
  const [isHide, setIsHide] = useState(true)
  const shownText = text.length > 150 && isHide ? <p>{text.slice(0, 150)}...</p> : text
  return (
    <button className={className} onClick={() => setIsHide(!isHide)}>
      {shownText}
    </button>
  )
}
