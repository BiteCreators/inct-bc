import { InputHTMLAttributes, ReactNode, useState } from 'react'

import { Icon } from '@/common/components/icon/Icon'

import { Input } from './Input'

type Props = {
  error?: string
  icon?: ReactNode
  isError?: boolean
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
          {showContent ? <Icon iconId={'eye-outline'} /> : <Icon iconId={'eye-off-outline'} />}
        </button>
      }
      type={showContent ? 'text' : 'password'}
      {...props}
    />
  )
}
