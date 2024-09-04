import { InputHTMLAttributes, ReactNode } from 'react'

import { Input } from './Input'

type Props = {
  error?: string
  icon?: ReactNode
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const SearchInput = (props: Props) => {
  return <Input icon={<span>🔍</span>} {...props} />
}
