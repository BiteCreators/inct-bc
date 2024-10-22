import { ReactNode } from 'react'

import { Close } from '@/common/assets/icons/components'
import { cn } from '@/common/lib/utils/cn'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  children?: ReactNode
  mode: 'custom' | 'default' | 'outside'
  title?: ReactNode | string
}

export const ModalContent = ({ children, mode, title }: Props) => {
  return (
    <>
      {mode === 'default' && (
        <>
          <div className={cn('flex justify-between items-center py-3 px-6')}>
            <Dialog.Title className={cn('text-xl font-bold')}>{title}</Dialog.Title>
            <Dialog.Close className={cn('focus:outline-none cursor-pointer')}>
              <Close className={cn('fill-current text-light-100')} />
            </Dialog.Close>
          </div>
          <div className={cn('h-px bg-dark-100 w-full')} />
          <div className={cn('py-3 px-6 max-w-full')}>{children}</div>
        </>
      )}

      {mode === 'outside' && (
        <>
          <div className={cn('relative')}>
            <Dialog.Close
              className={cn('absolute -top-14 -right-14 m-5 focus:outline-none cursor-pointer')}
            >
              <Close className={cn('fill-current text-light-100')} />
            </Dialog.Close>
            <div>
              <Dialog.Title className={cn('text-xl font-bold px-4 py-3')}>{title}</Dialog.Title>
              <div className={cn('h-px bg-dark-100 w-full')} />
              <div className={cn('py-3 px-6')}>{children}</div>
            </div>
          </div>
        </>
      )}

      {mode === 'custom' && <div className={cn('relative')}>{children}</div>}
    </>
  )
}
