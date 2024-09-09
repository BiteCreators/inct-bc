import { InputHTMLAttributes, useState } from 'react'

import { Icon } from '@/common/components/icon/Icon'
import { cn } from '@/common/utils/cn'

import { Input } from './Input'

type Props = {
  error?: string
  isError?: boolean
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const RevealInput = (props: Props) => {
  const [showContent, setShowContent] = useState(false)

  const svgColor = props.disabled ? 'text-dark-100' : 'text-light-900'
  const changeShowContentHandler = () => {
    if (props.disabled) {
      return
    } else {
      setShowContent(!showContent)
    }
  }

  return (
    <Input
      icon={
        <button
          className={cn([
            `
            focus:outline-none 
            ${props.disabled ? 'cursor-default' : 'cursor-pointer'}
            `,
            props.className,
          ])}
          onClick={changeShowContentHandler}
          type={'button'}
        >
          <Icon
            className={`fill-current ${svgColor}`}
            iconId={`${showContent ? 'eye-outline' : 'eye-off-outline'}`}
            viewBox={'10 -6 1 35'}
            width={'30'}
          />
        </button>
      }
      isRightIcon
      type={showContent ? 'text' : 'password'}
      {...props}
    />
  )
}
