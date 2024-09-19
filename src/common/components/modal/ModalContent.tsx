import { ReactNode } from 'react'

import { Close } from '@/common/assets/icons/components'
import { cn } from '@/common/utils/cn'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  children: ReactNode
  mode: '' | 'default'
  title?: string
}

export const ModalContent = ({ children, title }: Props) => {
  return (
    <>
      <div className={cn('flex justify-between items-center py-3 px-6')}>
        <Dialog.Title className={cn('text-xl font-bold')}>{title}</Dialog.Title>
        <Dialog.Close className={cn('focus:outline-none cursor-pointer')}>
          <Close className={cn('fill-current text-light-100')} />
        </Dialog.Close>
      </div>
      <div className={cn('h-px bg-dark-100 w-full')} />
      <div className={cn('py-3 px-6')}>{children}</div>
    </>
  )
}
