import { InputHTMLAttributes, useState } from 'react'

import { Icon } from '@/common/components/icon/Icon'

import { Input } from './Input'

type Props = {
  error?: string
  isError?: boolean
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const RevealInput = (props: Props) => {
  const [showContent, setShowContent] = useState(false)

  const svgColor = props.disabled ? 'text-dark-100' : 'text-light-900'

  return (
    <Input
      icon={
        <button
          className={'focus:outline-none'}
          onClick={() => setShowContent(!showContent)}
          type={'button'}
        >
          <Icon
            className={`
            position: absolute 
            top-0
            left-[13.4rem]
            fill-current ${svgColor}
            `}
            iconId={`${showContent ? 'eye-outline' : 'eye-off-outline'}`}
            viewBox={'0 -6 1 35'}
            width={'50'}
          />
        </button>
      }
      type={showContent ? 'text' : 'password'}
      {...props}
    />
  )
}
