import React from 'react'
import ReactDOM from 'react-dom'

import { cn } from '@/common/lib/utils/cn'
import { Loader } from '@/common/ui'

type Props = {
  className?: string
  portal?: boolean
}
export const LoaderBlock = ({ className, portal = false }: Props) => {
  const content = (
    <div
      className={cn(
        'w-full h-full left-0 top-0 flex bg-dark-900 opacity-50 absolute z-40 justify-center items-center',
        className
      )}
    >
      <Loader />
    </div>
  )

  return portal ? ReactDOM.createPortal(content, document.body) : content
}
