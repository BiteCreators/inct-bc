import { ReactNode } from 'react'

import { cn } from '@/common/utils/cn'

type Props = {
  children?: ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: Props) => {
  return (
    <div
      className={cn('bg-dark-500 rounded-[2px] p-[10px] border-[2px] border-dark-300', className)}
    >
      {children}
    </div>
  )
}
