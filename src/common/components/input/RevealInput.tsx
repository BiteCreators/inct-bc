import { InputHTMLAttributes, ReactNode, useState } from 'react'

import { Input } from './Input'

type Props = {
  error?: string
  icon?: ReactNode
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const RevealInput = (props: Props) => {
  const [showContent, setShowContent] = useState(false)

  return (
    <Input
      icon={
        <button
          className={'focus:outline-none'}
          onClick={() => setShowContent(!showContent)}
          type={'button'}
        >
          {showContent ? '🙈' : '👁️'}
        </button>
      }
      type={showContent ? 'text' : 'password'}
      {...props}
    />
  )
}
