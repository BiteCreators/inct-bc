import React from 'react'

import { cn } from '@/common/lib/utils/cn'
import { Loader } from '@/common/ui'

type Props = {
  className?: string
}
export const LoaderBlock = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'w-full h-full left-0 top-0 flex bg-dark-900 opacity-50 absolute z-40 justify-center items-center',
        className
      )}
    >
      <Loader />
    </div>
  )
}
