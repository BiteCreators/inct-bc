import { InputHTMLAttributes, ReactNode } from 'react'

import { Icon } from '@/common/components/icon/Icon'

import { Input } from './Input'

type Props = {
  error?: string
  icon?: ReactNode
  isError?: boolean
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const SearchInput = (props: Props) => {
  return <Input icon={<Icon iconId={'search-outline'} />} {...props} />
}
